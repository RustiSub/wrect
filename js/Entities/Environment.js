/**
 * @augments MovableEntity
 * @type {void|*}
 */
var Block = MovableEntity.extend({

  width: 700,
  height: 300,

  init: function(graphics) {
    this.setGraphics(graphics);
  },
  move: function () {
    var inputHandler = Container.getComponent('InputHandler');
    if (inputHandler.key('left')) {
      this._physics.increaseSpeedX(-1);
    }
    if (inputHandler.key('right')) {
      this._physics.increaseSpeedX(1);
    }
    if (inputHandler.key('up')) {
      this._physics.increaseSpeedY(-1);
    }
    if (inputHandler.key('down')) {
      this._physics.increaseSpeedY(1);
    }

    //this._physics.applyFriction(this._graphics.position.y, this.height);
  }, update: function(){
    this._super();

    if (this.selected) {
      this.move();
    }

    if (this._graphics.position.x > this.width || this._graphics.position.x < 0) {
      this._physics.reverseSpeedX();
    }

    this._graphics.position.x += this._physics.calculateSpeedX();


    if (this._graphics.position.y > this.height || this._graphics.position.y < 0) {
      this._physics.reverseSpeedY();
    }

    this._graphics.position.y += this._physics.calculateSpeedY();
  },
  applyCollision: function() {
    this._physics.reverseSpeedX();
    this._physics.reverseSpeedY();
  }
});

