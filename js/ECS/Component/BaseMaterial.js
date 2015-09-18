(function() {
  "use strict";

  /** @type {Vector} */
  var Vector = require('Physics/Vector');
  /** @type {BaseComponent} */
  var BaseComponent = require('ECS/Component/BaseComponent');

  var BaseMaterial = function (options) {
    BaseComponent.call(this);

    var game = options.game;
    this.options = options || {};
    this.bounce = options.bounce || 1/2;
    this.bounceFriction =  options.bounceFriction || 0;
    this.friction = options.friction || 20;

    game.getEventManager().addListener('physics.collide.absorb', function(data) {
      if (this !== data.material) {
        return;
      }

      var perpSurface = data.surface.perpendicular();
      var forcePerpProjection = data.force.dot(perpSurface);
      var sign = forcePerpProjection >= 0 ? 1 : -1;

      //Absorb gravity
      var gravityForce = perpSurface.unitScalar(sign * data.otherEntity.components.RigidBody.physicsBody.a.y);
      //data.force = data.force.subtract(gravityForce);
      //gravityForce = data.surface.unitScalar(sign * data.otherEntity.components.RigidBody.physicsBody.a.x);
      //data.force = data.force.subtract(gravityForce);

      //Absorb perpendicular movement
      var perpForce = data.surface.perpendicular().unitScalar(forcePerpProjection * this.bounce);
      data.force = data.force.subtract(perpForce);

      //Absorb parallel movement
      var forceParProjection = data.force.dot(data.surface);
      var parForce = data.surface.unitScalar(forceParProjection * this.bounce);
      //data.force = data.force.subtract(parForce);

      var parProjection = data.force.dot(data.surface);
      var surfaceFrictionSign = parProjection > 0 ? 1 : -1;
      var surfaceFriction = this.friction * surfaceFrictionSign;

      if ((parProjection > 0 && parProjection > surfaceFriction)) {
        parProjection = surfaceFriction;
      } else if ((parProjection < 0 && parProjection < surfaceFriction)) {
        parProjection = surfaceFriction;
      }

      var frictionForce = data.surface.unitScalar(parProjection);
      data.force = data.force.subtract(frictionForce);

      ///data.Force = new Vector(0, 0);
    }, this);
  };

  BaseMaterial.prototype = Object.create( BaseComponent.prototype );
  BaseMaterial.prototype.constructor = BaseMaterial;
  BaseMaterial.prototype.name = 'BaseMaterial';
}());
