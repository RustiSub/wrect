(function() {
  "use strict";

  var Vector = wrect.Physics.Vector;

  /**
   *
   * @class wrect.Geometry.Polygon
   * @constructor
   */
  wrect.Geometry.Polygon = function (options) {
    wrect.Geometry.Dimensions.call(this);

    this.origin = options.origin;
    this.vertices = options.vertices || [];
  };

  wrect.Geometry.Polygon.prototype = Object.create( wrect.Geometry.Dimensions.prototype );
  wrect.Geometry.Polygon.prototype.constructor = wrect.Geometry.Polygon;

  wrect.Geometry.Polygon.prototype.getBounds = function() {
    return {
      topLeft: this.vertices[0],
      topRight: this.vertices[1],
      bottomRight: this.vertices[2],
      bottomLeft: this.vertices[3]
    };
  };
}());
