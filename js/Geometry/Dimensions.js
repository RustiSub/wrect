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
    this.previousOrigin = null;
  };

  wrect.Geometry.Dimensions.prototype.move = function(v) {
    for(var vertexIndex in this.vertices) {
      var vertex = this.vertices[vertexIndex];

      this.vertices[vertexIndex] = vertex.add(v);
    }

    this.origin = this.origin.add(v);
  };
  wrect.Geometry.Dimensions.prototype.rotate = function() {};
  wrect.Geometry.Dimensions.prototype.getBounds = function() {};
  wrect.Geometry.Dimensions.prototype.getCenter = function() {};
}());
