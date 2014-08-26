/**
 * @augments MovableEntity
 * @type {void|*}
 */
var Block = MovableEntity.extend({

  hasGlue: false,
  changed: false,
  glueSource: false,
  width: 400,
  height: 400,
  _className: 'Block',

  init: function(name, graphics) {
    this._super(name, graphics);
  }, update: function(){
    this._super();

    if (this.selected) {
      game._builder.moveBuilderBlock(this);
    }
    this._graphics.position.x += this._physics.calculateSpeedX();
    this._graphics.position.y += this._physics.calculateSpeedY();
  },
  applyGlue: function() {
    if (!this.hasGlue && this.changed) {
      this.hasGlue = true;

      this.gluedGraphicsCallback();
    }

    this.changed = false;
  },
  removeGlue: function() {
    if (this.hasGlue) {
      this.hasGlue = false;

      this.originalBaseGraphicsCallback();
    }
  },
  toJSON: function() {
      return {
          name: this.name,
          x: this._graphics.position.x,
          y: this._graphics.position.y,
          width: this.size.x,
          height: this.size.y,
          color: this._graphics.currentPath.fillColor
      };
  }
});

