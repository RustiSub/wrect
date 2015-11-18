(function() {
  "use strict";

  var SceneManager = require('Core/Rendering/SceneManager');

  SceneManager.prototype.createScene = function() {
    this.scene = new THREE.Scene();

    this.objects = {};
    //var light = new THREE.PointLight( 0xff0000, 1, 100 );
    //light.position.set( 50, 50, 50 );
    //this.scene.add( light );

    //var ambientLight = new THREE.AmbientLight(0xffff00);
    //this.scene.add(ambientLight);

    // directional lighting
    //var directionalLight = new THREE.DirectionalLight(0xffffff);
    //directionalLight.position.set(0, 10, 0).normalize();
    //directionalLight.lookAt(0, 0, 0);
    //this.scene.add(directionalLight);
  };

  /**
   * @param {Object} entityData
   */
  SceneManager.prototype.add = function(entityData) {
    if (entityData.entity.components.Visual) {
      var graphics = entityData.entity.components.Visual.getGraphics();
      this.objects[graphics.id] = entityData.entity;
      this.scene.add(graphics);
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
