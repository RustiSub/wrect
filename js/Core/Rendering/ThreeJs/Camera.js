(function() {
  "use strict";

  var Camera = require('Core/Rendering/Camera');

  Camera.prototype.getCamera = function() {
    return this.camera;
  };
  Camera.prototype.setCamera = function(camera) {
    this.camera = camera;
  };

  module.exports = Camera;
}());
