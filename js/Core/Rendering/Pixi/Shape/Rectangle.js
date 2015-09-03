(function() {
  "use strict";

  var Vector = wrect.Physics.Vector;

  wrect.Geometry.Rectangle.prototype.draw = function() {
    var graphics = new PIXI.Graphics();

    graphics.beginFill(this.options.material.color, this.options.material.alpha);
    graphics.drawRect(0, 0, this.dimension.x, this.dimension.y);
    graphics.endFill();

    return graphics;
  };

  wrect.Geometry.Rectangle.prototype.rotate = function(origin) {

  };
}());
