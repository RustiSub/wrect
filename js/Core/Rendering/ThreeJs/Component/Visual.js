(function() {
  "use strict";

  wrect.ECS.Component.Visual.prototype.setPosition = function(x, y) {
    this.graphics.position.set(x, y, 0);

    //this.graphics.rotation.x += 0.01;
    //this.graphics.rotation.y += 0.01;
  }
}());
