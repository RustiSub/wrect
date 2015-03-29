(function() {
  "use strict";

  wrect.Core = wrect.Core || {};
  wrect.Core.Rendering = wrect.Core.Rendering || {};

  wrect.Core.Rendering.SceneManager = function (options) {
    this.options = options || {};

    this.eventManager = options.eventManager;

    this.eventManager.addListener('entity_manager.add', this.add, this);
    this.eventManager.addListener('entity_manager.remove', this.remove, this);

    this.createScene();
  };

  /**
   * @returns {wrect.Core.Rendering.SceneManager.scene|*}
   */
  wrect.Core.Rendering.SceneManager.prototype.getScene = function() {
    return this.scene;
  };

  wrect.Core.Rendering.SceneManager.prototype.createScene = function() {};

  /**
   * @param {wrect.ECS.Entity} entity
   */
  wrect.Core.Rendering.SceneManager.prototype.add = function(entity) {};
}());
