(function() {
  /**

   *
   * @class wrect.Dimension
   * @constructor
   */
  wrect.Geometry.Rectangle = function () {

  };

  wrect.Geometry.Rectangle.prototype = Object.create( wrect.Geometry.Dimensions.prototype );
  wrect.Geometry.Rectangle.prototype.constructor = wrect.Geometry.Rectangle;

  wrect.Geometry.Rectangle.getBounds = function() {
    wrect.Geometry.Dimensions.getBounds.call(this);
  };
}());
