(function() {
  "use strict";

  wrect.Geometry = wrect.Geometry || {};

  /**
   *
   * @class wrect.Geometry.Dimensions
   * @constructor
   */
  wrect.Geometry.Dimensions = function () {
    this.vertices = [];
  };

  wrect.Geometry.Dimensions.prototype.move = function(v) {
    var vertices = this.vertices;

    for(var vertexIndex in vertices) {
      var vertex = vertices[vertexIndex];

      vertex.add(v);
    }
  };
  wrect.Geometry.Dimensions.prototype.rotate = function() {};
  wrect.Geometry.Dimensions.prototype.getBounds = function() {};
  wrect.Geometry.Dimensions.prototype.getCenter = function() {};
}());
