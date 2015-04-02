(function() {
  "use strict";

  wrect.ECS.Component.Visual.prototype.setPosition = function(x, y) {
    if (this.graphics.position.x !== x || this.graphics.position.y !== y) {
      //this.graphics.position.set(Math.round(x), Math.round(y), 0);
      //console.log(this.shape.width);
      this.graphics.position.set(x, y, 0);
      //this.graphics.rotation.x += 0.01;
      //this.graphics.rotation.y += 0.01;
    }
  }
}());
