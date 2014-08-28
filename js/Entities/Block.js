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
//  transformations: {
    rotate: function() {
      this.position.x -= Math.round(this.size.y / 2 - this.size.x / 2);
      this.position.y += Math.round(this.size.y / 2 - this.size.x / 2);
      this._graphics.x = this.position.x;
      this._graphics.y = this.position.y;

      var t_width = this.size.x;
      this.size.x = this.size.y;
      this.size.y = t_width;

      this.baseGraphicsCallback();
    },
//  },
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

