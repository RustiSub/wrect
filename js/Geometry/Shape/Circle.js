(function() {
  "use strict";

  /** @type {Vector} */
  var Vector = require('Physics/Vector');

  /** @type {Dimensions} */
  var Dimensions = require('Geometry/Dimensions');

  /**
   *
   * @class Circle
   * @constructor
   */
  var Circle = function (options) {
    Dimensions.call(this);

    this.origin = options.origin;
    this.vertices = [options.origin];
    this.radius = options.radius;

    this.offsetVertices = [];
  };

  Circle.prototype = Object.create( Dimensions.prototype );
  Circle.prototype.constructor = Circle;

  Circle.prototype.getBounds = function() {
    var topLeft = this.vertices[0].subtract(new Vector(this.radius, 0)).subtract(new Vector(0, this.radius));

    return {
      topLeft: topLeft,
      topRight: topLeft.add(new Vector(this.radius * 2, 0)),
      bottomRight: topLeft.add(new Vector(this.radius * 2, 0)).add(new Vector(0, this.radius * 2)),
      bottomLeft: topLeft.add(new Vector(0, this.radius * 2))
    };
  };

  Circle.prototype.getCenter = function() {
    return this.origin;
  };

  Circle.prototype.getCollisionVertices = function(axis) {
    if (typeof axis != 'undefined') {
      return [
        this.origin.add(axis.unitScalar(this.radius)),
        this.origin,
        this.origin.add(axis.unitScalar(-this.radius))
      ];
    }

    return [this.origin];
  };

  Circle.prototype.draw = function(graphics, options) {
    graphics.clear();

    graphics.beginFill(options.color || 0x000000, options.alpha);
    //graphics.drawCircle(options.origin.x, options.origin.y, options.radius);
    graphics.drawCircle(0, 0, options.radius);

    graphics.endFill();
  };

  module.exports = Circle;
}());
