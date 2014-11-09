(function() {
  "use strict";

  wrect.Geometry = wrect.Geometry || {};

  var Vector = wrect.Physics.Vector;

  /**
   *
   * @class wrect.Geometry.Line
   * @constructor
   */
  wrect.Geometry.Line = function (point1, point2) {
    this.point1 = point1;
    this.point2 = point2;
  };

  wrect.Geometry.Line.prototype.getSize = function() {

  }
}());
