/**
 * @augments MovableEntity
 * @type {void|*}
 */
var Triangle = MovableEntity.extend({

  hasGlue: false,
  width: 400,
  height: 400,

  init: function(name, graphics) {
    this._super(name, graphics);
    this.setGraphics(graphics);
  },update: function(){
    this._super();

    this._graphics.position.x += this._physics.calculateSpeedX();
    this._graphics.position.y += this._physics.calculateSpeedY();
  },
  applyGlue: function() {
    this.hasGlue = true;
  }
});

