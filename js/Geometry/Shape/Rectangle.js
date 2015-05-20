(function() {
  "use strict";

  var Vector = wrect.Physics.Vector;

  /**
   *
   * @class wrect.Geometry.Rectangle
   * @constructor
   */
  wrect.Geometry.Rectangle = function (options) {
    wrect.Geometry.Dimensions.call(this);

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

  wrect.Geometry.Rectangle.prototype = Object.create( wrect.Geometry.Dimensions.prototype );
  wrect.Geometry.Rectangle.prototype.constructor = wrect.Geometry.Rectangle;

  wrect.Geometry.Rectangle.prototype.getVertices = function() {
    return this.vertices;
  };

  wrect.Geometry.Rectangle.prototype.getCollisionVertices = function() {
    return this.vertices;
  };

  wrect.Geometry.Rectangle.prototype.draw = function(renderer) {};
  wrect.Geometry.Rectangle.prototype.rotate = function(origin) {};
}());
