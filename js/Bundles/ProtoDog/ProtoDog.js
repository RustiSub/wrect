var dirLight;
(function() {
  "use strict";

  wrect.Bundles = wrect.Bundles || {};

  var Vector = wrect.Physics.Vector;

  /**
   * @constructor
   */
  wrect.Bundles.ProtoDog = function (options) {
    this.game = options.game;
    console.log('ProtoDog loaded...');
  };

  wrect.Bundles.ProtoDog.prototype.init = function() {
    console.log('ProtoDog setup...');

    this.registerSystems();
    this.setupCamera();
    this.setupScene();
    this.buildWorld();

    this.setupMechanics();
    //this.setupControls();
    //this.setupGrid();
    //this.setupPlayer();

    this.game.getRenderer().render();
  };

  wrect.Bundles.ProtoDog.prototype.setupMechanics = function() {
  };

  wrect.Bundles.ProtoDog.prototype.setupControls = function() {
    var titanControl = new wrect.ECS.Assemblage.TitanControl(
        {
          camera: game.getCameraManager().camera,
          entityManager: game.getEntityManager(),
          eventManager: game.getEventManager(),
          sceneManager: game.getSceneManager(),
          renderer: game.getRenderer()
        }
    );

    game.getEntityManager().addEntity(titanControl.entity);
  };

  wrect.Bundles.ProtoDog.prototype.buildWorld = function() {
    function createBlock(options) {
      var block = new wrect.ECS.Assemblage.Block({
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

  wrect.Bundles.ProtoDog.prototype.setupCamera = function() {
  };

  wrect.Bundles.ProtoDog.prototype.setupScene = function() {
  };

  wrect.Bundles.ProtoDog.prototype.registerSystems = function() {
  };

  wrect.Bundles.ProtoDog.prototype.setupPlayer = function() {
  };
}());
