(function() {
  "use strict";

  var BaseSystem = require('./BaseSystem');

  var Gravity = function (options) {
    BaseSystem.call(this, options);

    this.options = options || {};
    this.gravityDirection = this.options.game.getRenderer().axisOrientation.y;
  };

  Gravity.prototype = Object.create( BaseSystem.prototype );
  Gravity.prototype.constructor = Gravity;

  Gravity.prototype.name = 'Gravity';

  Gravity.prototype.checkDependencies = function(entity) {
    return entity.components.RigidBody ? true : false;
  };

  Gravity.prototype.perform = function(entity) {
    if (entity.components.RigidBody && entity.components.RigidBody.gravity) {
      var rigidBody = entity.components.RigidBody;

      var gravity = new wrect.Physics.Vector(0, 9.81).multiply(rigidBody.physicsBody.m);
      gravity.y *= this.gravityDirection;
      rigidBody.physicsBody.f = rigidBody.physicsBody.f.add(gravity);
    }
  };
  
  module.exports = Gravity;
}());
