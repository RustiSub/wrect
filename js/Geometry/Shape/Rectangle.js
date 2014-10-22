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
  };

  wrect.Geometry.Rectangle.prototype = Object.create( wrect.Geometry.Dimensions.prototype );
  wrect.Geometry.Rectangle.prototype.constructor = wrect.Geometry.Rectangle;

  wrect.Geometry.Rectangle.getBounds = function() {
    wrect.Geometry.Dimensions.getBounds.call(this);
  };
}());
