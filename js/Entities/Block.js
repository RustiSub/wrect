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
    //this._physics.applyFriction(this._graphics.position.y, this.height);
  }, update: function(){
    this._super();

    if (this.selected) {
      game._builder.moveBuilderBlock(this);
    }

    this._graphics.position.x += this._physics.calculateSpeedX();
    this._graphics.position.y += this._physics.calculateSpeedY();
  },
  applyGlue: function() {
    this.hasGlue = true;
  }
});

