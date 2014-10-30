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

  wrect.ECS.Component.RigidBody.prototype.handleCollision = function(collisionShape, axesOverlap) {

    function capSmallSpeed(speed) {
      return speed > -1 && speed < 1 ? 0 : speed;
    }

    var v = this.physicsBody.a;//.unit();
    var n = axesOverlap.axis;//.unit();
    var vn = v.dot(n);
    var u = n.multiply(vn);
    var w = v.subtract(u);
    var v2 = w.subtract(u);


    v2.x = capSmallSpeed(v2.x);
    v2.y = capSmallSpeed(v2.y);

    var sign = vn ? vn < 0 ? -1 : 1:0;
    var pushOutVector = n.unit().multiply(axesOverlap.overlap * -sign);

    this.dimensions.move(pushOutVector);

    if (!collisionShape.frozen) {
//      collisionShape.physicsBody.v = collisionShape.physicsBody.v.add(v.multiply(energyTransfer));
//      v2 = v2.multiply(energyTransfer);
    }

    this.physicsBody.a = v2;
  };
}());
