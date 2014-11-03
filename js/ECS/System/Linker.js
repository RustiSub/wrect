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

    //if (linkedEntity.components.RigidBody.dimensions.origin.y != entity.components.RigidBody.dimensions.origin.y) {
    //  console.log(entity.components.RigidBody.dimensions.origin.y);
    //  console.log(linkedEntity.components.RigidBody.dimensions.origin.y);
    //  console.log('test');
    //}

    linkedEntity.components.RigidBody.move = entity.components.RigidBody.move;
  };
}());
