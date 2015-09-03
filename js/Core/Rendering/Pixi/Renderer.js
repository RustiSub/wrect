(function() {
  "use strict";

  wrect.Core.Rendering.Renderer.prototype.create = function () {
    this.renderer = PIXI.autoDetectRenderer(800, 600, { antialias: true });
    document.body.appendChild(this.renderer.view);
  };

  wrect.Core.Rendering.Renderer.prototype.render = function() {
    this.renderer.render(this.sceneManager.getScene());
  };
}());
