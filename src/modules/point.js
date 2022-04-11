import Config from "./config.js";
import { getRandomInt } from "./supportFunc.js";

export default class Point {
    constructor(canvas) {
        this.x = 0;
        this.y = 0;
        this.canvas = canvas;
        this.Config = new Config();
        this.randomPosition();
    }

    draw(context) {
        context.fillStyle = "#FFFFFF";
        context.fillRect(this.x , this.y , 15, 15);
        context.fill();
    }

    randomPosition() {
        this.x = getRandomInt( 0, this.canvas.element.width / this.Config.sizeCell ) * this.Config.sizeCell;
        this.y = getRandomInt( 0, this.canvas.element.height / this.Config.sizeCell ) * this.Config.sizeCell;
    }

    
}