(function() {
  "use strict";
  
  var Vector = require('../../Physics/Vector');
  var BaseSystem = require('./BaseSystem');

  var Physics = function (options) {
    BaseSystem.call(this, options);

    this.options = options || {};
    this.gameTime = options.game.getGameTime();
  };

  Physics.prototype = Object.create( BaseSystem.prototype );
  Physics.prototype.constructor = Physics;

  Physics.prototype.name = 'Physics';

  Physics.prototype.checkDependencies = function(entity) {
    return entity.components.RigidBody ? true : false;
  };

  Physics.prototype.perform = function(entity) {
    var dt = 1/6;//this.gameTime.getDelta() / 100;

    var rigidBody = entity.components.RigidBody;

    if (!entity.components.RigidBody.frozen) {
      var physicsBody = rigidBody.physicsBody;

      if (physicsBody.f.x !== 0 || physicsBody.f.y !== 0) {
        physicsBody.v = physicsBody.v.add(physicsBody.f);
      }

      var oldV = physicsBody.v;
      var move = new Vector(
          (oldV.x + physicsBody.v.x) * 0.5 * dt,
          (oldV.y + physicsBody.v.y) * 0.5 * dt
      );

      if (move.x !== 0 || move.y !== 0) {
        rigidBody.dimensions.move(move);
      }
    }

    rigidBody.physicsBody.f = new Vector(0, 0);
    rigidBody.physicsBody.a = new Vector(0, 0);
  };
  
  module.exports = Physics;
}());
