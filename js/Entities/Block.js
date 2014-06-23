/**
 * @augments MovableEntity
 * @type {void|*}
 */
var Block = MovableEntity.extend({

  width: 400,
  height: 400,

  init: function(name, graphics) {
    this._super(name, graphics);
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

    this._graphics.position.x += this._physics.calculateSpeedX();
    this._graphics.position.y += this._physics.calculateSpeedY();
  },
  applyCollision: function(xDist, yDist) {
    if (xDist > yDist) {
      this._physics.reverseSpeedY();
    }

    if (xDist < yDist) {
      this._physics.reverseSpeedX();
    }
  }
});

