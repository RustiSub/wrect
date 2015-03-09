(function() {
  "use strict";

  wrect.ECS = wrect.ECS || {};
  wrect.ECS.Component = wrect.ECS.Component || {};

  var Vector = wrect.Physics.Vector;

  wrect.ECS.Component.BaseMaterial = function (options) {
    wrect.ECS.Component.BaseComponent.call(this);

    this.options = options || {};
    this.bounce = options.bounce || 1/1.5;
    this.bounceFriction =  options.bounceFriction || 0;
    this.friction = options.friction || 1;

    game.getEventManager().addListener('physics.collide.absorb', function(data) {
      if (this !== data.material) {
        return;
      }

      var perpSurface = data.surface.perpendicular();
      var forceProjection = data.force.dot(perpSurface);
      var sign = forceProjection >= 0 ? 1 : -1;

      //Absorb gravity
      var gravityForce = perpSurface.unitScalar(sign * data.otherEntity.components.RigidBody.physicsBody.a.y);
      //data.force = data.force.subtract(gravityForce);

      //Absorb perpendicular movement
      var perpForce = data.surface.perpendicular().unitScalar(forceProjection * this.bounce);
      data.force = data.force.subtract(perpForce);

      //Absorb parallel movement
      var parProjection = data.force.dot(data.surface);
      var surfaceFrictionSign = parProjection > 0 ? 1 : -1;
      var surfaceFriction = this.friction * surfaceFrictionSign;

      if ((parProjection > 0 && parProjection > surfaceFriction)) {
        parProjection = surfaceFriction;
      } else if ((parProjection < 0 && parProjection < surfaceFriction)) {
        parProjection = surfaceFriction;
      }

      var parForce = data.surface.unitScalar(parProjection);
      data.force = data.force.subtract(parForce);

    }, this);
  };

  wrect.ECS.Component.BaseMaterial.prototype = Object.create( wrect.ECS.Component.BaseComponent.prototype );
  wrect.ECS.Component.BaseMaterial.prototype.constructor = wrect.ECS.Component.BaseMaterial;
  wrect.ECS.Component.BaseMaterial.prototype.name = 'BaseMaterial';
}());
