(function() {
  "use strict";

  wrect.Core = wrect.Core || {};

  wrect.Core.Rendering.SceneManager.prototype.createScene = function() {
    this.scene = new THREE.Scene();
  };

  /**
   * @param {Object} entityData
   */
  wrect.Core.Rendering.SceneManager.prototype.add = function(entityData) {
    this.scene.add(entityData.entity.components.Visual.getGraphics());
  };

  /**
   * @param {Object} entityData
   */
  wrect.Core.Rendering.SceneManager.prototype.remove = function(entityData) {
    this.scene.remove(entityData.entity.components.Visual.getGraphics());
  };
}());
