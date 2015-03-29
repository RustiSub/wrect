(function(global) {

  var EventManager = wrect.Core.EventManager;

  /**
   * @Class Game
   * @type {void|*}
   */
  global.Game = Class.extend ({
    systems: {},
    _stage: null,
    _renderer: null,
    _inputHandler: null,
    _entityManager: null,
    _levelManager: null,
    _cameraContainer: null,
    _camera: null,
    _eventManager: null,
    timeDelta: 0,
    previousTimeDelta: null,
    previousTime: 0,
    debug: false,
    fpsOutInterval: 10000,
    completeTree: [],
    treeHashes: [],
    debugStats: {},
    _defaults: {
      inputHandlerClass: InputHandler,
      entityManagerClass: EntityManager,
      collisionManagerClass: CollisionManager,
      guiManagerClass: window.GuiManager,
      gravityManagerClass: GravityManager,
      //builder: Builder,
      levelManagerClass: LevelManager,
      width: 1280,
      height: 720
    },
    _options: {},
    getStage: function() {
      return this._stage;
    },
    getRenderer: function() {
      return this._renderer;
    },
    getInputHandler: function() {
      return this._inputHandler;
    },
    /**
     * @deprecated - This is now a global object, so always accessible from window.Helpers.
     * @returns {null}
     */
    getHelpers: function() {
      return window.Helpers;
    },
    /**
     * @returns {wrect.Core.EventManager}
     */
    getEntityManager: function() {
      return this._entityManager;
    },
    getGuiManager: function() {
      return this._guiManager;
    },
    getCamera: function() {
      return this._camera;
    },
    getEventManager: function() {
      return this._eventManager;
    },
    getDelta: function() {
      return this.timeDelta;
    },
    getPreviousTime: function() {
      return this.previousTime;
    },
    getCurrentLevel: function() {
      return this._levelManager.getCurrentLevel();
    },

    /**
     * @param options
     * @param {Boolean} options.autoBoot Whether or not to automatically start up the game. This can be useful for overriding classes between the init and boot
     */
    init: function(options) {
      this.createGlobalContainer.call(this);
      this.buildOptions(options);
      if (options.debug) {
        console.info('debug mode enabled');
        this.debug = true;
        this.debugTilemap = options.debugTilemap;
        this.debugStats = {};
        if (options.fpsOutInterval) {
          this.fpsOutInterval = options.fpsOutInterval;
        }
      }
      this.buildComponents();
      if (this._options && typeof this._options.autoBoot !== 'undefined' && this._options.autoBoot) {
        this.bootstrap(options);
      }
    },
      /**
     * Builds up the default components. See _defaults to overwrite default classes.
     */
    buildComponents: function() {
      this._stage = new THREE.Scene();
      this._camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );

      this._renderer = new THREE.WebGLRenderer();
      this._renderer.setSize( window.innerWidth, window.innerHeight );
      document.body.appendChild( this._renderer.domElement );

      this._eventManager = new EventManager();
      this._inputHandler = new this._options.inputHandlerClass();
      this._entityManager = new this._options.entityManagerClass(this._stage);

      this.timeStepSystem = {};

      this.bootstrap();
    },

    /**
     * Inits the _helpers and merges passed with default options.
     * @param options
     */
    buildOptions: function(options) {
      // We need our _helpers before we can merge.
      var objHelpers = window.Helpers.object;
      var defaults = objHelpers.copy(this._defaults);
      this._options = objHelpers.merge(defaults, options);
    },

    /**
     * Creates the stage and renderer and starts the game loop.
     */
    bootstrap: function() {
      var self = this;

      this._camera.position.z = 3;

      requestAnimationFrame(run);

      //Test object for renderer
      //var geometry = new THREE.BoxGeometry( 1, 1, 1 );
      //var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
      //var cube = new THREE.Mesh( geometry, material );
      //this._stage.add( cube );

      function run(timestamp) {
        if (self.pause) {return;}
        requestAnimationFrame(run);
        //cube.rotation.x += 0.01;
        //cube.rotation.y += 0.01;

        self.getEventManager().trigger('game.updateStart');
        self.updateTime(timestamp);
        if (self.debug) {
          self.trackFps(timestamp);
        }

        var preSystems = self.systems.pre;
          for (var preSystemIndex in  preSystems) if (preSystems.hasOwnProperty(preSystemIndex)) {
          var preSystem = preSystems[preSystemIndex].system;

          preSystem.run();
        }

        self.physicsEngine.run();

        var postSystems = self.systems.post;
          for (var postSystemIndex in  postSystems) if (postSystems.hasOwnProperty(postSystemIndex)) {
          var postSystem = postSystems[postSystemIndex].system;

          postSystem.run();
        }

        self.getEventManager().trigger('game.updateEnd');
        // Needs to be last
        self._renderer.render(self._stage, self._camera);
      }
    },

    updateTime: function(timestamp) {
      this.previousTimeDelta = this.timeDelta;
      this.timeDelta = timestamp - this.previousTime;
      this.previousTime = timestamp;
    },

    createGlobalContainer: function() {
      var self = this;
      global.Container = {
        getComponent: function(componentName) {
          var propertyName = 'get' + componentName;
          if (typeof self[propertyName] === 'function') {
            return self[propertyName]();
          }
          console.error('Component "' + componentName + '" not found');
          return null;
        },
        getGame: function() {
          return self;
        }
      };
    },

    addEntity: function(entity) {
      this.getEntityManager().addEntity(entity);
    },

    fadeOut: function(callback, thisArg, args) {
      if (this._renderer.view.style.opacity !== "0") {
        this._renderer.view.style.opacity = 0;
        if (typeof callback === 'function') {
          var self = this;
          this._renderer.view.addEventListener("transitionend", function realCallback() {
                self._renderer.view.removeEventListener('transitionend', realCallback, true);
                callback.apply(thisArg, args);
              },
              true);
        }
      }
    },

    fadeIn: function(callback, thisArg, args) {
      if (this._renderer.view.style.opacity !== "1") {
        this._renderer.view.style.opacity = 1;
        if (typeof callback === 'function') {
          var self = this;
          this._renderer.view.addEventListener("transitionend", function realCallback() {
                self._renderer.view.removeEventListener('transitionend', realCallback, true);
                callback.apply(thisArg, args);
              },
              true);
        }
      }
    },

    getHeight: function() {
      return this.getRenderer().view.height;
    },

    getWidth: function() {
      return this.getRenderer().view.width;
    },

    trackFps: function(timestamp) {
      if (!this.debugStats.previousFpsOut) {
        this.debugStats.previousFpsOut = timestamp;
      }
      if (!this.debugStats.fps) {
        this.debugStats.fps = [];
      }
      this.debugStats.fps.push((1/this.timeDelta) * 1000);

      if (this.fpsOutInterval < (timestamp - this.debugStats.previousFpsOut)) {
        var sum = this.debugStats.fps.reduce(function(a, b) {
          return a + b;
        });

        console.debug('Past ' + this.fpsOutInterval + 'ms avg FPS: ' + (sum/this.debugStats.fps.length));
        this.debugStats.fps = [];
        this.debugStats.previousFpsOut = timestamp;
      }
    }
  });
})();
