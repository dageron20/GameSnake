import Config from "./config.js";

export default class Snake {
	
	constructor() {
		this.config = new Config();
		this.x = 160;
		this.y = 160;
		this.dx = this.config.sizeCell; // скорость
		this.dy = 0;
		this.tails = []; // массив ячеек под контролем 
		this.maxTails = 4; // кол-во ячеек
		this.control();
	}

	update(point, score, canvas) {
		this.x += this.dx;
		this.y += this.dy;
	
		if (this.x < 0) {
			this.x = canvas.element.width - this.config.sizeCell;
		} else if ( this.x >= canvas.element.width ) {
			this.x = 0;
		}
	
		if (this.y < 0) {
			this.y = canvas.element.height - this.config.sizeCell;
		} else if ( this.y >= canvas.element.height ) {
			this.y = 0;
		}
	
		this.tails.unshift( { x: this.x, y: this.y } );
	
		if ( this.tails.length > this.maxTails ) {
			this.tails.pop();
		}
	
		this.tails.forEach( (el, index) => {
	
			if (el.x === point.x && el.y === point.y) {
				this.maxTails++;
				score.incScore(); // сделает изменения очков
				point.randomPosition();
			}
	
			for( let i = index + 1; i < this.tails.length; i++ ) {
				if ( el.x == this.tails[i].x && el.y == this.tails[i].y ) { // проверка на соприкосновение с хвостом
					this.death();
					score.setToZero(); // Обнуление очков при смерти
					point.randomPosition(); // обновление позиции поинта
				}
			}
		} );
	}

	draw(context) { //отрисовка на экране
		this.tails.forEach( (el, index) => { // Отрисовываем дочерние элементы и проверяем на соприкосновение друг с другом и с ягодой
			if (index == 0) {
				context.fillStyle = "#2237bf";
			} else {
				context.fillStyle = "#384bc2";
			}
			context.fillRect( el.x, el.y, this.config.sizeCell, this.config.sizeCell );
		} );

	}

	death() {
		this.x = 160;
		this.y = 160;
		this.dx = this.config.sizeCell;
		this.dy = 0;
		this.tails = [];
		this.maxTails = 2;
	}

	control() {
		
		document.addEventListener("keydown",  (e) => { // управление стрелками
			if ( e.code == "ArrowUp" ) {
				this.dy = -this.config.sizeCell;
				this.dx = 0;
			} else if ( e.code == "ArrowLeft" ) {
				this.dx = -this.config.sizeCell;
				this.dy = 0;
			} else if ( e.code == "ArrowDown" ) {
				this.dy = this.config.sizeCell;
				this.dx = 0;
			} else if ( e.code == "ArrowRight" ) {
				this.dx = this.config.sizeCell;
				this.dy = 0;
			}
		});

	}

}