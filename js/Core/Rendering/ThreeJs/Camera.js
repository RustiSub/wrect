(function() {
  "use strict";

  wrect.Core.Rendering.Camera = function() {
    var size = 25;
    this.camera = new THREE.OrthographicCamera( window.innerWidth / -size, window.innerWidth / size, window.innerHeight / size, window.innerHeight / - size, - 500, 1000 );
    this.camera.position.y += 25;
  };

  wrect.Core.Rendering.Camera.prototype.getCamera = function() {
    return this.camera;
  };
}());
