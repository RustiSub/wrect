(function() {
  "use strict";

  wrect.Core = wrect.Core || {};

  wrect.Core.Rendering.SceneManager.prototype.createScene = function() {
    this.objects = {};

    this.scene = new PIXI.Container();
  };

  /**
   * @param {Object} entityData
   */
  wrect.Core.Rendering.SceneManager.prototype.add = function(entityData) {
    if (entityData.entity.components.Visual) {
      var graphics = entityData.entity.components.Visual.getGraphics();
      this.objects[graphics.id] = entityData.entity;
      this.scene.addChild(graphics);
    }
  };

  /**
   * @param {Object} entityData
   */
  wrect.Core.Rendering.SceneManager.prototype.remove = function(entityData) {
    if (entityData.entity.components.Visual) {
      this.scene.remove(entityData.entity.components.Visual.getGraphics());
    }
  };

  wrect.Core.Rendering.SceneManager.prototype.getEntityByGraphicsId = function(id) {
    if (this.objects[id]) {
      return this.objects[id];
    }
  };
}());
