/**
 * @augments MovableEntity
 * @type {void|*}
 */
var Block = MovableEntity.extend({

  hasGlue: false,
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
    //if (inputHandler.gamepadAxisDigital('LX', 1) != 0) {
      console.log(inputHandler.gamepadAxis('LX'));
      this._physics.xSpeed = inputHandler.gamepadAxis('LX');
    //}
    //if (inputHandler.gamepadAxisDigital('LY', 1) < 0) {
      console.log('LY');
      this._physics.ySpeed = inputHandler.gamepadAxis('LY');
    //}

    //this._physics.applyFriction(this._graphics.position.y, this.height);
  }, update: function(){
    this._super();

    this._graphics.position.x += this._physics.calculateSpeedX();
    this._graphics.position.y += this._physics.calculateSpeedY();

    if (this.selected) {
      this.move();
    }
  },
  applyGlue: function() {
    this.hasGlue = true;
  }
});

