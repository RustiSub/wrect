(function() {
  "use strict";

  wrect.Core.Rendering.Camera = function() {
    //this.camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
    //this.camera.position.z = 100;
    this.camera = new THREE.OrthographicCamera( window.innerWidth/ - 2, window.innerWidth/ 2, window.innerHeight / 2, window.innerHeight / -2, 1, 1000);
    var size = 40;
    this.camera = new THREE.OrthographicCamera( window.innerWidth / -size, window.innerWidth / size, window.innerHeight / size, window.innerHeight / - size, - 500, 1000 );
    this.camera.position.y += 15;
  };

  wrect.Core.Rendering.Camera.prototype.getCamera = function() {
    return this.camera;
  };
}());
