(function() {
  "use strict";

  wrect.Core = wrect.Core || {};

  wrect.Core.Rendering.SceneManager.prototype.createScene = function() {
    this.scene = new THREE.Scene();
    //var light = new THREE.AmbientLight( 0x404040 ); // soft white light
    //this.scene.add( light );
    //
    //// white spotlight shining from the side, casting shadow
    //
    //var spotLight = new THREE.SpotLight( 0xffffff );
    //spotLight.position.set( 100, 1000, 100 );
    //
    //spotLight.castShadow = true;
    //
    //spotLight.shadowMapWidth = 1024;
    //spotLight.shadowMapHeight = 1024;
    //
    //spotLight.shadowCameraNear = 500;
    //spotLight.shadowCameraFar = 4000;
    //spotLight.shadowCameraFov = 30;
    //
    //this.scene.add( spotLight );
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
