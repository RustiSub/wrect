(function() {
  "use strict";

  wrect.Core.Rendering.Camera = function() {};

  wrect.Core.Rendering.Camera.prototype.getCamera = function() {
    return this.camera;
  };
  wrect.Core.Rendering.Camera.prototype.setCamera = function(camera) {
    this.camera = camera;
  };
}());
