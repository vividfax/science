class TouchPoint {

    constructor() {

        this.x = 0;
        this.y = 0;

        this.yOffset = random(360);
        this.rotateOffset = random(360);
        this.scaleOffset = random(360);
    }

    update() {

    }

    move(x, y) {

        this.x = x;
        this.y = y;
    }

    display() {

        push();
        translate(this.x, this.y+sin((frameCount+this.yOffset)*10)*5);
        rotate(sin((frameCount+this.rotateOffset)*20)*2);
        textSize(30+sin((frameCount+this.scaleOffset)*15));
        text("Hello!", 0, 0);
        pop();
    }
}