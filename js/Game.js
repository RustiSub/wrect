(function() {
  "use strict";

  /**
   * @constructor
   */
  wrect.Game = function() {
  };

  wrect.Game.prototype.bootstrap = function() {

    this.completeTree = [];
    this.treeHashes = [];

    this.eventManager = new wrect.Core.EventManager();
    this.entityManager = new wrect.Core.EntityManager({eventManager: this.eventManager});
    this.gameTime = new wrect.Core.GameTime();
    this.sceneManager = new wrect.Core.Rendering.SceneManager({eventManager: this.eventManager});
    this.camera = new wrect.Core.Rendering.Camera();
    this.renderer = new wrect.Core.Rendering.Renderer({
      sceneManager: this.sceneManager,
      camera: this.camera
    });

    this.systems = {
      pre: {
        Linker: {
          system: new wrect.ECS.System.Linker({game: this})
        },
        Input: {
          system: new wrect.ECS.System.Input({game: this, inputHandler: new wrect.Core.InputHandler()})
        },
        BaseControl: {
          system: new wrect.ECS.System.Control.BaseControl({game: this})
        },
        Attack: {
          system: new wrect.ECS.System.Control.Attack({game: this})
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
  };

  wrect.Game.prototype.run = function() {
    var self = this;
    var clock = new THREE.Clock();

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

      THREE.AnimationHandler.update( clock.getDelta() / 2);
      //self.camera.getCamera().rotation.y += 0.01;
    }

    function runSystemGroup(systems) {
      for (var systemIndex in  systems) if (systems.hasOwnProperty(systemIndex)) {
        var preSystem = systems[systemIndex].system;

        preSystem.run();
      }
    }
  };

  /**
   *
   * @returns {wrect.Core.EventManager|*}
   */
  wrect.Game.prototype.getEventManager = function() {
    return this.eventManager;
  };

  /**
   * @returns {wrect.Core.EntityManager|*}
   */
  wrect.Game.prototype.getEntityManager = function() {
    return this.entityManager;
  };

  /**
   * @returns {wrect.Core.Renderer|*}
   */
  wrect.Game.prototype.getRenderer = function() {
    return this.renderer;
  };

  /**
   * @returns {wrect.Core.SceneManager|*}
   */
  wrect.Game.prototype.getSceneManager = function() {
    return this.sceneManager;
  };

  /**
   * @returns {wrect.Core.GameTime|*}
   */
  wrect.Game.prototype.getGameTime = function() {
    return this.gameTime;
  };

  /**
   * @returns {wrect.Game}
   */
  wrect.Game.prototype.getGame = function() {
    return this;
  }
}());
