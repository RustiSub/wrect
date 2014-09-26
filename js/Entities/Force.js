/**
 * @augments MovableEntity
 * @type {void|*}
 */
var Force = BaseEntity.extend({

  params: {},

  drawCone: function (forceGraphics, params) {
    forceGraphics.beginFill(0xD281F7, 0.5);
    forceGraphics.moveTo(params.origin.x, params.origin.y);
    forceGraphics.lineTo(params.begin.x, params.begin.y);
    forceGraphics.lineTo(params.top.x, params.top.y);
    forceGraphics.lineTo(params.end.x, params.end.y);
    forceGraphics.lineTo(params.origin.x, params.origin.y);
    forceGraphics.endFill();

    this.dimensions.topLeft = params.origin;
    this.dimensions.topRight = params.begin;
    this.dimensions.bottomRight = params.top;
    this.dimensions.bottomLeft = params.end;
  },
  createCone: function (origin, length, forceAngle, angle) {
    var params = {};
    params.length= length;
    params.forceAngle = forceAngle;
    params.angle = angle;
    params.origin = origin;
    params.begin = new Vector(origin.x + length, params.origin.y);
    forceAngle = window.game.getHelpers().math.toRadians(forceAngle);
    params.begin = params.begin.rotate(forceAngle, origin);

    angle = window.game.getHelpers().math.toRadians(angle);
    params.end = params.begin.rotate(angle, params.origin);
    params.top = params.begin.add(params.end).scale(0.51);

    return params;
  }, /**
   *
   * @param {Vector}origin
   * @param {Number}length
   * @param {Number}angle
   * @param {Number}forceAngle
   */
  init: function(origin, length, angle, forceAngle) {
    this.params = this.createCone(origin, length, forceAngle, angle);

    var graphics = new PIXI.Graphics();
    this.dimensions = {};
    this.drawCone(graphics, this.params);
    this._super('shield', graphics);
    this.frozen = true;

    this.dimensions.vertices = function (dimensions) {
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

  },
  adjustWidth: function(angle) {
    this._graphics.clear();
    this.params.angle = angle;
    this.params = this.createCone(this.params.origin, this.params.length, this.params.forceAngle, this.params.angle);
    this.drawCone(this._graphics, this.params);
  },
  adjustAngle: function(angle) {
    this._graphics.clear();
    this.params.forceAngle = angle;
    this.params = this.createCone(this.params.origin, this.params.length, this.params.forceAngle, this.params.angle);
    this.drawCone(this._graphics, this.params);
  },
  update: function() {

  },
  handleCollision: function() {
    //alert('collide');
  },
  apply: function() {
    //Draw
    //Detect entities
    //Calculate distance
    //Apply force
  }
});

