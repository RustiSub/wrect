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

    //this.setupMechanics();
    //this.setupControls();
    //this.setupGrid();
    //this.setupPlayer();

    this.game.getRenderer().render();
  };

  wrect.Bundles.ProtoDog.prototype.setupGrid = function() {
    var map = new wrect.ECS.Assemblage.HexMap({
      //mapSize: new Vector3(27, 27, 27),
      mapSize: new Vector3(9, 9, 9  ),
      tileSize: 50
    });
    this.buildTerrain(map.entity.components.Grid);

    game.getEntityManager().addEntity(map.entity);
  };

  wrect.Bundles.ProtoDog.prototype.setupMechanics = function() {
    var titanEngine = new wrect.ECS.Assemblage.TitanEngine(
      {
        eventManager: game.getEventManager()
      }
    );

    game.getEntityManager().addEntity(titanEngine.entity);
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
        color: 0x0000FF,
        alpha: 0.5
      }
    });
  };

  wrect.Bundles.ProtoDog.prototype.buildTerrain = function(grid) {

    function createTerrain(coord) {
     return new wrect.ECS.Assemblage.Map.Terrain({
        grid: grid,
        coord: coord,
        position: new Vector3(0, 0, 10),
        dimension: new Vector3(20, 20, 20),
        material:  new THREE.MeshLambertMaterial({color: 0xFFFFFF }),
        renderer: game.getRenderer(),
        eventManager: game.getEventManager()
      });
    }

    game.getEntityManager().addEntity(createTerrain(new Vector3(2, -2, 0)).entity);
    game.getEntityManager().addEntity(createTerrain(new Vector3(-2, 2, 0)).entity);
    game.getEntityManager().addEntity(createTerrain(new Vector3(3, -3, 0)).entity);
    game.getEntityManager().addEntity(createTerrain(new Vector3(4, -3, 0)).entity);
    game.getEntityManager().addEntity(createTerrain(new Vector3(3, -2, 0)).entity);
  };

  wrect.Bundles.ProtoDog.prototype.setupCamera = function() {

  };

  wrect.Bundles.ProtoDog.prototype.setupScene = function() {
  };

  wrect.Bundles.ProtoDog.prototype.registerSystems = function() {

  };

  wrect.Bundles.ProtoDog.prototype.setupPlayer = function() {
    var player = new wrect.ECS.Assemblage.Player.Titan({
      position: new Vector3(0, 0, 25),
      dimension: new Vector3(15, 30, 50),
      material:  new THREE.MeshLambertMaterial({color: 0xFFFFFF }),
      renderer: game.getRenderer(),
      eventManager: game.getEventManager()
    });

    game.getEntityManager().addEntity(player.entity);
  };
}());
