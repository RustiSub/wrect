(function() {
  "use strict";

  wrect.ECS = wrect.ECS || {};
  wrect.ECS.System = wrect.ECS.System || {};

  var Vector = wrect.Physics.Vector;

  wrect.ECS.System.Group = function (options) {
    wrect.ECS.System.BaseSystem.call(this);

    this.options = options || {};

  };

  wrect.ECS.System.Group.prototype = Object.create( wrect.ECS.System.BaseSystem.prototype );
  wrect.ECS.System.Group.prototype.constructor = wrect.ECS.System.Group;

  wrect.ECS.System.Group.prototype.name = 'Group';

  wrect.ECS.System.BaseSystem.prototype.checkDependencies = function(entity) {
    return entity.components.RigidBody ? entity.components.Join : false;
  };

  wrect.ECS.System.Group.prototype.perform = function(entity) {

  };
}());
