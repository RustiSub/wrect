(function() {
  "use strict";

  var Vector = wrect.Physics.Vector;
// TODO: revert this
  /**
   *
   * @class wrect.Geometry.Rectangle
   * @constructor
   */
  wrect.Geometry.Rectangle = function (options) {
    wrect.Geometry.Dimensions.call(this);

    this.origin = options.origin;

    this.width = new Vector(options.width, 0);
    this.height = new Vector(0, options.height);

    this.vertices = [
      options.origin,
      options.origin.add(this.width),
      options.origin.add(this.width).add(this.height),
      options.origin.add(this.height)
    ];
  };

  wrect.Geometry.Rectangle.prototype = Object.create( wrect.Geometry.Dimensions.prototype );
  wrect.Geometry.Rectangle.prototype.constructor = wrect.Geometry.Rectangle;

  wrect.Geometry.Rectangle.prototype.getBounds = function() {
    this.vertices = [
      this.origin,
      this.origin.add(this.width),
      this.origin.add(this.width).add(this.height),
      this.origin.add(this.height)
    ];
    return {
      topLeft: this.vertices[0],
      topRight: this.vertices[1],
      bottomRight: this.vertices[2],
      bottomLeft: this.vertices[3]
    };
  };
}());
