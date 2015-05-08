(function() {
  "use strict";

  var Vector = wrect.Physics.Vector;

  /**
   *
   * @class wrect.Geometry.Hexagon
   * @constructor
   */
  wrect.Geometry.Hexagon = function (options) {
    wrect.Geometry.Dimensions.call(this);

    this.options = options || {};
    this.size = options.size || 1;
    this.origin = options.origin ||new Vector(0, 0);
    var calcOrigin = new Vector(0, 0);

    this.vertices = [];

    var baseVector = new Vector(options.size, 0);

    for (var i = 0; i < 6; i++) {
      var v = baseVector.rotate((60 * i) * (Math.PI / 180), new Vector(0, 0));
      this.vertices.push(v);
    }

    this.offsetVertices = [];
  };

  wrect.Geometry.Hexagon.prototype = Object.create( wrect.Geometry.Dimensions.prototype );
  wrect.Geometry.Hexagon.prototype.constructor = wrect.Geometry.Hexagon;

  wrect.Geometry.Hexagon.prototype.getBounds = function() {
    return {
      topLeft: this.vertices[0],
      topRight: this.vertices[1],
      bottomRight: this.vertices[2],
      bottomLeft: this.vertices[3]
    };
  };

  wrect.Geometry.Hexagon.prototype.getCollisionVertices = function() {
    return this.vertices;
  };

  wrect.Geometry.Hexagon.prototype.draw = function(graphics, options) {};
}());
