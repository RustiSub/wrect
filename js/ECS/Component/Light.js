(function() {
  "use strict";

  wrect.ECS = wrect.ECS || {};
  wrect.ECS.Component = wrect.ECS.Component || {};

  wrect.ECS.Component.Light = function (options) {
    wrect.ECS.Component.BaseComponent.call(this);

    options = options || {};
    this.lightGraphics = options.lightGraphics || new PIXI.Graphics();

    this.color =  options.color || 0x000000;
  };

  wrect.ECS.Component.Light.prototype = Object.create( wrect.ECS.Component.BaseComponent.prototype );
  wrect.ECS.Component.Light.prototype.constructor = wrect.ECS.Component.Light;
  wrect.ECS.Component.Light.prototype.name = 'Light';
}());
