/**
 * @augments MovableEntity
 * @type {void|*}
 */
var Force = BaseEntity.extend({

  //TODO : Move to Shield
  origin: 0,
  begin: 0,
  end: 0,

  /**
   *
   * @param {Vector}origin
   * @param {Number}length
   * @param {Number}angle
   * @param {Number}forceAngle
   */
  init: function(origin, length, angle, forceAngle) {
    var forceGraphics = new PIXI.Graphics();
    this.origin = origin;
    this.begin = new Vector(origin.x + length, this.origin.y);
    forceAngle = window.game.getHelpers().math.toRadians(forceAngle);
    this.begin = this.begin.rotate(forceAngle, origin);

    angle = window.game.getHelpers().math.toRadians(angle);
    this.end = this.begin.rotate(angle, this.origin);
    this.top = this.begin.add(this.end).scale(0.51);

    forceGraphics.beginFill(0xFFFFFF);
    forceGraphics.moveTo(this.origin.x, this.origin.y);
    forceGraphics.lineTo(this.begin.x, this.begin.y);
    forceGraphics.lineTo(this.top.x, this.top.y);
    forceGraphics.lineTo(this.end.x, this.end.y);
    forceGraphics.lineTo(this.origin.x, this.origin.y);
    forceGraphics.endFill();

    this._super('shield', forceGraphics);

    this.dimensions = {};

    this.dimensions.topLeft = this.origin;
    this.dimensions.topRight = this.begin;
    this.dimensions.bottomRight = this.top;
    this.dimensions.bottomLeft = this.end;

    this.dimensions.vertices = function(dimensions) {
      return [
        dimensions.topLeft,
        dimensions.topRight,
        dimensions.bottomRight,
        dimensions.bottomLeft
      ];
    };

    this.physicsBody = {};
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

