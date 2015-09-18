(function() {
  "use strict";

  var SceneManager = require('Core/Rendering/SceneManager');
  var PIXI = require('lib/pixi');

  SceneManager.prototype.createScene = function() {
    this.objects = {};

    this.scene = new PIXI.Container();
  };

  /**
   * @param {Object} entityData
   */
  SceneManager.prototype.add = function(entityData) {
    if (entityData.entity.components.Visual) {
      var graphics = entityData.entity.components.Visual.getGraphics();
      this.objects[graphics.id] = entityData.entity;
      this.scene.addChild(graphics);
    }
  };

  /**
   * @param {Object} entityData
   */
  SceneManager.prototype.remove = function(entityData) {
    if (entityData.entity.components.Visual) {
      this.scene.remove(entityData.entity.components.Visual.getGraphics());
    }
  };

  SceneManager.prototype.getEntityByGraphicsId = function(id) {
    if (this.objects[id]) {
      return this.objects[id];
    }
  };

  module.exports = SceneManager;
}());
