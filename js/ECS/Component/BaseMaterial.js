(function() {
  "use strict";

  wrect.ECS = wrect.ECS || {};
  wrect.ECS.Component = wrect.ECS.Component || {};

  var Vector = wrect.Physics.Vector;

  wrect.ECS.Component.BaseMaterial = function (options) {
    wrect.ECS.Component.BaseComponent.call(this);

    this.options = options || {};
    this.absorb = this.options.absorb || new Vector(0, 0);

    game.getEventManager().addListener('physics.collide', function(data) {
      //data.force = data.force.multiply(new Vector(1, 1).subtract(this.absorb));

      var sign = data.force.x <= 0 ? -1 : 1;

      var frictionForce = 0.025 * data.entity.components.RigidBody.physicsBody.m;
      var friction = -sign * frictionForce;
      if (Math.abs(data.force.x) > frictionForce) {
        data.force = data.force.add(new Vector(friction, - data.force.y));
      } else {
        data.force = new Vector(0, 0); // data.force.add(new Vector(0, - data.force.y));
      }
    }, this);
  };

  wrect.ECS.Component.BaseMaterial.prototype = Object.create( wrect.ECS.Component.BaseComponent.prototype );
  wrect.ECS.Component.BaseMaterial.prototype.constructor = wrect.ECS.Component.BaseMaterial;
  wrect.ECS.Component.BaseMaterial.prototype.name = 'BaseMaterial';
}());
