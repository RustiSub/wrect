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

    this.dimensions = {};

    this.dimensions.width = params.w;
    this.dimensions.height = params.h;

    this.dimensions.topLeft = new Vector(params.x, params.y);
    this.dimensions.topRight = new Vector(params.x + params.w, params.y);
    this.dimensions.bottomRight = new Vector(params.x + params.w, params.y + params.h);
    this.dimensions.bottomLeft = new Vector(params.x, params.y + params.h);

    this.dimensions.vertices = function(dimensions) {
      return [
        dimensions.topLeft,
        dimensions.topRight,
        dimensions.bottomRight,
        dimensions.bottomLeft
      ];
    };

    this.physicsBody = {};

    this.physicsBody.v = new Vector(0, 0);
    this.physicsBody.a = new Vector(0, 0);
    this.physicsBody.m = 1;
    this.physicsBody.theta = 0;
    this.physicsBody.omega = 0;
    this.physicsBody.alpha = 0;
    this.physicsBody.collided = false;

    this.physicsBody.J = 1;//this.m * (dimensions.height * dimensions.height + dimensions.width * this.width) / 12000;

    this._graphics.position = this.dimensions.topLeft;
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

    this._physics.apply(this.physicsBody, this.dimensions, 0);//game.timeDelta);

    this._graphics.position.x = this.dimensions.topLeft.x;
    this._graphics.position.y = this.dimensions.topLeft.y;
    this._graphics.rotation = this.physicsBody.theta;

//    this._graphics.beginFill(0x0080FF);
//    this._graphics.drawCircle(this.dimensions.bottomLeft.x, this.dimensions.bottomLeft.y, 2);
//    this._graphics.drawCircle(this.dimensions.bottomRight.x, this.dimensions.bottomRight.y, 2);
//    this._graphics.drawCircle(this.dimensions.topLeft.x, this.dimensions.bottomLeft.y, 2);
//    this._graphics.drawCircle(this.dimensions.bottomLeft.x, this.dimensions.bottomLeft.y, 2);
//    this._graphics.endFill();
//    this._graphics.pivot.x = 75;
//    this._graphics.pivot.y = 10;
//    this._graphics.rotation += 0.01;
  },
//  transformations: {
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

