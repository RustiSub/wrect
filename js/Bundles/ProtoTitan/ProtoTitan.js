(function() {
  "use strict";

  wrect.Bundles = wrect.Bundles || {};

  var Vector3 = wrect.Physics.Vector3;

  /**
   * @constructor
   */
  wrect.Bundles.ProtoTitan = function (options) {
    this.game = options.game;
    console.log('ProtoTitan loaded...');
  };

  wrect.Bundles.ProtoTitan.prototype.init = function() {
    console.log('ProtoTitan setup...');

    this.setupCamera();
    this.setupScene();
    this.buildWorld();
    this.registerSystems();

    //this.setupMechanics();
    this.setupControls();

    this.setupGrid();

    this.game.getRenderer().render();
  };

  wrect.Bundles.ProtoTitan.prototype.setupGrid = function() {
    var map = new wrect.ECS.Assemblage.HexMap({
      mapSize: new Vector3(3, 3, 3),
      tileSize: 50
    });
  };

  wrect.Bundles.ProtoTitan.prototype.setupMechanics = function() {
    var titanEngine = new wrect.ECS.Assemblage.TitanEngine(
      {
        eventManager: game.getEventManager()
      }
    );

    game.getEntityManager().addEntity(titanEngine.entity);
  };

  wrect.Bundles.ProtoTitan.prototype.setupControls = function() {
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

  wrect.Bundles.ProtoTitan.prototype.buildWorld = function() {
    function createBlock(options) {
      var block = new wrect.ECS.Assemblage.Block({
        position: options.position,
        dimension: options.dimension,
        color: 0x000000,
        alpha: 1,
        material: options.material,
        renderer: game.getRenderer(),
        eventManager: game.getEventManager(),
        frozen: options.frozen
      });
      game.getEntityManager().addEntity(block.entity);

      return block.entity;
    }

    createBlock({
      position: new Vector3(-250, -250, 0),
      dimension: new Vector3(500, 500, 5),
      frozen: 1,
      material: new THREE.MeshLambertMaterial({color: 0xC38A09 })
    });

    createBlock({
      position: new Vector3(0, 0, 25),
      dimension: new Vector3(15, 30, 50),
      material: new THREE.MeshLambertMaterial({color: 0xFFFFFF })
    });

    createBlock({
      position: new Vector3(50, 50, 50),
      dimension: new Vector3(15, 15, 100),
      frozen: 1,
      material: new THREE.MeshLambertMaterial({color: 0xD0D0D0 })
    });

    createBlock({
      position: new Vector3(-50, 50, 50),
      dimension: new Vector3(15, 15, 100),
      frozen: 1,
      material: new THREE.MeshLambertMaterial({color: 0xD0D0D0 })
    });

    createBlock({
      position: new Vector3(50, -50, 50),
      dimension: new Vector3(15, 15, 100),
      frozen: 1,
      material: new THREE.MeshLambertMaterial({color: 0xD0D0D0 })
    });

    createBlock({
      position: new Vector3(-50, -50, 50),
      dimension: new Vector3(15, 15, 100),
      frozen: 1,
      material: new THREE.MeshLambertMaterial({color: 0xD0D0D0 })
    });
  };

  wrect.Bundles.ProtoTitan.prototype.setupCamera = function() {
    this.game.camera.setCamera(new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 ));
    var camera = this.game.camera.getCamera();
    camera.up = new THREE.Vector3( 0, 0, 1 );
    camera.position.z = 250;
    camera.position.x += -100;
    camera.position.y += -300;

    camera.lookAt(new THREE.Vector3(0, 0, 0));
  };

  wrect.Bundles.ProtoTitan.prototype.setupScene = function() {
    var renderer = this.game.getRenderer();
    renderer.shadowMapEnabled = true;
    renderer.shadowMapSoft = false;

    renderer.shadowCameraNear = 3;
    renderer.shadowCameraFar = this.game.camera.getCamera().far;
    renderer.shadowCameraFov = 50;

    renderer.shadowMapBias = 0.0039;
    renderer.shadowMapDarkness = 0.5;
    renderer.shadowMapWidth = 1024;
    renderer.shadowMapHeight = 1024;

    var scene = this.game.getSceneManager().getScene();

    var dirLight = new THREE.DirectionalLight( 0xffffff, 1 );
    dirLight.color.setHSL(0.1, 1, 0.95);
    dirLight.position.set(-1, 1, 1);
    dirLight.target.position.set(0, 0, 0);
    dirLight.position.multiplyScalar(300);
    scene.add( dirLight );

    dirLight.castShadow = true;

    dirLight.shadowMapWidth = 2048;
    dirLight.shadowMapHeight = 2048;

    var d = 250;

    dirLight.shadowCameraLeft = -d;
    dirLight.shadowCameraRight = d;
    dirLight.shadowCameraTop = d;
    dirLight.shadowCameraBottom = -d;
    //
    dirLight.shadowCameraFar = 3500;
    dirLight.shadowBias = -0.0001;
    dirLight.shadowDarkness = 0.35;
  };

  wrect.Bundles.ProtoTitan.prototype.registerSystems = function() {
    this.game.systems.pre.TitanEngine = {
      system: new wrect.ECS.System.TitanEngine.CycleHandler(
          {
            game: this.game,
            eventManager: this.game.getEventManager()
          }
      )
    };

    this.game.systems.pre.TileSelector = {
      system: new wrect.ECS.System.Map.TileSelector(
        {
          game: this.game,
          eventManager: this.game.getEventManager()
        }
      )
    };
  };
}());
