const workElement = document.getElementById("work");
const playButton = document.getElementById("playButton");
const closeButton = document.getElementById("closeButton");
const controlMessage = document.getElementById("controlMessage");
const variableButton = document.getElementById("variableButton");
let variableButtonValue = "start";
let gameEnd = false;
const speed = 10;
let container = document.getElementById("area");
let circle1;
let circle2;
let interval;

playButton.onclick = function(){
    workElement.classList.add("active");
    init()
};
closeButton.onclick = function(){
    workElement.classList.remove("active");
};
variableButton.onclick = function(){
    if (variableButtonValue === "start") {
        controlMessage.innerText = "Анімацію розпочато"
        variableButton.disabled = true
        interval = setInterval(func, 10);
    } else if (variableButtonValue === "reload") {
        controlMessage.innerText = "Анімація скинута"
        init()
        variableButtonValue = "start"
        variableButton.innerText = "Start"
    }
};

class Circle {
    constructor(htmlElem, xAngle, yAngle, name) {
        this.name = name;
        this.htmlElem = htmlElem;
        this.xAngle = xAngle;
        this.yAngle = yAngle;
    }
    changeXAngle() {
        this.xAngle = -this.xAngle;
    }
    changeYAngle() {
        this.yAngle = -this.yAngle;
    }
    radius() {
        return this.htmlElem.offsetWidth / 2;
    }
    x() {
        return this.htmlElem.offsetLeft + this.radius();
    }
    y() {
        return this.htmlElem.offsetTop + this.radius();
    }
}

function init() {
    const c1 = document.getElementById("c1");
    const c2 = document.getElementById("c2");

    const min = 0.2, max = 0.8;

    circle1 = new Circle(c1, random(min, max), random(min, max), "Синій круг");
    circle2 = new Circle(c2, random(min, max), random(min, max), "Оранжевий круг");

    c1.style.top = "0px";
    c1.style.bottom = null;

    c2.style.bottom = "0px";
    c2.style.top = null;

    c1.style.left = random(0, (container.offsetWidth - circle1.radius() * 2)) + "px";
    c2.style.left = random(0, (container.offsetWidth - circle2.radius() * 2)) + "px";
}


function func() {
    checkForIntersection()
    checkForGameEnd()

    checkForDirection(circle1)
    checkForDirection(circle2)

    move(circle1)
    move(circle2)
}

function checkForDirection(circle) {
    const circleLeftPosition = circle.htmlElem.offsetLeft,
        circleTopPosition = circle.htmlElem.offsetTop,
        circleRightPosition = circleLeftPosition + circle.htmlElem.offsetWidth,
        circleBottomPosition = circleTopPosition + circle.htmlElem.offsetHeight;

    if (circleRightPosition > container.offsetWidth) {
        controlMessage.innerText = `${circle.name} торкається правої стіни`
        circle.changeXAngle();
    }
    if (circleBottomPosition > container.offsetHeight) {
        controlMessage.innerText = `${circle.name} торкається нижньої стіни`
        circle.changeYAngle();
    }
    if (circleLeftPosition < 0) {
        controlMessage.innerText = `${circle.name} торкається лівої стіни`
        circle.changeXAngle();
    }
    if (circleTopPosition < 0) {
        controlMessage.innerText = `${circle.name} торкається верхньої стіни`
        circle.changeYAngle();
    }
}

function move(circle) {
    const circleLeftPosition = circle.htmlElem.offsetLeft,
        circleTopPosition = circle.htmlElem.offsetTop;

    circle.htmlElem.style.left = (circleLeftPosition + speed * circle.xAngle) + "px";
    circle.htmlElem.style.top = (circleTopPosition + speed * circle.yAngle) + "px";
}

function checkForIntersection() {
    const c1 = circle1, c2 = circle2;
    if (Math.sqrt(Math.pow(c1.x() - c2.x(), 2)
            + Math.pow(c1.y() - c2.y(), 2))
        < (c1.radius() + c2.radius())) {

        controlMessage.innerText = "Круги дотикаються"

        c1.changeXAngle()
        c1.changeYAngle()

        c2.changeXAngle()
        c2.changeYAngle()
    }
}

function checkForGameEnd() {
    const c1 = circle1, c2 = circle2;

    if (onUpPart(c1) && onUpPart(c2)) {
        controlMessage.innerText = "Обидва круги в верхній частині"
        endGame()
    } else if (onDownPart(c1) && onDownPart(c2)) {
        controlMessage.innerText = "Обидва круги в нижній частині"
        endGame()
    }
}

function endGame() {
    gameEnd = true;
    clearInterval(interval);
    variableButtonValue = "reload"
    variableButton.disabled = false
    variableButton.innerText = "Reload"
}

function onUpPart(circle) {
    const containerHeight = container.offsetHeight;
    return 0 < circle.y() && circle.y() <= ((containerHeight / 2) - circle.radius());
}

function onDownPart(circle) {
    const containerHeight = container.offsetHeight;
    return ((containerHeight / 2) + circle.radius()) <= circle.y() && circle.y() <= (containerHeight - circle.radius())
}

function random(min, max) {
    return Math.random() * (max - min) + min;
}