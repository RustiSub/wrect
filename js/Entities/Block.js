/**
 * @augments MovableEntity
 * @type {void|*}
 */
var Block = MovableEntity.extend({

  hasGlue: false,
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
    this.hasGlue = true;

    this._graphics.beginFill(0xB231EB);
    var mark = 4;
    this._graphics.drawRect(0 + mark , 0 + mark , this.size.x - (mark  * 2), this.size.y - (mark  * 2));
    this._graphics.endFill();
  },
  removeGlue: function() {
    this._graphics.clear();
    this.baseGraphicsCallback();
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

