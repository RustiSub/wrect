(function() {
  "use strict";

  wrect.Core.Rendering.Camera = function() {
    this.camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
    this.camera.position.z = 100;
  };

  wrect.Core.Rendering.Camera.prototype.getCamera = function() {
    return this.camera;
  };
}());
