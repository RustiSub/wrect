(function() {
  "use strict";

  var Renderer;
  var SceneManager;
  var Bundles;

  /**
   * @constructor
   */
  var Game = function(options) {
    Renderer = options.renderer || require('./Core/Rendering/Renderer');
    SceneManager = options.sceneManager || require('./Core/Rendering/SceneManager');
    Bundles = options.bundles || [];
  };

  Game.prototype.bootstrap = function() {

    this.completeTree = [];
    this.treeHashes = [];

    var EventManager = require('Core/EventManager');
    this.eventManager = new EventManager();

    var EntityManager = require('./../js/Core/EntityManager');
    this.entityManager = new EntityManager({eventManager: this.eventManager});

    var GameTime = require('./../js/Core/GameTime');
    this.gameTime = new GameTime({
      eventManager: this.eventManager
    });

    this.sceneManager = new SceneManager({eventManager: this.eventManager});

    var Camera = require('./../js/Core/Rendering/Camera');
    this.camera = new Camera();

    this.renderer = new Renderer({
      sceneManager: this.sceneManager,
      camera: this.camera
    });

    var TileMapManager = require('./TileMap/TileMapManager');
    this.tileMapManager = new TileMapManager(this);

    var RawInputHandler = require('./ECS/System/Input/RawInputHandler');
    var InputHandler = require('./ECS/System/Input/InputHandler');
    var ControlMapHandler = require('./ECS/System/Input/ControlMapHandler');
    var Linker = require('./ECS/System/Linker');
    var Animator = require('./ECS/System/Animator');
    var PhysicsEngine = require('./ECS/Assemblage/PhysicsEngine.js');
    var Mover = require('./ECS/System/Mover.js');

    this.systems = {
      pre: {
        RawInputHandler: {
          system: new RawInputHandler(
            {
              game: this,
              elementId: 'body',
              eventManager: this.eventManager
            }
          )
        },
        InputHandler: {
          system: new InputHandler(
            {
              game: this,
              eventManager: this.eventManager
            }
          )
        },
        ControlMapHandler: {
          system: new ControlMapHandler(
            {
              game: this
            }
          )
        },
        Linker: {
          system: new Linker({game: this})
        },
        Animator: {
          system: new Animator({game: this})
        }
      },
      main: {
        Physics: {
          system: new PhysicsEngine({game: this})
        }
      },
      post: {
        Mover: {
          system: new Mover({game: this})
        }
        //,
        //Transformer: {
        //  system: new Transformer()
        //}
      }
    };

    this.loadBundles();
  };

  Game.prototype.loadBundles = function() {
     for (var bundleIndex = 0; bundleIndex < Bundles.length; bundleIndex++) {
      var bundle = new Bundles[bundleIndex]({game: this});
      bundle.init();
     }
  };

  Game.prototype.run = function() {
    var self = this;
    //var clock = new THREE.Clock();

    requestAnimationFrame(run);

    function run(timestamp) {
      if (self.pause) {return;}
      requestAnimationFrame(run);

      self.gameTime.updateTime(timestamp);

      self.getEventManager().trigger('game.updateStart');

      runSystemGroup(self.systems.pre);
      runSystemGroup(self.systems.main);
      runSystemGroup(self.systems.post);

      self.getEventManager().trigger('game.updateEnd');

      self.getRenderer().render();
    }

    function runSystemGroup(systems) {
      for (var systemIndex in  systems) if (systems.hasOwnProperty(systemIndex)) {
        var preSystem = systems[systemIndex].system;

        preSystem.run();
      }
    }
  };

  /**
   * @returns {wrect.Core.Rendering.Camera|*}
   */
  Game.prototype.getCameraManager = function() {
    return this.camera;
  };

  /**
   *
   * @returns {wrect.Core.EventManager|*}
   */
  Game.prototype.getEventManager = function() {
    return this.eventManager;
  };

  /**
   * @returns {wrect.Core.EntityManager|*}
   */
  Game.prototype.getEntityManager = function() {
    return this.entityManager;
  };

  /**
   * @returns {wrect.Core.Renderer|*}
   */
  Game.prototype.getRenderer = function() {
    return this.renderer;
  };

  /**
   * @returns {wrect.Core.SceneManager|*}
   */
  Game.prototype.getSceneManager = function() {
    return this.sceneManager;
  };

  /**
   * @returns {wrect.Core.GameTime|*}
   */
  Game.prototype.getGameTime = function() {
    return this.gameTime;
  };

  /**
   * @returns {Game}
   */
  Game.prototype.getGame = function() {
    return this;
  };

  module.exports = Game;
}());
