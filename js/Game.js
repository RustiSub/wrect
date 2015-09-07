(function() {
  "use strict";

  /**
   * @constructor
   */
  var Game = function() {
  };

  Game.prototype.bootstrap = function() {

    this.completeTree = [];
    this.treeHashes = [];

    var EventManager = require('./../js/Core/EventManager');
    this.eventManager = new EventManager();
    console.log(this.eventManager);

    var EntityManager = require('./../js/Core/EntityManager');
    this.entityManager = new EntityManager({eventManager: this.eventManager});

    var GameTime = require('./../js/Core/GameTime');
    this.gameTime = new GameTime({
      eventManager: this.eventManager
    });

    var SceneManager = require('./../js/Core/Rendering/SceneManager');
    this.sceneManager = new SceneManager({eventManager: this.eventManager});

    var Camera = require('./../js/Core/Rendering/Camera');
    this.camera = new Camera();

    var Renderer = require('./../js/Core/Rendering/Renderer');
    this.renderer = new Renderer({
      sceneManager: this.sceneManager,
      camera: this.camera
    });

    this.tileMapManager = new wrect.TileMap.TileMapManager(this);

    this.systems = {
      pre: {
        RawInputHandler: {
          system: new wrect.ECS.System.RawInputHandler(
            {
              game: this,
              elementId: 'body',
              eventManager: this.eventManager
            }
          )
        },
        InputHandler: {
          system: new wrect.ECS.System.InputHandler(
            {
              game: this,
              eventManager: this.eventManager
            }
          )
        },
        ControlMapHandler: {
          system: new wrect.ECS.System.ControlMapHandler(
            {
              game: this
            }
          )
        },
        Linker: {
          system: new wrect.ECS.System.Linker({game: this})
        },
        Animator: {
          system: new wrect.ECS.System.Animator({game: this})
        }
      },
      main: {
        Physics: {
          system: new wrect.ECS.Assemblage.PhysicsEngine({game: this})
        }
      },
      post: {
        Mover: {
          system: new wrect.ECS.System.Mover({game: this})
        }
        //,
        //Transformer: {
        //  system: new wrect.ECS.System.Transformer()
        //}
      }
    };

    this.loadBundles();
  };

  Game.prototype.loadBundles = function() {
    for (var bundleIndex in wrect.Bundles) if (wrect.Bundles.hasOwnProperty(bundleIndex)) {
      var bundle = new wrect.Bundles[bundleIndex]({game: this});
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
