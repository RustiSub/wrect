(function() {
  "use strict";

  wrect.Core.Rendering.Renderer.prototype.create = function () {
    this.renderer = new PIXI.WebGLRenderer(800, 600);
  };

  wrect.Core.Rendering.Renderer.prototype.render = function() {
    this.renderer.render(this.sceneManager.getScene(), this.camera.getCamera());
  };
}());
