(function() {
  "use strict";

  wrect.Core.Rendering.Renderer.prototype.create = function () {
    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( this.renderer.domElement );
  };

  wrect.Core.Rendering.Renderer.prototype.render = function() {
    this.renderer.render(this.sceneManager.getScene(), this.camera.getCamera());
  };
}());
