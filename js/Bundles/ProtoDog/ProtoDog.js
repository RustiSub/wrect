var dirLight;
(function() {
  "use strict";

  var Vector = require('../../Physics/Vector');

  /**
   * @constructor
   */
  var ProtoDog = function (options) {
    this.game = options.game;
    console.log('ProtoDog loaded...');
  };

  ProtoDog.prototype.init = function() {
    console.log('ProtoDog setup...');

    this.registerSystems();
    this.setupCamera();
    // this.setupScene();
    // this.buildWorld();

    // this.setupMechanics();
    //this.setupControls();
    //this.setupGrid();
    //this.setupPlayer();

    this.game.getRenderer().render();
  };

  ProtoDog.prototype.setupMechanics = function() {
  };

  ProtoDog.prototype.setupControls = function() {

  };

  ProtoDog.prototype.buildWorld = function() {
    var Block = require('../../ECS/Assemblage/Block');
    var game = this.game;
    
    function createBlock(options) {
      var block = new Block({
        position: options.position,
        dimension: options.dimension,
        material: options.material,
        renderer: game.getRenderer(),
        eventManager: game.getEventManager()
      });
      game.getEntityManager().addEntity(block.entity);

      return block.entity;
    }

    createBlock({
      position: new Vector(0, 0),
      dimension: new Vector(100, 100),
      material: {
        color: 0xFF0000
      }
    });

    createBlock({
      position: new Vector(500, 0),
      dimension: new Vector(100, 100),
      material: {
        color: 0x0000FF
      }
    });
  };

  ProtoDog.prototype.setupCamera = function() {
    var Camera = require('Core/Rendering/Camera');
    this.game.camera.setCamera(new Camera());
  };

  ProtoDog.prototype.setupScene = function() {
  };

  ProtoDog.prototype.registerSystems = function() {
  };

  ProtoDog.prototype.setupPlayer = function() {
  };
  
  module.exports = ProtoDog;
}());
