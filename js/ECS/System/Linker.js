(function() {
  "use strict";

  wrect.ECS = wrect.ECS || {};
  wrect.ECS.System = wrect.ECS.System || {};

  var Vector = wrect.Physics.Vector;

  wrect.ECS.System.Linker = function (options) {
    wrect.ECS.System.BaseSystem.call(this);

    this.options = options || {};

  };

  wrect.ECS.System.Linker.prototype = Object.create( wrect.ECS.System.BaseSystem.prototype );
  wrect.ECS.System.Linker.prototype.constructor = wrect.ECS.System.Linker;

  wrect.ECS.System.Linker.prototype.name = 'Linker';

  wrect.ECS.System.Linker.prototype.checkDependencies = function(entity) {
    return entity.components.Link ? true : false;
  };

  wrect.ECS.System.Linker.prototype.perform = function(entity) {
    var linkedEntity = entity.components.Link.linkedEntity;

    console.log('before');
    console.log(entity.components.RigidBody.physicsBody);
    console.log(linkedEntity.components.RigidBody.physicsBody);
    linkedEntity.components.RigidBody.physicsBody.f = entity.components.RigidBody.physicsBody.f;
    linkedEntity.components.RigidBody.physicsBody.a = entity.components.RigidBody.physicsBody.a;
    linkedEntity.components.RigidBody.physicsBody.v = entity.components.RigidBody.physicsBody.v;
    console.log('after');
    console.log(linkedEntity.components.RigidBody.physicsBody);
  };
}());
