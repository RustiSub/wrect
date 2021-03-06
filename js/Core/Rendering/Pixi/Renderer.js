(function() {
  "use strict";

  var Renderer = require('../Renderer');

  Renderer.prototype.create = function () {
    this.renderer = PIXI.autoDetectRenderer(this.options.width, this.options.height, { antialias: true });
    document.body.appendChild(this.renderer.view);
  };

  Renderer.prototype.render = function() {
    this.renderer.render(this.sceneManager.getScene());
  };

  module.exports = Renderer;
}());
