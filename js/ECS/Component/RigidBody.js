(function() {
  "use strict";

  wrect.ECS = wrect.ECS || {};
  wrect.ECS.Component = wrect.ECS.Component || {};

  wrect.ECS.Component.RigidBody = function (options) {
    wrect.ECS.Component.BaseComponent.call(this);

    options = options || {};
    this.dimensions = options.dimensions || new wrect.Geometry.Dimensions();
    this.physicsBody = options.physicsBody || new wrect.Physics.PhysicsBody();
    this.move = new wrect.Physics.Vector(0, 0);
    this.pushOutMove = new wrect.Physics.Vector(0, 0);

    this.frozen = options.frozen;
    this.solid = true;
  };

  wrect.ECS.Component.RigidBody.prototype = Object.create(wrect.ECS.Component.BaseComponent.prototype);
  wrect.ECS.Component.RigidBody.prototype.constructor = wrect.ECS.Component.RigidBody;
  wrect.ECS.Component.RigidBody.prototype.name = 'RigidBody';
}());
