(function() {
  "use strict";

  wrect.ECS = wrect.ECS || {};
  wrect.ECS.Component = wrect.ECS.Component || {};

  wrect.ECS.Component.BaseMaterial = function (options) {
    wrect.ECS.Component.BaseComponent.call(this);

    this.options = options || {};
    this.absorb = this.options.absorb || 0;

    game.getEventManager().addListener('physics.collide', function(data) {
      data.force = data.force.multiply(1 - this.absorb);
    }, this);
  };

  wrect.ECS.Component.BaseMaterial.prototype = Object.create( wrect.ECS.Component.BaseComponent.prototype );
  wrect.ECS.Component.BaseMaterial.prototype.constructor = wrect.ECS.Component.BaseMaterial;
  wrect.ECS.Component.BaseMaterial.prototype.name = 'BaseMaterial';
}());
