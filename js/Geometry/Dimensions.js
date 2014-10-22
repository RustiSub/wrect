(function() {
  "use strict";

  wrect.Geometry = wrect.Geometry || {};

  var Vector = wrect.Physics.Vector;

  /**
   *
   * @class wrect.Geometry.Dimensions
   * @constructor
   */
  wrect.Geometry.Dimensions = function () {
    this.vertices = [];
    this.origin = new Vector(0, 0);
  };

  wrect.Geometry.Dimensions.prototype.move = function(v) {
    var vertices = this.vertices;

    for(var vertexIndex in vertices) {
      var vertex = vertices[vertexIndex];

      vertex = vertex.add(v);
    }

    this.origin = this.origin.add(v);
  };
  wrect.Geometry.Dimensions.prototype.rotate = function() {};
  wrect.Geometry.Dimensions.prototype.getBounds = function() {};
  wrect.Geometry.Dimensions.prototype.getCenter = function() {};
}());
