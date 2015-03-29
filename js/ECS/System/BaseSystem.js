(function() {
  "use strict";

  wrect.ECS = wrect.ECS || {};
  wrect.ECS.System = wrect.ECS.System || {};

  /**
   * @param {Object} options
   * @constructor
   */
  wrect.ECS.System.BaseSystem = function (options) {
    /**
     * @type {wrect.ECS.Entity[]}
     */
    this.entities = [];
    var game = options.game;
    game.getEventManager().addListener('entity.component.add', this.addEntity, this);
    game.getEventManager().addListener('entity.component.remove', this.removeEntity, this);
  };

  wrect.ECS.System.BaseSystem.prototype.removeEntity = function(data) {
    //this.entities.push(entity);
  };

  wrect.ECS.System.BaseSystem.prototype.addEntity = function(data) {
    if (this.checkDependencies(data.entity) && this.entities.indexOf(data.entity) === -1) {
      this.entities.push(data.entity);
    }
  };

  wrect.ECS.System.BaseSystem.prototype.checkDependencies = function(entity) {
    return entity;
  };

  wrect.ECS.System.BaseSystem.prototype.run = function() {
    for (var e = 0; e < this.entities.length; e++) {
      this.perform(this.entities[e]);
    }
  };

  /**
   * @param {wrect.ECS.Entity} entity
   */
  wrect.ECS.System.BaseSystem.prototype.perform = function(entity) {
    alert('Implemented wrect.ECS.System needs to do something with an entity ... right?');
  }
}());
