(function() {
  "use strict";

  var Visual = require('');

  Visual.prototype.setPosition = function(x, y, z) {
    if (this.graphics.position.x !== x || this.graphics.position.y !== y || this.graphics.position.z !== z) {
      this.graphics.position.set(x, y, z);
    }
  }
}());
