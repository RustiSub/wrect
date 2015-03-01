(function() {
  "use strict";

  var Vector = wrect.Physics.Vector;

  /**
   *
   * @class wrect.Geometry.Circle
   * @constructor
   */
  wrect.Geometry.Circle = function (options) {
    wrect.Geometry.Dimensions.call(this);

    this.origin = options.origin;
    this.vertices = [options.origin];
    this.radius = options.radius;

    this.offsetVertices = [];
  };

  wrect.Geometry.Circle.prototype = Object.create( wrect.Geometry.Dimensions.prototype );
  wrect.Geometry.Circle.prototype.constructor = wrect.Geometry.Circle;

  wrect.Geometry.Circle.prototype.getBounds = function() {
    var topLeft = this.vertices[0].subtract(new Vector(this.radius, 0)).subtract(new Vector(0, this.radius));
      return {
      topLeft: topLeft,
      topRight: topLeft.add(new Vector(this.radius * 2, 0)),
      bottomRight: topLeft.add(new Vector(this.radius * 2, 0)).add(new Vector(0, this.radius * 2)),
      bottomLeft: topLeft.add(new Vector(0, this.radius * 2))
    };
  };

  wrect.Geometry.Circle.prototype.getCollisionVertices = function(axis) {
    if (typeof axis != 'undefined') {
      return [
        this.origin.add(axis.unitScalar(this.radius)),
        this.origin,
        this.origin.add(axis.unitScalar(-this.radius))
      ];
    }

    return [this.origin];
  };

  wrect.Geometry.Circle.prototype.draw = function(graphics, options) {
    graphics.clear();

    graphics.beginFill(options.color || 0x000000, options.alpha);
    graphics.drawCircle(options.origin.x, options.origin.y, options.radius);

    graphics.endFill();
  };
}());
