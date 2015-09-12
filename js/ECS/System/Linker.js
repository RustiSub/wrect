(function() {
  "use strict";

  var BaseSystem = require('./BaseSystem');
  var Linker = function (options) {
    BaseSystem.call(this, options);

    this.options = options || {};

    //game.getEventManager().addListener('physics.move', this.link, this);
  };

  Linker.prototype = Object.create( BaseSystem.prototype );
  Linker.prototype.constructor = Linker;

  Linker.prototype.name = 'Linker';

  Linker.prototype.checkDependencies = function(entity) {
    return entity.components.Link ? true : false;
  };

  Linker.prototype.link = function(data) {
    var entity = data.entity;
    if (this.checkDependencies(entity)) {
    }
  };

  Linker.prototype.perform = function(entity) {
    var linkedEntity = entity.components.Link.linkedEntity;

    //linkedEntity.components.RigidBody.dimensions.move(new Vector(1, 0));

    linkedEntity.components.RigidBody.dimensions.origin = entity.components.RigidBody.dimensions.origin;
    linkedEntity.components.RigidBody.dimensions.origin = linkedEntity.components.RigidBody.dimensions.origin.add(entity.components.Link.joint);
  };

  module.exports = Linker;
}());
