(function () {
  "use strict";

  wrect.ECS = wrect.ECS || {};
  wrect.ECS.System = wrect.ECS.System || {};

  wrect.ECS.System.QuadTree = function (options) {
    wrect.ECS.System.BaseSystem.call(this);

    this.options = options || {};
  };

  wrect.ECS.System.QuadTree.prototype = Object.create(wrect.ECS.System.BaseSystem.prototype);
  wrect.ECS.System.QuadTree.prototype.constructor = wrect.ECS.System.QuadTree;

  wrect.ECS.System.QuadTree.prototype.name = 'QuadTree';

  wrect.ECS.System.QuadTree.prototype.checkDependencies = function (entity) {
    return entity.components.RigidBody && entity.components.Collision;
  };

  wrect.ECS.System.QuadTree.prototype.perform = function (entity) {

  }
}());
