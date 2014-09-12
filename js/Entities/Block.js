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

    if (inputHandler.key('K_FIVE')) {
      this._physics.forceVectors.push(new Vector(5, 2, function(deltaVector, vector) {
          //if (!vector.once) {
          //  vector.once = true;
          //  vector.x = 10;
          //  vector.y = 10;
          //} else {
          //  vector.x = 0;
          //  vector.y = 0;
          //}
      }));
    }
      this._physics.calculateSpeed();
    //this._physics.applyFriction(0);
    //this._physics.applyFriction(this._graphics.position.y, this.height);
  },
  update: function(){
    this._super();

    if (this.selected) {
      //game._builder.moveBuilderBlock(this);
      this.move();
    }
    this._graphics.position.x += this._physics.deltaVector.x;
    this._graphics.position.y += this._physics.deltaVector.y;
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

