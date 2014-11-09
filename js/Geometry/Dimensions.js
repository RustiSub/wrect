(function() {
  "use strict";

  wrect.Geometry = wrect.Geometry || {};

  var Vector = wrect.Physics.Vector;
  var Line = wrect.Geometry.Line;

  /**
   *
   * @class wrect.Geometry.Dimensions
   * @constructor
   */
  wrect.Geometry.Dimensions = function () {
    this.vertices = [];
    this.edges = [];
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

  wrect.Geometry.Dimensions.prototype.getEdges = function() {
    var edges = [];

    for(var vertexIndex = 0; vertexIndex < this.vertices.length; vertexIndex++) {
      var nextPointIndex = (vertexIndex + 1);
      if (nextPointIndex === this.vertices.length) {
        nextPointIndex = 0;
      }
      edges.push(new Line(this.vertices[vertexIndex], this.vertices[nextPointIndex]));
    }

    return edges;
  };

  wrect.Geometry.Dimensions.prototype.getVisibleEdges = function(origin) {
    var edges = [];
    var vertices = this.vertices;
    var minRay;
    var maxRay;

    for (var v = 0; v < vertices.length; v++) {
      var vector = vertices[v];

      var projectRay = vector.subtract(origin).perpendicular().unit();
      var ownProjection = vector.dot(projectRay);
      var smallerCount = 0;

      for (var p = 0; p < vertices.length; p++) {
        var projection = vertices[p].dot(projectRay);
        smallerCount += (ownProjection - projection < 0);
      }

      if (smallerCount == vertices.length - 1) {
        maxRay = vector;
      }

      if (smallerCount == 0) {
        minRay = vector;
      }
    }

    edges.push(new Line(minRay, maxRay));

    return edges;
  };

  wrect.Geometry.Dimensions.prototype.rotate = function() {};
  wrect.Geometry.Dimensions.prototype.getBounds = function() {};
  wrect.Geometry.Dimensions.prototype.getCenter = function() {};
}());
