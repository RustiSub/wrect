(function() {
  "use strict";

  wrect.ECS = wrect.ECS || {};
  wrect.ECS.Component = wrect.ECS.Component || {};

  var Physics = wrect.Physics.Physics;

  wrect.ECS.Component.Physics = function (options) {
    wrect.ECS.Component.BaseComponent.call(this);

    this.options = options || {};
    this.physics = new Physics();
  };

  wrect.ECS.Component.Visual.prototype = Object.create( wrect.ECS.Component.BaseComponent.prototype );
  wrect.ECS.Component.Visual.prototype.constructor = wrect.ECS.Component.Visual;
  wrect.ECS.Component.Physics.name = 'Physics';
}());
