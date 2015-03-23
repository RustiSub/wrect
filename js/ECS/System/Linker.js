(function() {
  "use strict";

  wrect.ECS = wrect.ECS || {};
  wrect.ECS.System = wrect.ECS.System || {};

  var Vector = wrect.Physics.Vector;

  wrect.ECS.System.Linker = function (options) {
    wrect.ECS.System.BaseSystem.call(this);

    this.options = options || {};

    //game.getEventManager().addListener('physics.move', this.link, this);
  };

  wrect.ECS.System.Linker.prototype = Object.create( wrect.ECS.System.BaseSystem.prototype );
  wrect.ECS.System.Linker.prototype.constructor = wrect.ECS.System.Linker;

  wrect.ECS.System.Linker.prototype.name = 'Linker';

  wrect.ECS.System.Linker.prototype.checkDependencies = function(entity) {
    return entity.components.Link ? true : false;
  };

  wrect.ECS.System.Linker.prototype.link = function(data) {
    var entity = data.entity;
    var move = data.move;
    if (this.checkDependencies(entity)) {
      var linkedEntity = entity.components.Link.linkedEntity;

      //linkedEntity.components.RigidBody.dimensions.move(move);
      //linkedEntity.components.RigidBody.physicsBody.v = entity.components.RigidBody.physicsBody.v;
      //linkedEntity.components.RigidBody.physicsBody.f = entity.components.RigidBody.physicsBody.f;
      //linkedEntity.components.RigidBody.physicsBody.a = entity.components.RigidBody.physicsBody.a;
    }
  };

  wrect.ECS.System.Linker.prototype.perform = function(entity) {
    var linkedEntity = entity.components.Link.linkedEntity;

    //linkedEntity.components.RigidBody.dimensions.move(new Vector(1, 0));

    linkedEntity.components.RigidBody.dimensions.origin = entity.components.RigidBody.dimensions.origin;
    linkedEntity.components.RigidBody.dimensions.origin = linkedEntity.components.RigidBody.dimensions.origin.add(entity.components.Link.joint);
  };
}());
