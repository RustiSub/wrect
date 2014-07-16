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
      this.position.x -= 5;
    }
    if (inputHandler.key('right')) {
      this.position.x += 5;
    }
    if (inputHandler.key('up')) {
      this.position.y -= 5;
    }
    if (inputHandler.key('down')) {
      this.position.y += 5;
    }

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

