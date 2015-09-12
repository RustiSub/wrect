(function() {
  "use strict";  
  var Vector = require('./../../Physics/Vector.js');

  var BaseSystem = require('./BaseSystem');
  var Mover = function (options) {
    BaseSystem.call(this, options);

    this.options = options || {};

  };

  Mover.prototype = Object.create( BaseSystem.prototype );
  Mover.prototype.constructor = Mover;

  Mover.prototype.name = 'Mover';

  Mover.prototype.checkDependencies = function(entity) {
    return entity.components.RigidBody ? true : false;
  };

  Mover.prototype.perform = function(entity) {
    if (entity.components.RigidBody && !entity.components.RigidBody.frozen) {
      var rigidBody = entity.components.RigidBody;

      if (entity.components.Visual) {
        var visual = entity.components.Visual;
        visual.setPosition(rigidBody.dimensions.origin.x, rigidBody.dimensions.origin.y, rigidBody.dimensions.origin.z);
      }

      entity.components.RigidBody.move = new Vector(0, 0);
    }
  };

  module.exports = Mover;
}());
