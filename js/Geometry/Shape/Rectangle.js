(function() {
  "use strict";

  var Vector = wrect.Physics.Vector;
  var Line = wrect.Geometry.Line;

  /**
   *
   * @class wrect.Geometry.Rectangle
   * @constructor
   */
  wrect.Geometry.Rectangle = function (options) {
    wrect.Geometry.Dimensions.call(this);

    this.origin = options.origin;

    var width = new Vector(options.width, 0);
    var height = new Vector(0, options.height);

    this.vertices = [
      options.origin,
      options.origin.add(width),
      options.origin.add(width).add(height),
      options.origin.add(height)
    ];

    this.edges = [];

    for(var vertexIndex = 0; vertexIndex < this.vertices.length; vertexIndex++) {
      var nextPointIndex = (vertexIndex + 1);
      if (nextPointIndex === this.vertices.length) {
        nextPointIndex = 0;
      }
      this.edges.push(new Line(this.vertices[vertexIndex], this.vertices[nextPointIndex]));
    }
  };

  wrect.Geometry.Rectangle.prototype = Object.create( wrect.Geometry.Dimensions.prototype );
  wrect.Geometry.Rectangle.prototype.constructor = wrect.Geometry.Rectangle;

  wrect.Geometry.Rectangle.prototype.getCenter = function() {
    var diagonal = this.vertices[2].subtract(this.vertices[0]);
    return this.vertices[0].add(diagonal.scale(0.5));
  };

  wrect.Geometry.Rectangle.prototype.getBounds = function() {
    return {
      topLeft: this.vertices[0],
      topRight: this.vertices[1],
      bottomRight: this.vertices[2],
      bottomLeft: this.vertices[3]
    };
  };
}());
