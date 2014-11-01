(function() {
  "use strict";

  wrect.ECS = wrect.ECS || {};
  wrect.ECS.Component = wrect.ECS.Component || {};

  wrect.ECS.Component.RigidBody = function (options) {
    wrect.ECS.Component.BaseComponent.call(this);

    options = options || {};
    this.dimensions = options.dimensions || new wrect.Geometry.Dimensions();
    this.physicsBody = options.physicsBody || new wrect.Physics.PhysicsBody();

    this.frozen = options.frozen || true;
  };

  wrect.ECS.Component.RigidBody.prototype = Object.create(wrect.ECS.Component.BaseComponent.prototype);
  wrect.ECS.Component.RigidBody.prototype.constructor = wrect.ECS.Component.RigidBody;
  wrect.ECS.Component.RigidBody.prototype.name = 'RigidBody';
}());
