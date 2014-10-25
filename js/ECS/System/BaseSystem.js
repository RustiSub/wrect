(function() {
  "use strict";

  wrect.ECS = wrect.ECS || {};
  wrect.ECS.System = wrect.ECS.System || {};

  wrect.ECS.System.BaseSystem = function () {

  };

  /**
   *
   * @param {wrect.ECS.Entity[]} entities
   */
  wrect.ECS.System.BaseSystem.prototype.run = function(entities) {
    for (var e = 0; e < entities.length; e++) {
      this.perform(entities[e]);
    }
  };

  /**
   * @param {wrect.ECS.Entity} entity
   */
  wrect.ECS.System.BaseSystem.prototype.perform = function(entity) {
    alert('Implemented wrect.ECS.System needs to do something with an entity ... right?')
  }
}());
