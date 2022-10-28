window.onload=function(){
	default_colors=[]
	for (var i=0;i<document.getElementsByTagName("div").length;i++){
		default_colors.push(document.getElementsByTagName("div")[i].style.backgroundColor)
	}
	var p2_text=document.getElementById("p2").innerHTML
	document.getElementById("p2").innerHTML=document.getElementById("p5").innerHTML
	document.getElementById("p5").innerHTML=p2_text
	pentagon()
	if (document.cookie)
	{
		if (window.confirm("Кукі:\n"+document.cookie+"\nНатисніть ОК щоб очистити кукі"))
		{
			var tmp=document.getElementsByTagName("form")[0].innerHTML
			document.getElementsByTagName("form")[0].innerHTML=""
			deleteAllCookies()
			console.log("Кукі очищені")
			alert("Кукі успішно видалено")
			document.getElementsByTagName("form")[0].innerHTML=tmp
		}
	}
	var color = localStorage.getItem('color')
	if (color){
		setColor(color)
	}
}
function deleteAllCookies() {
    var cookies = document.cookie.split(";");

    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i];
        var eqPos = cookie.indexOf("=");
        var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }
}
function pentagon(){
	var side=5
	console.log("side = ",side)
	document.getElementById("p4").innerHTML+="<br>Площа правильного п'ятикутника зі стороною "+side+" = "+(5*Math.pow(side,2)/(4*Math.tan(Math.PI/5)))
}
function reverse(){
	var str=document.getElementById("number_input").value
	document.cookie=encodeURIComponent("initial_number") + '=' + encodeURIComponent(str)
	str=str.split("").reverse().join("")
	alert(str)
	document.cookie=encodeURIComponent("reversed_number") + '=' + encodeURIComponent(str)
	console.log("Перевернуте число успішно записано в кукі")
}
function setColor(color_str=null){
	if (color_str){
		for (var i=0;i<document.getElementsByTagName("div").length;i++){
			document.getElementsByTagName("div")[i].style.backgroundColor=color_str
		}
	}
	else{
		for (var i=0;i<document.getElementsByTagName("div").length;i++){
			document.getElementsByTagName("div")[i].style.backgroundColor=default_colors[i]
		}
	}
	localStorage.setItem('color',color_str)
}
function block_clicked(block_name){
	console.log(block_name+" clicked")
	document.getElementById("p4").innerHTML='Some content Some content Some content Some content Some content Some content Some content Some content<form><input type="text" id="number_input" value="введіть число яке бажаєте обернути"><input type="button" value="обернути" onclick="reverse()"></form>Some content Some content Some content Some content Some content Some content Some content Some content<form><textarea type="text" id="css_input">Введіть css-інструкції для блока номер '+block_name[1]+'</textarea><input type="button" value="1" onclick="apply_css('+block_name[1]+')"><input type="button" value="2" onclick="cancel_css('+block_name[1]+')"></form>'
	//document.getElementById(block_name).onclick=null
}
function apply_css(block_number){
	var css_properties=document.getElementById("css_input").value
	css_properties=css_properties.split(";")
	for (var i in css_properties){
		pos=css_properties[i].indexOf(":")
		if (i==0){
			localStorage.setItem(css_properties[i].substring(0,pos),css_properties[i].substring(pos+1))
		}
		else{
			localStorage.setItem(css_properties[i].substring(1,pos),css_properties[i].substring(pos+1))
		}
	}
	var style=""
	for(let key of Object.keys(localStorage)){
		if (key!="color"){
			style+=key+":"+localStorage[key]+";"
		}
	}
	style_tmp=document.getElementById("p"+block_number).style
	document.getElementById("p"+block_number).style=style
}
function cancel_css(block_number){
	document.getElementById("p"+block_number).style=style_tmp
	for(let key of Object.keys(localStorage)){
		if (key!="color"){
			localStorage.removeItem(key)
		}
	}
}