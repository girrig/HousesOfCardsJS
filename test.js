var main_container = $("#main-container");
var main_canvas = $("#main-canvas");

var ctx;
var img;

function init() {
    initCanvas();
    initGame();
    main_loop();
}

function initCanvas() {
    ctx = main_canvas[0].getContext("2d");
    img = new Image();
    img.onload = function(){
        ctx.drawImage(img, 0, 0);
    };
    
    img.src = "img/kenny/Cards/cardBack_blue1.png";

    window.addEventListener('resize', onWindowResize, false);
}

function initGame() {

}

function draw() {
    img.src = "img/kenny/Cards/cardBack_blue1.png";
}

function main_loop() {
    //Get action
    //Calculate
    draw();
}

function onWindowResize() {
    ctx = main_canvas[0].getContext("2d");
    ctx.canvas.width  = window.innerWidth;
    ctx.canvas.height = window.innerHeight;
    draw();
}

main_canvas.onload = init();
