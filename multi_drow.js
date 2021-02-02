conv=document.getElementById("my-canvas")
bvg=document.getElementsByTagName("svg")
clear=document.getElementById("clearr")
//conv.addEventListener('mousemove',xy_point)
drow_button=document.getElementsByTagName("button")

var ctx=conv.getContext("2d");
fill=document.getElementById("fillstyle")
strokestyle=document.getElementById("strack")
var strokestylevalue = strokestyle.value;

var ctx = conv.getContext("2d");

var x1, y1, x2, y2;
var mouseDown = false
var mood=""

drow_button[0].addEventListener("click", setfreehand)
function setfreehand() {
    mood = "freehand";
}

bvg[0].addEventListener("click", setline)
function setline() {
    mood = "line";

}
bvg[1].addEventListener("click", setrect)
function setrect() {
    mood = "rectangle";

}
drow_button[1].addEventListener("click", seteraser)
function seteraser() {
    mood = "eraser";
}
bvg[2].addEventListener("click", setcircle)
function setcircle() {
    mood = "circle";
}





conv.addEventListener("mousedown", canvasPress)
function canvasPress(e) {

    x1 = e.offsetX;
    y1 = e.offsetY;
    if (mood != "freehand" && mood != "eraser") {
    }
    else {
        mouseDown = true
    }
}

conv.addEventListener("mouseup", canvasDraw)
function canvasDraw(e) {

    x2 = e.offsetX
    y2 = e.offsetY
    if (mood != "freehand" && mood != "eraser") {
        drawShape(x1, y1, x2, y2)
    }
    else {
        mouseDown = false;
    }

}


conv.addEventListener("mousemove", moveMouse)
function moveMouse(e) {
    if (mood == "freehand" && mouseDown == true) {
        x2 = e.offsetX
        y2 = e.offsetY
        strokestylevalue = strokestyle.value;
        ctx.strokeStyle = strokestylevalue;
        drawLine(x1, y1, x2, y2)
        x1 = x2;
        y1 = y2;
    }
    else if (mood == "eraser" && mouseDown == true) {
        ctx.strokeStyle = "ghostwhite"
        x2 = e.offsetX
        y2 = e.offsetY

        eraserfn(x1, y1, x2, y2)
        x1 = x2;
        y1 = y2;
    }
}


// function drawShape(x1, y1, x2, y2) {

//     if (mood == "circle") {
//         drawCircle(x1, y1, x2, y2)
//     }
//     else if (mood == "line") {
//         drawLine(x1, y1, x2, y2)
//     }
//     else if (mood == "rectangle") {
//         drawRect(x1, y1, x2, y2)
//     }
// }




function drawShape(x1, y1, x2, y2) {

    if (mood == "circle") {
        drawCircle(x1, y1, x2, y2)
    }
    else if (mood == "line") {
        drawLine(x1, y1, x2, y2)
    }
    else if (mood == "rectangle") {
        drawRect(x1, y1, x2, y2)
    }
}

function drawCircle(x1, y1, x2, y2) {
    var a = x1 - x2;
    var b = (y1) - (y2);

    var c = Math.sqrt(a * a + b * b);
    ctx.beginPath();
    ctx.arc(x1, y1, c, 0, 2 * Math.PI);
    strokestylevalue = strokestyle.value;
    ctx.strokeStyle = strokestylevalue;
    fillvalue = fill.value;
    ctx.fillStyle = fillvalue;
    ctx.fill();
    ctx.stroke();
    // console.log(fillvalue)
    // ctx.fillStyle = fillvalue;
    // ctx.fill();
    
    
}

function drawRect(x1, y1, x2, y2) {
    ctx.beginPath();
    strokestylevalue = strokestyle.value;
    ctx.strokeStyle = strokestylevalue;
    fillvalue = fill.value;
    console.log(fillvalue)
    ctx.fillStyle = fillvalue;
    ctx.fillRect(x1, y1, x2 - x1, y2 - y1);
    ctx.closePath();
}

function drawLine(x1, y1, x2, y2) {
    ctx.beginPath();
    strokestylevalue = strokestyle.value;
    ctx.strokeStyle = strokestylevalue;
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.lineWidth = 4;
    ctx.closePath();
    ctx.stroke();
}

function eraserfn(x1, y1, x2, y2) {
    ctx.beginPath();

    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.lineWidth = 6;
    ctx.closePath();
    ctx.stroke();

}
clear.addEventListener("click",clearr)
function clearr()
{
    ctx.clearRect(0,0,conv.width,conv.height); 
}