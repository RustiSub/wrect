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
  dimensions: {},
  physicsBody: {},

  init: function(name, graphics, params) {
    this._super(name, graphics);

    var dimensions = this.dimensions;
    dimensions.width = params.w;
    dimensions.height = params.h;

    dimensions.topLeft = new Vector(params.x, params.y);
    dimensions.topRight = new Vector(params.x + params.w, params.y);
    dimensions.bottomRight = new Vector(params.x + params.w, params.y + params.h);
    dimensions.bottomLeft = new Vector(params.x, params.y + params.h);

    var physicsBody = this.physicsBody;

    physicsBody.v = new Vector(0, 0);
    physicsBody.a = new Vector(0, 0);
    physicsBody.m = 1;
    physicsBody.theta = 0;
    physicsBody.omega = 0;
    physicsBody.alpha = 0;

    physicsBody.J = this.m * (dimensions.height * dimensions.height + dimensions.width * this.width) / 12000;
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

    //this._physics.applyFriction(0);
    //this._physics.applyFriction(this._graphics.position.y, this.height);
  },
  update: function(){
    this._super();

    this._physics.apply(this.physicsBody, this.dimensions, 0.02);//game.timeDelta);

    this._graphics.position.x = this.dimensions.topLeft.x;
    this._graphics.position.y = this.dimensions.topLeft.y;

    if (this.selected) {
      //game._builder.moveBuilderBlock(this);
      //this.move();
    }
    //console.log(this.name, this._physics.forceVectors.length);
//    this._physics.calculateSpeed();
//
//    this._graphics.position.x += this._physics.xSpeed;
//    this._graphics.position.y += this._physics.ySpeed;
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

