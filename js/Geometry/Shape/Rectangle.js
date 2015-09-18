(function() {
  "use strict";

  var Dimensions = require('../Dimensions');

  var Vector = require('../../Physics/Vector');

  /**
   *
   * @class Rectangle
   * @constructor
   */
  var Rectangle = function (options) {
    Dimensions.call(this);

    this.options = options;
    this.origin = options.origin;
    this.dimension = options.dimension;

    var widthVector = new Vector(this.dimension.x, 0);
    var heightVector = new Vector(0, this.dimension.y);

    this.vertices = [
      options.origin,
      options.origin.add(widthVector),
      options.origin.add(widthVector).add(heightVector),
      options.origin.add(heightVector)
    ];

    this.offsetVertices = [
      new Vector(0, 0),
      new Vector(0, 0),
      new Vector(0, 0),
      new Vector(0, 0)
    ]
  };

  Rectangle.prototype = Object.create( Dimensions.prototype );
  Rectangle.prototype.constructor = Rectangle;

  Rectangle.prototype.getVertices = function() {
    return this.vertices;
  };

  Rectangle.prototype.getCollisionVertices = function() {
    return this.vertices;
  };

  Rectangle.prototype.draw = function(renderer) {};
  Rectangle.prototype.rotate = function(origin) {};

  Rectangle.prototype.getBounds = function() {
    return {
      topLeft: this.vertices[0],
      topRight: this.vertices[1],
      bottomRight: this.vertices[2],
      bottomLeft: this.vertices[3]
    }
  };

  module.exports = Rectangle;
}());
