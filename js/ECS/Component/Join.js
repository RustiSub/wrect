(function() {
  "use strict";

  wrect.ECS = wrect.ECS || {};
  wrect.ECS.Component = wrect.ECS.Component || {};

  wrect.ECS.Component.Join = function (options) {
    wrect.ECS.Component.BaseComponent.call(this);

    options = options || {};
    this.graphics = options.graphics || new PIXI.Graphics();

    this.color =  options.color || 0x000000;
  };

  wrect.ECS.Component.Join.prototype = Object.create( wrect.ECS.Component.BaseComponent.prototype );
  wrect.ECS.Component.Join.prototype.constructor = wrect.ECS.Component.Join;
  wrect.ECS.Component.Join.prototype.name = 'Join';
}());
