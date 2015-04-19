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
    this.width = options.width;
    this.height = options.height;

    var widthVector = new Vector(options.width, 0);
    var heightVector = new Vector(0, options.height);

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

  wrect.Geometry.Rectangle.prototype.draw = function(renderer) {
    //graphics.clear();
    //
    //graphics.beginFill(this.options.color || 0x000000, this.options.alpha);
    //graphics.moveTo(0, 0);
    //graphics.lineTo(this.options.w, 0);
    //graphics.lineTo(this.options.w, this.options.h);
    //graphics.lineTo(0, this.options.h);
    //
    //graphics.endFill();
  };
}());
