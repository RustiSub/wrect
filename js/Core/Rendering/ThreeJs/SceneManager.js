(function() {
  "use strict";

  wrect.Core = wrect.Core || {};

  wrect.Core.Rendering.SceneManager.prototype.createScene = function() {
    this.scene = new THREE.Scene();
    //var light = new THREE.PointLight( 0xff0000, 1, 100 );
    //light.position.set( 50, 50, 50 );
    //this.scene.add( light );

    // add subtle blue ambient lighting
    var ambientLight = new THREE.AmbientLight(0xffffff);
    //this.scene.add(ambientLight);

    // directional lighting
    var directionalLight = new THREE.DirectionalLight(0xffffff);
    directionalLight.position.set(0, 10, 0).normalize();
    directionalLight.lookAt(0, 0, 0);
    this.scene.add(directionalLight);
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
