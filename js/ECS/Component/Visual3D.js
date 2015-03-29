(function() {
  "use strict";

  wrect.ECS = wrect.ECS || {};
  wrect.ECS.Component = wrect.ECS.Component || {};

  wrect.ECS.Component.Visual3D = function (options) {
    wrect.ECS.Component.BaseComponent.call(this);

    this.options = options || {};
    this.graphics = options.graphics || new THREE.Object3D();
    this.shape = options.shape;

    if (this.options.alpha == undefined) {
      this.options.alpha = 1;
    }
  };

  wrect.ECS.Component.Visual3D.prototype = Object.create( wrect.ECS.Component.BaseComponent.prototype );
  wrect.ECS.Component.Visual3D.prototype.constructor = wrect.ECS.Component.Visual3D;
  wrect.ECS.Component.Visual3D.prototype.name = 'Visual3D';

  wrect.ECS.Component.Visual3D.prototype.draw = function(graphics, options) {
    this.shape.draw(graphics, options);
  };

  wrect.ECS.Component.Visual3D.prototype.reDraw = function(origin, dimensions) {};

  wrect.ECS.Component.Visual3D.prototype.clear = function() {
    console.log('not implemented yet');
  }
}());
