var dirLight;
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
    this.setupMechanics();
    this.setupControls();
    this.setupGrid();
    this.setupPlayer();

    this.game.getRenderer().render();

    //this.game.controls.target.x = 0;
    //this.game.controls.target.y = 0;
    //this.game.controls.target.z = 0;
  };

  wrect.Bundles.ProtoTitan.prototype.setupGrid = function() {
    var map = new wrect.ECS.Assemblage.HexMap({
      //mapSize: new Vector3(27, 27, 27),
      mapSize: new Vector3(9, 9, 9  ),
      tileSize: 50
    });

    game.getEntityManager().addEntity(map.entity);
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

      block.entity.components.Visual.graphics.receiveShadow = options.receiveShadow || false;
      block.entity.components.Visual.graphics.castShadow = options.castShadow || false;

      return block.entity;
    }

    createBlock({
      position: new Vector3(-5000, -5000, 0),
      dimension: new Vector3(10000, 10000, 5),
      frozen: 1,
      material: new THREE.MeshLambertMaterial({color: 0xC38A09 }),
      receiveShadow: true
    });

    createBlock({
      position: new Vector3(100, 100, 50),
      dimension: new Vector3(15, 15, 100),
      frozen: 1,
      material: new THREE.MeshLambertMaterial({color: 0xD0D0D0 }),
      castShadow: true,
      receiveShadow: true
    });

    createBlock({
      position: new Vector3(-100, 100, 50),
      dimension: new Vector3(15, 15, 100),
      frozen: 1,
      material: new THREE.MeshLambertMaterial({color: 0xD0D0D0 }),
      castShadow: true,
      receiveShadow: true
    });

    createBlock({
      position: new Vector3(100, -100, 50),
      dimension: new Vector3(15, 15, 100),
      frozen: 1,
      material: new THREE.MeshLambertMaterial({color: 0xD0D0D0 }),
      castShadow: true,
      receiveShadow: true
    });

    createBlock({
      position: new Vector3(-100, -100, 50),
      dimension: new Vector3(15, 15, 100),
      frozen: 1,
      material: new THREE.MeshLambertMaterial({color: 0xD0D0D0 }),
      castShadow: true,
      receiveShadow: true
    });
  };

  wrect.Bundles.ProtoTitan.prototype.setupCamera = function() {
    this.game.camera.setCamera(new THREE.PerspectiveCamera( 45, window.innerWidth/window.innerHeight, 0.1, 10000 ));
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

    var scene = this.game.getSceneManager().getScene();

    dirLight = new THREE.DirectionalLight( 0xffffff, 1 );
    dirLight.color.setHSL(0.1, 1, 0.95);
    dirLight.target.position.set(0, 0, 0);
    dirLight.position.x = 250;
    dirLight.position.y = 250;
    dirLight.position.z = 250;
    dirLight.castShadow = true;
    dirLight.shadowMapWidth = 2048;
    dirLight.shadowMapHeight = 2048;

    var d = 500;
    dirLight.intensity = 1;
    dirLight.shadowCameraNear = 0;
    dirLight.shadowCameraFar = 4096;

    dirLight.shadowCameraLeft = -d;
    dirLight.shadowCameraRight = d;
    dirLight.shadowCameraTop = d;
    dirLight.shadowCameraBottom = -d;
    //dirLight.shadowCameraVisible  = true;

    scene.add( dirLight );

    scene.fog = new THREE.Fog( 0xffffff, 1, 2500 );
    scene.fog.color.setHSL( 0.6, 0, 1 );

    var vertexShader = document.getElementById( 'vertexShader' ).textContent;
    var fragmentShader = document.getElementById( 'fragmentShader' ).textContent;
    var uniforms = {
      topColor: 	 { type: "c", value: new THREE.Color( 0x0077ff ) },
      bottomColor: { type: "c", value: new THREE.Color( 0xffffff ) },
      offset:		 { type: "f", value: 33 },
      exponent:	 { type: "f", value: 0.6 }
    };
    uniforms.topColor.value.copy( dirLight.color );

    scene.fog.color.copy( uniforms.bottomColor.value );

    var skyGeo = new THREE.SphereGeometry( 4000, 32, 15 );
    var skyMat = new THREE.ShaderMaterial( { vertexShader: vertexShader, fragmentShader: fragmentShader, uniforms: uniforms, side: THREE.BackSide } );

    var sky = new THREE.Mesh( skyGeo, skyMat );
    scene.add( sky );
  };

  wrect.Bundles.ProtoTitan.prototype.registerSystems = function() {
    this.game.systems.pre.TitanEngine = {
      system: new wrect.ECS.System.TitanEngine.CycleHandler(
          {
            game: this.game,
            gameTime: this.game.gameTime,
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

    this.game.systems.pre.ActionHandler = {
      system: new wrect.ECS.System.ActionHandler(
        {
          game: this.game,
          gameTime: this.game.getGameTime(),
          eventManager: this.game.getEventManager()
        }
      )
    };

    this.game.systems.post.GridMover = {
      system: new wrect.ECS.System.Map.GridMover(
          {
            game: this.game,
            gameTime: this.game.getGameTime(),
            eventManager: this.game.getEventManager()
          }
      )
    };
  };

  wrect.Bundles.ProtoTitan.prototype.setupPlayer = function() {
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
