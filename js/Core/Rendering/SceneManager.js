(function() {
  "use strict";

  var SceneManager = function (options) {
    this.options = options || {};

    this.eventManager = options.eventManager;

    this.eventManager.addListener('entity_manager.add', this.add, this);
    this.eventManager.addListener('entity_manager.remove', this.remove, this);

    this.createScene();
  };

  /**
   * @returns {SceneManager.scene|*}
   */
  SceneManager.prototype.getScene = function() {
    return this.scene;
  };

  SceneManager.prototype.createScene = function() {};

  /**
   * @param {wrect.ECS.Entity} entity
   */
  SceneManager.prototype.add = function(entity) {};

  module.exports = SceneManager;
}());
