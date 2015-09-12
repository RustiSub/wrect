(function() {
  "use strict";

  var Vector = require('../Physics/Vector');

  /**
   *
   * @class Dimensions
   * @constructor
   */
  var Dimensions = function () {
    this.vertices = [];
    this.originalVertices = [];
    this.origin = new Vector(0, 0);
    this.previousOrigin = null;

    this.offset = new Vector(0, 0);
  };

  Dimensions.prototype.move = function(v) {
    for(var vertexIndex in this.vertices) {
      var vertex = this.vertices[vertexIndex];

      this.vertices[vertexIndex] = vertex.add(v);
    }
    
    this.origin = this.origin.add(v);
  };

  Dimensions.prototype.setOrigin = function(v) {
    this.origin = v;
    this.updateVertices();
  };

  Dimensions.prototype.updateVertices = function() {
  };

  Dimensions.prototype.rotate = function() {};
  Dimensions.prototype.getVertices = function() {};
  Dimensions.prototype.getCollisionVertices = function() {};
  Dimensions.prototype.getCenter = function() {};
  Dimensions.prototype.draw = function() {};
  
  module.exports = Dimensions;
}());
