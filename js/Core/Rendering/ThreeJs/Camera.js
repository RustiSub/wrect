(function() {
  "use strict";

  wrect.Core.Rendering.Camera = function() {
    this.camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
    this.camera.position.z = 150;
    this.camera.position.x = 200;
    this.camera.position.y = -100;
  };

  wrect.Core.Rendering.Camera.prototype.getCamera = function() {
    return this.camera;
  };
}());
