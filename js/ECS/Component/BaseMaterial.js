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
return;
      var signX = data.force.x <= 0 ? -1 : 1;
      var signY = data.force.y <= 0 ? -1 : 1;

      var frictionForce = 1 * data.entity.components.RigidBody.physicsBody.m;

      //how much of this friction should be applied to x and y?
      //surface horizontal: apply everything to x
      //surface vertical: apply everything to y
      var surfaceFriction = data.surface.multiply(frictionForce);

      surfaceFriction.x = surfaceFriction.x * signX;
      surfaceFriction.x = surfaceFriction.y * signY;
      //console.log(data.surface.unit(), surfaceFriction);
      //debugger;

      if (Math.abs(data.force.x) > surfaceFriction.x) {
        data.force = data.force.add(new Vector(surfaceFriction.x, 0));
      } else {
        data.force.x = 0;
      }

      if (Math.abs(data.force.y) > surfaceFriction.y) {
        data.force = data.force.add(new Vector(0, surfaceFriction.y));
      } else {
        data.force.y = 0;
      }

    }, this);
  };

  wrect.ECS.Component.BaseMaterial.prototype = Object.create( wrect.ECS.Component.BaseComponent.prototype );
  wrect.ECS.Component.BaseMaterial.prototype.constructor = wrect.ECS.Component.BaseMaterial;
  wrect.ECS.Component.BaseMaterial.prototype.name = 'BaseMaterial';
}());
