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

    this.vertices = options.vertices || [];
    this.origin = options.origin || new Vector(0, 0);
    this.offsetVertices = [];
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

  wrect.Geometry.Polygon.prototype.getCollisionVertices = function() {
    return this.vertices;
  };

  wrect.Geometry.Polygon.prototype.draw = function(graphics, options) {
    graphics.clear();

    graphics.beginFill(options.color || 0x000000, options.alpha);
    graphics.moveTo(this.vertices[0].x, this.vertices[0].y);

    for(var v = 0; v < this.vertices.length; v++) {
      var vertex = this.vertices[v];
      graphics.lineTo(vertex.x, vertex.y);
    }

    graphics.moveTo(this.vertices[0].x, this.vertices[0].y);

    graphics.endFill();
  };
}());
