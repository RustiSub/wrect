(function() {
  "use strict";

  wrect.Core.Rendering.Renderer.prototype.create = function () {
    this.renderer = new THREE.WebGLRenderer({ alpha: true });
    this.renderer.setSize( window.innerWidth, window.innerHeight );
    this.renderer.setClearColor( 0x000000, 1);

    this.renderer.setClearColor( 0xf0f0f0 );
    this.renderer.setPixelRatio( window.devicePixelRatio );
    this.renderer.setSize( window.innerWidth, window.innerHeight );

    document.body.appendChild( this.renderer.domElement );
  };

  wrect.Core.Rendering.Renderer.prototype.render = function() {
    this.renderer.render(this.sceneManager.getScene(), this.camera.getCamera());
  };
}());
