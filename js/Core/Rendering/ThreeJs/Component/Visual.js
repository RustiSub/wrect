(function() {
  "use strict";

  wrect.ECS.Component.Visual.prototype.setPosition = function(x, y) {
    console.log(this.graphics.position.y, y);
    debugger;
    if (this.graphics.position.x !== x || this.graphics.position.y !== y) {
      var diff = this.graphics.position.y - y;
      this.graphics.position.y += diff;
      //this.graphics.position.set(x, y, 0);
    }

    //this.graphics.position.x += 1;
    //console.log(this.graphics.position.x);
    //this.graphics.rotation.x += 0.01;
    //this.graphics.rotation.y += 0.01;
  }
}());
