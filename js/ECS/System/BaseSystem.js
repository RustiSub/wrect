(function() {
  "use strict";

  /**
   * @param {Object} options
   * @constructor
   */
  var BaseSystem = function (options) {
    /**
     * @type {wrect.ECS.Entity[]}
     */
    this.entities = [];
    this.options = options;
    var game = options.game;
    game.getEventManager().addListener('entity.component.add', this.addEntity, this);
    game.getEventManager().addListener('entity.component.remove', this.removeEntity, this);
  };

  BaseSystem.prototype.removeEntity = function(data) {
    //this.entities.push(entity);
  };

  BaseSystem.prototype.addEntity = function(data) {
    if (this.checkDependencies(data.entity) && this.entities.indexOf(data.entity) === -1) {
      this.entities.push(data.entity);
    }
  };

  BaseSystem.prototype.checkDependencies = function(entity) {
    return entity;
  };

  BaseSystem.prototype.run = function() {
    for (var e = 0; e < this.entities.length; e++) {
      this.perform(this.entities[e]);
    }
  };

  /**
   * @param {wrect.ECS.Entity} entity
   */
  BaseSystem.prototype.perform = function(entity) {
    console.log('Implemented wrect.ECS.System needs to do something with an entity ... right?');
  };
  
  module.exports = BaseSystem;
}());
