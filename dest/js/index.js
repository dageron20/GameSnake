"use strict";
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Canvas = /*#__PURE__*/_createClass(function Canvas(container) {
  _classCallCheck(this, Canvas);

  // контейнер куда вставляем канвас 
  this.element = document.createElement('canvas');
  this.context = this.element.getContext('2d');
  this.element.width = 320;
  this.element.height = 400;
  container.appendChild(this.element); // размещаем на стр
});

exports["default"] = Canvas;
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// Настрйоки объекта
var Config = /*#__PURE__*/_createClass(function Config() {
  _classCallCheck(this, Config);

  this.step = 0;
  this.maxStep = 15;
  this.sizeCell = 16;
  this.sizePoint = 16 / 4;
});

exports["default"] = Config;
"use strict";

var _canvas = _interopRequireDefault(require("./canvas.js"));

var _gameCycle = _interopRequireDefault(require("./gameCycle.js"));

var _snake = _interopRequireDefault(require("./snake.js"));

var _score = _interopRequireDefault(require("./score.js"));

var _point = _interopRequireDefault(require("./point.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

var Game = /*#__PURE__*/function () {
  function Game(container) {
    _classCallCheck(this, Game);

    // передаем в гейм наш контейн
    this.canvas = new _canvas["default"](container);
    this.Snake = new _snake["default"]();
    this.Point = new _point["default"](this.canvas);
    this.Score = new _score["default"](".game-score .score-count", 0);
    new _gameCycle["default"](this.update.bind(this), this.draw.bind(this)); // (апдейт, отрисовка канвас)
  }

  _createClass(Game, [{
    key: "update",
    value: function update() {
      this.Snake.update(this.Point, this.Score, this.canvas); // (поинт, очки, канвас)
    }
  }, {
    key: "draw",
    value: function draw() {
      this.canvas.context.clearRect(0, 0, this.canvas.element.width, this.canvas.element.height);
      this.Snake.draw(this.canvas.context);
      this.Point.draw(this.canvas.context);
    }
  }]);

  return Game;
}();

new Game(document.querySelector('.canvas-wrapper'));
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _config = _interopRequireDefault(require("./config.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

//контроллировать скорость отрисовки
var GameCycle = /*#__PURE__*/function () {
  function GameCycle(update, draw) {
    _classCallCheck(this, GameCycle);

    //(изменение в игре, отрисовка на экране)
    this.update = update;
    this.draw = draw;
    this.config = new _config["default"]();
    this.animate = this.animate.bind(this);
    this.animate();
  }

  _createClass(GameCycle, [{
    key: "animate",
    value: function animate() {
      requestAnimationFrame(this.animate);

      if (++this.config.step < this.config.maxStep) {
        return;
      }

      this.config.step = 0;
      this.update();
      this.draw();
    }
  }]);

  return GameCycle;
}();

exports["default"] = GameCycle;
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _config = _interopRequireDefault(require("./config.js"));

var _supportFunc = require("./supportFunc.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

var Point = /*#__PURE__*/function () {
  function Point(canvas) {
    _classCallCheck(this, Point);

    this.x = 0;
    this.y = 0;
    this.canvas = canvas;
    this.Config = new _config["default"]();
    this.randomPosition();
  }

  _createClass(Point, [{
    key: "draw",
    value: function draw(context) {
      context.fillStyle = "#FFFFFF";
      context.fillRect(this.x, this.y, 15, 15);
      context.fill();
    }
  }, {
    key: "randomPosition",
    value: function randomPosition() {
      this.x = (0, _supportFunc.getRandomInt)(0, this.canvas.element.width / this.Config.sizeCell) * this.Config.sizeCell;
      this.y = (0, _supportFunc.getRandomInt)(0, this.canvas.element.height / this.Config.sizeCell) * this.Config.sizeCell;
    }
  }]);

  return Point;
}();

exports["default"] = Point;
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

var Score = /*#__PURE__*/function () {
  function Score(scoreBlock) {
    var score = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

    _classCallCheck(this, Score);

    this.scoreBlock = document.querySelector(scoreBlock);
    this.score = score;
    this.draw();
  }

  _createClass(Score, [{
    key: "incScore",
    value: function incScore() {
      this.score++;
      this.draw();
    }
  }, {
    key: "setToZero",
    value: function setToZero() {
      this.score = 0;
      this.draw();
    }
  }, {
    key: "draw",
    value: function draw() {
      this.scoreBlock.innerHTML = this.score;
    }
  }]);

  return Score;
}();

exports["default"] = Score;
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _config = _interopRequireDefault(require("./config.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

var Snake = /*#__PURE__*/function () {
  function Snake() {
    _classCallCheck(this, Snake);

    this.config = new _config["default"]();
    this.x = 160;
    this.y = 160;
    this.dx = this.config.sizeCell; // скорость

    this.dy = 0;
    this.tails = []; // массив ячеек под контролем 

    this.maxTails = 4; // кол-во ячеек

    this.control();
  }

  _createClass(Snake, [{
    key: "update",
    value: function update(point, score, canvas) {
      var _this = this;

      this.x += this.dx;
      this.y += this.dy;

      if (this.x < 0) {
        this.x = canvas.element.width - this.config.sizeCell;
      } else if (this.x >= canvas.element.width) {
        this.x = 0;
      }

      if (this.y < 0) {
        this.y = canvas.element.height - this.config.sizeCell;
      } else if (this.y >= canvas.element.height) {
        this.y = 0;
      }

      this.tails.unshift({
        x: this.x,
        y: this.y
      });

      if (this.tails.length > this.maxTails) {
        this.tails.pop();
      }

      this.tails.forEach(function (el, index) {
        if (el.x === point.x && el.y === point.y) {
          _this.maxTails++;
          score.incScore(); // сделает изменения очков

          point.randomPosition();
        }

        for (var i = index + 1; i < _this.tails.length; i++) {
          if (el.x == _this.tails[i].x && el.y == _this.tails[i].y) {
            // проверка на соприкосновение с хвостом
            _this.death();

            score.setToZero(); // Обнуление очков при смерти

            point.randomPosition(); // обновление позиции поинта
          }
        }
      });
    }
  }, {
    key: "draw",
    value: function draw(context) {
      var _this2 = this;

      //отрисовка на экране
      this.tails.forEach(function (el, index) {
        // Отрисовываем дочерние элементы и проверяем на соприкосновение друг с другом и с ягодой
        if (index == 0) {
          context.fillStyle = "#2237bf";
        } else {
          context.fillStyle = "#384bc2";
        }

        context.fillRect(el.x, el.y, _this2.config.sizeCell, _this2.config.sizeCell);
      });
    }
  }, {
    key: "death",
    value: function death() {
      this.x = 160;
      this.y = 160;
      this.dx = this.config.sizeCell;
      this.dy = 0;
      this.tails = [];
      this.maxTails = 2;
    }
  }, {
    key: "control",
    value: function control() {
      var _this3 = this;

      document.addEventListener("keydown", function (e) {
        // управление стрелками
        if (e.code == "ArrowUp") {
          _this3.dy = -_this3.config.sizeCell;
          _this3.dx = 0;
        } else if (e.code == "ArrowLeft") {
          _this3.dx = -_this3.config.sizeCell;
          _this3.dy = 0;
        } else if (e.code == "ArrowDown") {
          _this3.dy = _this3.config.sizeCell;
          _this3.dx = 0;
        } else if (e.code == "ArrowRight") {
          _this3.dx = _this3.config.sizeCell;
          _this3.dy = 0;
        }
      });
    }
  }]);

  return Snake;
}();

exports["default"] = Snake;
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getRandomInt = getRandomInt;

// функции которые могут пригодиться 
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}