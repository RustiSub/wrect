(function() {
  "use strict";

  wrect.ECS = wrect.ECS || {};
  wrect.ECS.Component = wrect.ECS.Component || {};

  var Vector = wrect.Physics.Vector;

  wrect.ECS.Component.Visual = function (options) {
    wrect.ECS.Component.BaseComponent.call(this);

    this.options = options || {};
    this.shape = options.shape;
    this.position = new Vector(0, 0);

    if (this.options.alpha == undefined) {
      this.options.alpha = 1;
    }

    this.options.renderer.draw(this.shape);
  };

  wrect.ECS.Component.Visual.prototype = Object.create( wrect.ECS.Component.BaseComponent.prototype );
  wrect.ECS.Component.Visual.prototype.constructor = wrect.ECS.Component.Visual;
  wrect.ECS.Component.Visual.prototype.name = 'Visual';
}());
