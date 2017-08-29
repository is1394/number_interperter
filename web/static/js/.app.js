function canvasDrawing() {
    var canvasDiv = document.getElementById('canvas-container');
    var canvasWidth = $('#canvas-container').width();
    var canvasHeight = $('#canvas-container').height();
    var canvas = document.createElement('canvas');
    canvas.setAttribute('id', 'canvas');
    canvas.setAttribute('width', canvasWidth);
    canvas.setAttribute('height', canvasHeight);
    canvasDiv.appendChild(canvas);

    if (typeof G_vmlCanvasManager != 'undefined') {
        canvas = G_vmlCanvasManager.initElement(canvas);
    }
    context = canvas.getContext("2d");

    var clickX = new Array();
    var clickY = new Array();
    var clickDrag = new Array();
    var paint;

    $('#canvas').mousedown(function (e) {
        var mouseX = e.pageX - this.offsetLeft;
        var mouseY = e.pageY - this.offsetTop;

        paint = true;
        addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop);
        redraw();
    });

    $('#canvas').mousemove(function (e) {
        if (paint) {
            addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop, true);
            redraw();
        }
    });

    $('#canvas').mouseup(function (e) {
        paint = false;
        redraw();
    });

    $('#canvas').mouseleave(function (e) {
        paint = false;
    });

    function addClick(x, y, dragging) {
        clickX.push(x);
        clickY.push(y);
        clickDrag.push(dragging);
    }


    function redraw() {
        clearCanvas();

        var radius = 5;
        context.strokeStyle = "#000000";
        context.lineJoin = "round";
        context.lineWidth = radius;

        for (var i = 0; i < clickX.length; i++) {
            context.beginPath();
            if (clickDrag[i] && i) {
                context.moveTo(clickX[i - 1], clickY[i - 1]);
            } else {
                context.moveTo(clickX[i] - 1, clickY[i]);
            }
            context.lineTo(clickX[i], clickY[i]);
            context.closePath();
            context.stroke();
        }
    }

    function clearCanvas() {
        context.clearRect(0, 0, canvasWidth, canvasHeight);
    }

    // button
    $('#eraser').mousedown(function (e) {
        clickX = new Array();
        clickY = new Array();
        clickDrag = new Array();
        clearCanvas();
    });

    canvas.addEventListener("touchstart", function (e) {
        // Mouse down location
        var mouseX = (e.changedTouches ? e.changedTouches[0].pageX : e.pageX) - this.offsetLeft,
            mouseY = (e.changedTouches ? e.changedTouches[0].pageY : e.pageY) - this.offsetTop;

        paint = true;
        addClick(mouseX, mouseY, false);
        redraw();
    }, false);
    canvas.addEventListener("touchmove", function (e) {

        var mouseX = (e.changedTouches ? e.changedTouches[0].pageX : e.pageX) - this.offsetLeft,
            mouseY = (e.changedTouches ? e.changedTouches[0].pageY : e.pageY) - this.offsetTop;

        if (paint) {
            addClick(mouseX, mouseY, true);
            redraw();
        }
        e.preventDefault()
    }, false);

    canvas.addEventListener("touchend", function (e) {
        paint = false;
        redraw();
    }, false);

    canvas.addEventListener("touchcancel", function (e) {
        paint = false;
    }, false);
}

function drawChart(data) {
    var ctx = $('#chart');
    var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ["Zero", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine"],
            datasets: [{
                label: "Probability percentage",
                data: data, // must be array
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                    'rgba(53, 105, 127, 0.2)',
                    'rgba(204, 126, 71, 0.2)',
                    'rgba(196, 59, 52, 0.2)',
                    'rgba(245, 64, 103, 0.2)'
                ],
                borderColor: [
                    'rgba(255,99,132,1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                    'rgba(53, 105, 127, 1)',
                    'rgba(204, 126, 71, 1)',
                    'rgba(196, 59, 52, 1)',
                    'rgba(245, 64, 103, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            legend: {
                position: 'top'
            },
            title: {
                display: true,
                text: "Probability percentage"
            }
        }
    });
}


function sendImage(){}

$(document).ready(function () {
    $('#inner-col').outerHeight($('#outer-row').innerHeight());
    $('#inner-row').outerHeight($('#inner-col').innerHeight());
    
    canvasDrawing();
    $('#btn_analize').click(function(){
        // sendImage()
        data = [20, 0, 0, 0, 0, 10, 15, 0, 95, 0]
        drawChart(data)
    });
});