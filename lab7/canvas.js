const workElement = document.getElementById("work");
const playButton = document.getElementById("playButton");
const closeButton = document.getElementById("closeButton");
const controlMessage = document.getElementById("controlMessage");
const variableButton = document.getElementById("variableButton");
let variableButtonValue = "start";
let area = document.getElementById("area");
let canvas = document.getElementById("canvas");
let context = canvas.getContext("2d");
const borderSize = 10;
let window_width;
let window_height;
let circle1;
let circle2;
let end;

playButton.onclick = function() {
    workElement.classList.add("active");
    renderStartButton()
    init();
};
closeButton.onclick = function() {
    end = true;
    workElement.classList.remove("active");
};
variableButton.onclick = function() {
    if (variableButtonValue === "start") {
        controlMessage.innerText = "Анімацію розпочато"
        variableButton.disabled = true
        end = false;
        updateCircles();
    } else if (variableButtonValue === "reload") {
        controlMessage.innerText = "Анімація скинута"
        init()
        renderStartButton()
    }
};

function init() {
    window_height = Math.floor(area.offsetHeight - borderSize);
    window_width = Math.floor(area.offsetWidth - borderSize);

    canvas.height = window_height;
    canvas.width = window_width;

    canvas.style.background = "rgba(0, 0, 0, 0)";

    const radius = 10;
    const speed = 10;

    circle1 = new Circle(random(radius, window_width - radius), radius, radius, "blue", speed, "Синій круг");
    circle2 = new Circle(random(radius, window_width - radius), window_height - radius, radius, "orange", speed, "Оранжевий круг");

    circle1.draw(context);
    circle2.draw(context);
}

class Circle {
    constructor(xPos, yPos, radius, color, speed, name) {
        this.xPos = xPos;
        this.yPos = yPos;
        this.radius = radius;
        this.color = color;
        this.speed = speed;
        this.name = name;

        this.xAngle = random(0.2, 0.8);
        this.yAngle = random(0.2, 0.8);
    }

    draw(context) {
        context.beginPath();
        context.arc(this.xPos, this.yPos, this.radius, 0, Math.PI * 2, false);
        context.fillStyle = this.color;
        context.fill();
        context.closePath();
    }

    update(context) {
        if ((this.xPos + this.radius) > window_width) {
            controlMessage.innerText = `${this.name} торкається правої стіни`
            this.changeXDirection();
        }

        if ((this.xPos - this.radius) < 0) {
            controlMessage.innerText = `${this.name} торкається лівої стіни`
            this.changeXDirection();
        }

        if ((this.yPos + this.radius) > window_height) {
            controlMessage.innerText = `${this.name} торкається нижньої стіни`
            this.changeYDirection();
        }

        if ((this.yPos - this.radius) < 0) {
            controlMessage.innerText = `${this.name} торкається верхньої стіни`
            this.changeYDirection();
        }

        this.xPos += this.speed * this.xAngle;
        this.yPos += this.speed * this.yAngle;

        this.draw(context);
    }

    changeXDirection() {
        this.xAngle = -this.xAngle;
    }

    changeYDirection() {
        this.yAngle = -this.yAngle;
    }
}

function updateCircles() {
    console.log("update circles")
    if (!end) {
        requestAnimationFrame(updateCircles);
        console.log("if scope")
        context.clearRect(0, 0, window_width, window_height);
        circle1.update(context);
        circle2.update(context);
        if (checkForCollision()) {
            controlMessage.innerText = "Круги дотикаються"

            circle1.changeXDirection()
            circle2.changeXDirection()

            circle1.changeYDirection()
            circle2.changeYDirection();
        }

        if (checkForEndGame()) {
            controlMessage.innerText = "Круги в одній частині"
            end = true;
            variableButtonValue = "reload"
            variableButton.disabled = false
            variableButton.innerText = "Reload"
        }
    }
}

function checkForCollision() {
    return Math.sqrt(Math.pow(circle1.xPos - circle2.xPos, 2) + Math.pow(circle1.yPos - circle2.yPos, 2)) < (circle1.radius + circle2.radius)
}

function checkForEndGame() {
    return (onUpperPart(circle1) && onUpperPart(circle2)) || (onDownerPart(circle1) && onDownerPart(circle2));
}

function onUpperPart(circle) {
    return 0 < circle.yPos && circle.yPos + circle.radius <= (window_height / 2);
}

function onDownerPart(circle) {
    return (window_height / 2) <= (circle.yPos - circle.radius) && (circle.yPos + circle.radius) <= window_height;
}

function random(min, max) {
    return Math.random() * (max - min) + min;
}

function renderStartButton() {
    variableButtonValue = "start"
    variableButton.disabled = false
    variableButton.innerText = "Start"
}