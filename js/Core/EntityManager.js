(function() {
  "use strict";

  /**
   * @class EntityManager
   * @constructor
   */
  var EntityManager = function(options) {
    this._entities = [];
    this._entitiesByName = {};
    this.eventManager = options.eventManager;
  };

  /**
   * @param {Entity} entity
   */
  EntityManager.prototype.addEntity = function(entity){
    this._entities.push(entity);
    this._entitiesByName[entity.getId()] = entity;
    this.eventManager.trigger('entity_manager.add', {entity: entity});
  };

  /**
   * @param {Entity} entity
   */
  EntityManager.prototype.removeEntity = function(entity){
    var index;
    console.log(this._entities, entity);
    if ((index = this._entities.indexOf(entity)) != -1) {
      this._entities.splice(index, 1);
      delete this._entitiesByName[entity.name];

      this.eventManager.trigger('entity_manager.remove', {entity: entity});
    }
  };

  /**
   * @param {string} name
   */
  EntityManager.prototype.removeEntityByName = function(name) {
    var entity = this._entitiesByName[name];
    if (entity) {
      this.removeEntity(entity);
    }
  };

  /**
   * Returns all entities
   * @returns {*}
   */
  EntityManager.prototype.getAllEntities = function(){
    return this._entities;
  };

  /**
   * Returns all entities indexed by name
   * @returns {*}
   */
  EntityManager.prototype.getAllEntitiesByName = function() {
      return this._entitiesByName;
  };

  /**
   * Get a single entity by name
   * @param name
   * @returns {*}
   */
  EntityManager.prototype.getEntityByName = function(name){
    return this._entitiesByName[name];
  };

  /**
   * Get all entities where partOfName is a part of their name
   * THIS. IS. SLOW.
   * @param partOfName
   * @returns {Array}
   */
  EntityManager.prototype.getEntitiesByName = function(partOfName){
    var found = [];
    for (var i = 0; i < this._entities.length; i++) {
      if (this._entities[i].name.indexOf(partOfName) != -1) {
        found.push(this._entities[i]);
      }
    }

    return found;
  };

  EntityManager.prototype.clearEntities = function(clearStage) {
    this._entities = [];
    this._entitiesByName = {};
  };

  /**
   * Update all entities, called in Game.run();
   */
  EntityManager.prototype.update = function() {
    for (var i = 0; i < this._entities.length; i++) {
      this._entities[i].update();
    }
  };

  EntityManager.prototype.deselectAll = function() {
    for (var i = 0; i < this._entities.length; i++) {
      this._entities[i].deselect();
    }
  };

  /**
   * Update all entities, called in Game.run();
   */
  EntityManager.prototype.update = function() {
    for (var i = 0; i < this._entities.length; i++) {
      this._entities[i].update();
    }
  };

  EntityManager.prototype.deselectAll = function() {
    for (var i = 0; i < this._entities.length; i++) {
      this._entities[i].deselect();
    }
  };

  module.exports = EntityManager;
})();
