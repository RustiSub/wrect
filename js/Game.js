(function() {
  "use strict";

  /**
   * @constructor
   */
  wrect.Game = function() {
    this.entityManager = new wrect.Core.EntityManager();
    this.eventManager = new wrect.Core.EventManager();
  };

  wrect.Game.prototype.bootstrap = function() {
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
}());
//
//
//(function(global) {
//
//  var EventManager = wrect.Core.EventManager;
//
//  /**
//   * @Class Game
//   * @type {void|*}
//   */
//  wrect.Game = Class.extend ({
//    _stage: null,
//    _renderer: null,
//    _inputHandler: null,
//    _entityManager: null,
//    _levelManager: null,
//    _cameraContainer: null,
//    _camera: null,
//    _eventManager: null,
//    timeDelta: 0,
//    previousTimeDelta: null,
//    previousTime: 0,
//    debug: false,
//    fpsOutInterval: 10000,
//    completeTree: [],
//    treeHashes: [],
//    debugStats: {},
//    _defaults: {
//      inputHandlerClass: InputHandler,
//      entityManagerClass: EntityManager,
//      collisionManagerClass: CollisionManager,
//      guiManagerClass: window.GuiManager,
//      gravityManagerClass: GravityManager,
//      //builder: Builder,
//      levelManagerClass: LevelManager,
//      width: 1280,
//      height: 720
//    },
//    _options: {},
//    systems: {
//      pre: {
//        Linker: {
//          system: new wrect.ECS.System.Linker()
//        },
//        Input: {
//          system: new wrect.ECS.System.Input()
//        },
//        BaseControl: {
//          system: new wrect.ECS.System.Control.BaseControl()
//        },
//        Attack: {
//          system: new wrect.ECS.System.Control.Attack()
//        },
//        Animator: {
//          system: new wrect.ECS.System.Animator()
//        }
//      },
//      main: {
//        Physics: {
//          system: new wrect.ECS.Assemblage.PhysicsEngine()
//        }
//      },
//      post: {
//        Mover: {
//          system: new wrect.ECS.System.Mover()
//        }
//        //,
//        //Transformer: {
//        //  system: new wrect.ECS.System.Transformer()
//        //}
//      }
//    },
//    getStage: function() {
//      return this._stage;
//    },
//    getRenderer: function() {
//      return this._renderer;
//    },
//    getInputHandler: function() {
//      return this._inputHandler;
//    },
//    /**
//     * @deprecated - This is now a global object, so always accessible from window.Helpers.
//     * @returns {null}
//     */
//    getHelpers: function() {
//      return window.Helpers;
//    },
//    /**
//     * @returns {wrect.Core.EventManager}
//     */
//    getEntityManager: function() {
//      return this._entityManager;
//    },
//    getGuiManager: function() {
//      return this._guiManager;
//    },
//    getCamera: function() {
//      return this._camera;
//    },
//    getEventManager: function() {
//      return this._eventManager;
//    },
//    getDelta: function() {
//      return this.timeDelta;
//    },
//    getPreviousTime: function() {
//      return this.previousTime;
//    },
//    getCurrentLevel: function() {
//      return this._levelManager.getCurrentLevel();
//    },
//
//    /**
//     * @param options
//     * @param {Boolean} options.autoBoot Whether or not to automatically start up the game. This can be useful for overriding classes between the init and boot
//     */
//    init: function(options) {
//      this.createGlobalContainer.call(this);
//      this.buildOptions(options);
//      this.buildComponents();
//      if (this._options && typeof this._options.autoBoot !== 'undefined' && this._options.autoBoot) {
//        this.bootstrap(options);
//      }
//    },
//
//    /**
//     * Inits the _helpers and merges passed with default options.
//     * @param options
//     */
//    buildOptions: function(options) {
//      // We need our _helpers before we can merge.
//      var objHelpers = window.Helpers.object;
//      var defaults = objHelpers.copy(this._defaults);
//      this._options = objHelpers.merge(defaults, options);
//    },
//
//      /**
//     * Builds up the default components. See _defaults to overwrite default classes.
//     */
//    buildComponents: function() {
//      //this._stage = new THREE.Scene();
//      //this._camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
//      //
//      //this._renderer = new THREE.WebGLRenderer();
//      //this._renderer.setSize( window.innerWidth, window.innerHeight );
//      //document.body.appendChild( this._renderer.domElement );
//      //
//      //this._eventManager = new EventManager();
//      //this._inputHandler = new this._options.inputHandlerClass();
//      //this._entityManager = new this._options.entityManagerClass(this._stage);
//
//      this.timeStepSystem = {};
//
//      this.bootstrap();
//    },
//
//    /**
//     * Creates the stage and renderer and starts the game loop.
//     */
//    bootstrap: function() {
//      var self = this;
//
//      this._camera.position.z = 3;
//
//      requestAnimationFrame(run);
//
//      //Test object for renderer
//      //var geometry = new THREE.BoxGeometry( 1, 1, 1 );
//      //var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
//      //var cube = new THREE.Mesh( geometry, material );
//      //this._stage.add( cube );
//
//      function run(timestamp) {
//        if (self.pause) {return;}
//        requestAnimationFrame(run);
//
//        self.updateTime(timestamp);
//
//        self.getEventManager().trigger('game.updateStart');
//
//        this.runSystemGroup(self.systems.pre);
//        this.runSystemGroup(self.systems.main);
//        this.runSystemGroup(self.systems.post);
//
//        self.getEventManager().trigger('game.updateEnd');
//
//        self.getRenderer().render(self._stage, self._camera);
//      }
//    },
//
//    runSystemGroup: function (systems) {
//      for (var systemIndex in  systems) if (systems.hasOwnProperty(systemIndex)) {
//        var preSystem = systems[systemIndex].system;
//
//        preSystem.run();
//      }
//    },
//
//    updateTime: function(timestamp) {
//      this.previousTimeDelta = this.timeDelta;
//      this.timeDelta = timestamp - this.previousTime;
//      this.previousTime = timestamp;
//    },
//
//    createGlobalContainer: function() {
//      var self = this;
//      global.Container = {
//        getComponent: function(componentName) {
//          var propertyName = 'get' + componentName;
//          if (typeof self[propertyName] === 'function') {
//            return self[propertyName]();
//          }
//          console.error('Component "' + componentName + '" not found');
//          return null;
//        },
//        getGame: function() {
//          return self;
//        }
//      };
//    },
//
//    addEntity: function(entity) {
//      this.getEntityManager().addEntity(entity);
//    },
//
//    getHeight: function() {
//      return this.getRenderer().view.height;
//    },
//
//    getWidth: function() {
//      return this.getRenderer().view.width;
//    }
//  });
//})();
