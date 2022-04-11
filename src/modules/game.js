import Canvas from "./canvas.js";   
import gameCycle from "./gameCycle.js";
import Snake from "./snake.js";
import Score from "./score.js";
import Point from "./point.js";


class Game {
    constructor(container) { // передаем в гейм наш контейн
        this.canvas = new Canvas(container);
        this.Snake = new Snake();
        this.Point = new Point(this.canvas);
        this.Score = new Score(".game-score .score-count", 0);
        new gameCycle(this.update.bind(this), this.draw.bind(this)); // (апдейт, отрисовка канвас)

    }

    update() {
        this.Snake.update(this.Point, this.Score, this.canvas); // (поинт, очки, канвас)
    }

    draw() {
        this.canvas.context.clearRect(0, 0, this.canvas.element.width, this.canvas.element.height);
        this.Snake.draw(this.canvas.context);
        this.Point.draw(this.canvas.context);
    }
}

new Game(document.querySelector('.canvas-wrapper'));