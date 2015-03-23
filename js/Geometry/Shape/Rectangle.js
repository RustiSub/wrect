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

    this.origin = options.origin;

    var width = new Vector(options.width, 0);
    var height = new Vector(0, options.height);

    this.vertices = [
      options.origin,
      options.origin.add(width),
      options.origin.add(width).add(height),
      options.origin.add(height)
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

  wrect.Geometry.Rectangle.prototype.getBounds = function() {
    return {
      topLeft: this.vertices[0],
      topRight: this.vertices[1],
      bottomRight: this.vertices[2],
      bottomLeft: this.vertices[3]
    };
  };

  wrect.Geometry.Rectangle.prototype.getCollisionVertices = function() {
    return this.vertices;
  };

  wrect.Geometry.Rectangle.prototype.draw = function(graphics, options) {
    graphics.clear();

    graphics.beginFill(options.color || 0x000000, options.alpha);
    graphics.moveTo(0, 0);
    graphics.lineTo(options.w, 0);
    graphics.lineTo(options.w, options.h);
    graphics.lineTo(0, options.h);

    graphics.endFill();
  };
}());
