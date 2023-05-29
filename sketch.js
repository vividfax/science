// https://coolors.co/fffbdb-a59132-da7422-625834-30362f

let palette = {
    white: "#FFFBDB",
    light: "#A59132",
    mid: "#DA7422",
    dark: "#625834",
    black: "#30362F",
}

let bubblyFont;

let lineLayer;

let touchPoints = [];

function preload() {

    bubblyFont = loadFont("./fonts/CherryBombOne-Regular.ttf");
}

function setup() {

    createCanvas(windowWidth, windowHeight);
    textFont(bubblyFont);
    textAlign(CENTER, CENTER);
    noStroke();
    strokeJoin(ROUND);
    angleMode(DEGREES);

    setupTouchEvents();

    lineLayer = createGraphics(width, height);

    for (let colour in palette) {
        palette[colour] = color(palette[colour]);
    }
}

function draw() {

    background(palette.light);

    if (!isTouchDevice()) {
        fill(palette.dark);
        textSize(30);
        textAlign(CENTER, TOP);
        let str = "Hello, this is a game best experienced\non an iPad or touch screen device";
        text(str, width/2, height/2-50);
        noLoop();
    }

    lineLayer.push();
    let pxls = lineLayer.get();
    lineLayer.clear();
    lineLayer.tint(255, 200);
    lineLayer.image(pxls, 0, 0);
    lineLayer.pop();

    lineLayer.stroke(palette.white);
    lineLayer.strokeWeight(3);

    for (let i = 0; i < touches.length; i++) {

        for (let j = i+1; j < touches.length; j++) {

            lineLayer.line(touches[i].x, touches[i].y, touches[j].x, touches[j].y);
        }

    }

    fill(palette.dark);
    stroke(palette.light);
    strokeWeight(15);
    noStroke();
    textSize(30);

    image(lineLayer, 0, 0);


    for (let i = 0; i < touches.length; i++) {

        if (touchPoints.length < i+1) touchPoints.push(new TouchPoint());
        touchPoints[i].move(touches[i].x, touches[i].y-50);
        touchPoints[i].update();
        touchPoints[i].display();
        text(touchPoints.length, 10, 10);
    }
}

function setupTouchEvents() {

    canvas.addEventListener('gesturestart', absorbEvent);
    canvas.addEventListener('gesturechange', absorbEvent);
    canvas.addEventListener('gestureend', absorbEvent);
    canvas.addEventListener("touchstart", absorbEvent);
    canvas.addEventListener("touchend", absorbEvent);
    canvas.addEventListener("touchmove", absorbEvent);
    canvas.addEventListener("touchcancel", absorbEvent);
}

function absorbEvent(event) {

    event.preventDefault();
    event.returnValue = false;
}

function isTouchDevice() {

    return (('ontouchstart' in window) ||
       (navigator.maxTouchPoints > 0) ||
       (navigator.msMaxTouchPoints > 0));
  }