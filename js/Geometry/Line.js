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

  };

  wrect.Geometry.Line.prototype.getIntersections = function(line) {
    var a = this.point1;
    var b = this.point2;
    var c = line.point1;
    var d = line.point2;

    var CmP = c.subtract(a);
    var r = b.subtract(a);
    var s = d.subtract(c);

    var CmPxr = CmP.cross(r);
    var CmPxs = CmP.cross(s);
    var rxs = r.cross(s);

    if (rxs === 0) { return false; }

    var rxsr = 1 / rxs;
    var t = CmPxs * rxsr;
    var u = CmPxr * rxsr;

    //console.log(t, u);
    var ptr = a.add(r.multiply(t));
    var qus = c.add(s.multiply(u));
    //p + t r = q + u s.
    //console.log(ptr, qus);

    if ((t >= 0) && (t <= 1) && (u >= 0) && (u <= 1)) {
      return qus;
    }

    return false;
  };
}());
