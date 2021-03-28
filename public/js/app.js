var $ = require( "jquery" );

var mainContainer = $("#main-container");
var mainCanvas = $("#main-canvas");

var ctx;
var frame = 0;

var dragging;
var dragHoldX;
var dragHoldY;

var cards = [];

function init() {
    init_canvas();
    onWindowResize();
    init_game();
    setInterval(main_loop, 100);
}


////////////////////
// Main Functions //
////////////////////

function init_canvas() {
    ctx = mainCanvas[0].getContext("2d");

    window.addEventListener('resize', onWindowResize, false);
    window.addEventListener("mousedown", onMouseDown, false);
}

function init_game() {
    var relitive_path = "img/kenny/Cards/";
    var suits = ["Clubs", "Diamonds", "Hearts", "Spades"];
    for(var i = 0; i < suits.length; i++){
        for(var j = 1; j <= 13; j++){
            var card = {
                "name": null,
                "x": 0,
                "y": 0,
                "image": new Image()
            };
            if(j == 1){
                card.name = "card" + suits[i] + "A";
                card.image.src = relitive_path + "card" + suits[i] + "A" + ".png";
                cards.push(card);
            }
            else if(j == 11){
                card.name = "card" + suits[i] + "J";
                card.image.src = relitive_path + "card" + suits[i] + "J" + ".png";
                cards.push(card);
            }
            else if(j == 12){
                card.name = "card" + suits[i] + "Q";
                card.image.src = relitive_path + "card" + suits[i] + "Q" + ".png";
                cards.push(card);
            }
            else if(j == 13){
                card.name = "card" + suits[i] + "K";
                card.image.src = relitive_path + "card" + suits[i] + "K" + ".png";
                cards.push(card);
            }
            else {
                card.name = "card" + suits[i] + j;
                card.image.src = relitive_path + "card" + suits[i] + j + ".png";
                cards.push(card);
            }
        }
    }
}

function draw() {
    // Clear the canvas
    clear_screen();

    for (var i = 0; i < cards.length; i++) {
        ctx.drawImage(cards[i].image, cards[i].x, cards[i].y);
    }
}

function main_loop() {
    //Get action
    //Calculate
    draw();

    //console.log("frame: " + frame);
    frame = frame + 1;
}


/////////////////////
// Event Functions //
/////////////////////

function onMouseDown(event) {
    console.log("onMouseDown");
	// Getting mouse position (assumes canvas starts at (0,0))
	var mouseX = event.pageX;
	var mouseY = event.pageY;

	// Find which shape was clicked
    var highestIndex = -1;  // Keeps track of which object is on top if two objects overlap
	for (var i = 0; i < cards.length; i++) {
		if	(is_collision_with_mouse(cards[i], mouseX, mouseY)) {
			dragging = true;
			if (i > highestIndex) {
                highestIndex = i;

				// Gets the point on the object where the mouse is "holding" the object
				dragHoldX = mouseX - cards[i].x;
				dragHoldY = mouseY - cards[i].y;
			}
		}
	}

    // Bring the dragged object to the back of the array
    cards.push(cards.splice(highestIndex, 1)[0]);

	if (dragging) {
		window.addEventListener("mousemove", onMouseMove, false);
	}
	window.removeEventListener("mousedown", onMouseDown, false);
	window.addEventListener("mouseup", onMouseUp, false);
}

function onMouseUp(event) {
    console.log("onMouseUp");
    window.addEventListener("mousedown", onMouseDown, false);
	window.removeEventListener("mouseup", onMouseUp, false);
	if (dragging) {
		dragging = false;
		window.removeEventListener("mousemove", onMouseMove, false);
	}
}

function onMouseMove(event) {
    console.log("onMouseMove");
    // Assumes the dragging object is at the back of the array
    var dragged_object = cards[cards.length - 1];

	var objectWidth = dragged_object.image.width;
    var objectHeight = dragged_object.image.height;
	var minX = 0;
	var maxX = ctx.canvas.width - objectWidth;
	var minY = 0;
	var maxY = ctx.canvas.height - objectHeight;

    // Getting mouse position (assumes canvas starts at (0,0))
	var mouseX = event.pageX;
	var mouseY = event.pageY;

	// Prevents the object from dragging outside of the canvas
    var posX;
	var posY;
	posX = mouseX - dragHoldX;
	posX = (posX < minX) ? minX : ((posX > maxX) ? maxX : posX);
	posY = mouseY - dragHoldY;
	posY = (posY < minY) ? minY : ((posY > maxY) ? maxY : posY);

	dragged_object.x = posX;
	dragged_object.y = posY;

	draw();
}


function onWindowResize() {
    ctx.canvas.width  = window.innerWidth;
    ctx.canvas.height = window.innerHeight;
    draw();
}


//////////////////////
// Helper Functions //
//////////////////////

// Clears the canvas
function clear_screen() {
	ctx.fillStyle = "#FFFFFF";  // white
	ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
}

// Returns true if there is a collision
function is_collision_with_mouse(object, mouseX, mouseY) {
    // Rectangle
    return (mouseX > object.x && mouseX < object.x + object.image.width && mouseY > object.y && mouseY < object.y + object.image.height);
}

mainCanvas.onload = init();
