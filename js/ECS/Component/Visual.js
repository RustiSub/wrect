(function() {
  "use strict";

  wrect.ECS = wrect.ECS || {};
  wrect.ECS.Component = wrect.ECS.Component || {};

  wrect.ECS.Component.Visual = function (options) {
    wrect.ECS.Component.BaseComponent.call(this);

    this.options = options || {};
    this.graphics = options.graphics || new PIXI.Graphics();
    this.color =  options.color || 0x000000;
  };

  wrect.ECS.Component.Visual.prototype = Object.create( wrect.ECS.Component.BaseComponent.prototype );
  wrect.ECS.Component.Visual.prototype.constructor = wrect.ECS.Component.Visual;
  wrect.ECS.Component.Visual.name = 'Visual';
}());
