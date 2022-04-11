import Config from "./config.js"; //контроллировать скорость отрисовки

export default class GameCycle {
    constructor(update, draw) { //(изменение в игре, отрисовка на экране)
        this.update = update;
        this.draw = draw;
        this.config = new Config();
        this.animate = this.animate.bind(this);
        this.animate();
    }

    animate() {
        requestAnimationFrame( this.animate );
        if ( ++this.config.step < this.config.maxStep) {
            return;
        }
        this.config.step = 0;
        this.update();
        this.draw();
    }
}