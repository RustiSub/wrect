(function() {
  "use strict";

  /** @type {Rectangle} */
  var Rectangle = require('Geometry/Shape/Rectangle');

  Rectangle.prototype.draw = function() {
    var graphics = new PIXI.Graphics();

    graphics.beginFill(this.options.material.color, this.options.material.alpha);
    graphics.drawRect(0, 0, this.dimension.x, this.dimension.y);
    graphics.endFill();

    return graphics;
  };

  Rectangle.prototype.rotate = function(origin) {

  };
  
  module.exports = Rectangle;  
}());
