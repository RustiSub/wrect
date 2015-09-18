(function() {
  "use strict";

  /** @type {Vector} */
  var Vector = require('Physics/Vector');
  /** @type {Polygon} */
  var Polygon = require('Geometry/Shape/Polygon');

  Polygon.prototype.draw = function() {
    var graphics = new PIXI.Graphics();

    graphics.clear();

    graphics.beginFill(this.options.color || 0x000000, this.options.alpha);
    graphics.moveTo(this.vertices[0].x, this.vertices[0].y);

    for(var v = 0; v < this.vertices.length; v++) {
      var vertex = this.vertices[v];
      graphics.lineTo(vertex.x, vertex.y);
    }

    graphics.moveTo(this.vertices[0].x, this.vertices[0].y);

    graphics.endFill();
  };

  Polygon.prototype.rotate = function(origin) {

  };

  module.exports = Polygon;
}());
