/**
 * @augments MovableEntity
 * @type {void|*}
 */
var Force = BaseEntity.extend({

  params: {},

  drawCone: function (forceGraphics, params) {
    forceGraphics.beginFill(0xFFFFFF);
    forceGraphics.moveTo(params.origin.x, params.origin.y);
    forceGraphics.lineTo(params.begin.x, params.begin.y);
    forceGraphics.lineTo(params.top.x, params.top.y);
    forceGraphics.lineTo(params.end.x, params.end.y);
    forceGraphics.lineTo(params.origin.x, params.origin.y);
    forceGraphics.endFill();
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
    this.drawCone(graphics, this.params);
    this._super('shield', graphics);

    this.dimensions = {};

    this.dimensions.topLeft = this.params.origin;
    this.dimensions.topRight = this.params.begin;
    this.dimensions.bottomRight = this.params.top;
    this.dimensions.bottomLeft = this.params.end;

    this.dimensions.vertices = function (dimensions) {
      return [
        dimensions.topLeft,
        dimensions.topRight,
        dimensions.bottomRight,
        dimensions.bottomLeft
      ];
    };

    this.physicsBody = {};
  },
  adjustWidth: function(angle) {
    this._graphics.clear();
    this.params.forceAngle = angle;
    this.params = this.createCone(this.params.origin, this.params.length, this.params.forceAngle, this.params.angle);
    this.drawCone(this._graphics, this.params);
  },
  update: function() {

  },
  apply: function() {
    //Draw
    //Detect entities
    //Calculate distance
    //Apply force
  }
});

