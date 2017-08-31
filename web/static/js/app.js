$(document).ready(function () {
    // init callback document ready
    var canvasDiv = document.getElementById('canvasDiv');
    var canvasWidth = 300;
    var canvasHeight = 300;
    var canvas = document.createElement('canvas');
    canvas.setAttribute('id', 'canvas');
    canvas.setAttribute('width', canvasWidth);
    canvas.setAttribute('height', canvasHeight);
    canvasDiv.appendChild(canvas);
    // canvas.style.backgroundColor = '#ffffff';

    if (typeof G_vmlCanvasManager != 'undefined') {
        canvas = G_vmlCanvasManager.initElement(canvas);
    }
    context = canvas.getContext("2d");

    var clickX = new Array();
    var clickY = new Array();
    var clickDrag = new Array();
    var paint;

    $('#canvas').mousedown(function (e) {
        var mouseX = e.pageX - 325;
        var mouseY = e.pageY - 162;

        paint = true;
        addClick(mouseX, mouseY, false);
        redraw();
    });

    $('#canvas').mousemove(function (e) {
        if (paint) {
            addClick(e.pageX - 325, e.pageY - 162, true);
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

    // Add touch event listeners to canvas element
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


    function addClick(x, y, dragging) {
        clickX.push(x);
        clickY.push(y);
        clickDrag.push(dragging);
    }

    function redraw() {
        clearCanvas();

        var radius = 30;
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

    function clean() {
        clickX = new Array();
        clickY = new Array();
        clickDrag = new Array();
        clearCanvas();
    }

    $('#erase').mousedown(function (e) {
        clean();

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


    //analize button
    $('#analize').click(function () {
        //init callback
        var label = $('#result');
        label.text("");
        console.log('clicked');
        var canvas = document.getElementById('canvas');
        var MIME_TYPE = 'image/png';
        var image = canvas.toDataURL(MIME_TYPE);
        $.ajax({
            url: '/',
            data: '{"image":"' + image + '"}',
            type: "POST",
            contentType: 'application/json',
            success: function (data) {
                console.log(data);
                label.text(data.result);
            },
        });

        //end callback
    });




    //end callback document ready
});