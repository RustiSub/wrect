(function() {
  "use strict";

  /** @type {Vector} */
  var Vector = require('Physics/Vector');

  /** @type {Dimensions} */
  var Dimensions = require('Geometry/Dimensions');

  /**
   *
   * @class Polygon
   * @constructor
   */
  var Polygon = function (options) {
    Dimensions.call(this);

    this.options = options;
    this.vertices = options.vertices || [];
    this.origin = options.origin || new Vector(0, 0);
    this.offsetVertices = [];
  };

  Polygon.prototype = Object.create( Dimensions.prototype );
  Polygon.prototype.constructor = Polygon;

  Polygon.prototype.getBounds = function() {
    return {
      topLeft: this.vertices[0],
      topRight: this.vertices[1],
      bottomRight: this.vertices[2],
      bottomLeft: this.vertices[3]
    };
  };

  Polygon.prototype.getCollisionVertices = function() {
    return this.vertices;
  };

  Polygon.prototype.draw = function(renderer) {};

  module.exports = Polygon;
}());
