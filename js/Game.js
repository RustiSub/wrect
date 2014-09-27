(function(global) {
  /**
   * @Class Game
   * @type {void|*}
   */
    global.Game = Class.extend ({
        _stage: null,
        _renderer: null,
        _inputHandler: null,
        _entityManager: null,
        _levelManager: null,
        _cameraContainer: null,
        _camera: null,
        timeDelta: 0,
        previousTime: 0,
        debug: false,
        fpsOutInterval: 10000,
        debugStats: [],
        _defaults: {
            inputHandlerClass: InputHandler,
            helpersClass: Helpers,
            entityManagerClass: EntityManager,
            collisionManagerClass: CollisionManager,
            guiManagerClass: window.GuiManager,
            gravityManagerClass: GravityManager,
            builder: Builder,
            levelManagerClass: LevelManager,
            width: 1280,
            height: 720
        },
        _options: {},
        _helpers: null,
        getStage: function() {
            return this._stage;
        },
        getRenderer: function() {
            return this._renderer;
        },
        getInputHandler: function() {
            return this._inputHandler;
        },
        getHelpers: function() {
            return this._helpers;
        },
        getEntityManager: function() {
            return this._entityManager;
        },
        getCollisionManager: function() {
            return this._collisionManager;
        },
        getLevelManager: function() {
          return this._levelManager;
        },
        getGuiManager: function() {
            return this._guiManager;
        },
        getCamera: function() {
          return this._camera;
        },
        getDelta: function() {
            return this.timeDelta;
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
            this._stage = new PIXI.Stage(0x5E5E5E);
            this._renderer = new PIXI.autoDetectRenderer(this._options.width, this._options.height);
            global.document.body.querySelector('.canvasContainer').appendChild(this._renderer.view);
            // Required for fading
            this._renderer.view.style.opacity = 1;
            this._cameraContainer = new PIXI.DisplayObjectContainer();
            this._cameraContainer.width = this._options.width;
            this._cameraContainer.height = this._options.height;
            this._stage.addChild(this._cameraContainer);

            this._inputHandler = new this._options.inputHandlerClass();
            this._entityManager = new this._options.entityManagerClass(this._stage);
            this._collisionManager = new this._options.collisionManagerClass();
            this._gravityManager = new this._options.gravityManagerClass();
            this._guiManager = new this._options.guiManagerClass();
            this._builder = new this._options.builder();
            this._levelManager = new this._options.levelManagerClass(this._stage, this._options.defaultLevel);
            this._camera = new window.Camera(0, 0, this._options.width, this._options.height);

            this.bootstrap();
        },

        /**
         * Inits the _helpers and merges passed with default options.
         * @param options
         */
        buildOptions: function(options) {
            // We need our _helpers before we can merge.
            this._helpers = options && options.helpersClass ? new options.helpersClass() : new this._defaults.helpersClass();
            var defaults = this._helpers.copy(this._defaults);
            this._options = this._helpers.merge(defaults, options);
        },

        /**
         * Creates the stage and renderer and starts the game loop.
         */
        bootstrap: function() {
            var stage = this.getStage();
            var renderer = this.getRenderer();
            var self = this;

            requestAnimationFrame(run);

            function run(timestamp) {
                requestAnimationFrame(run);
                self.updateTime(timestamp);
                if (self.debug) {
                    self.trackFps(timestamp);
                }

                var inputHandler = Container.getComponent('InputHandler');
                if (inputHandler.key('a')) {
                  self.selectEntity(-1);
                }
                if (inputHandler.key('z')) {
                  self.selectEntity(1);
                }

                var glueSource = false;

                if (inputHandler.key('K_TWO')) {
                  glueSource = true;
                }

                if (inputHandler.key('K_ZERO')) {
                  self._builder.createObject(glueSource);
                }

                if (inputHandler.key('RETURN')) {
                  self._gravityManager.applyForce(5, self.getEntityManager().getEntityByName('force_generator'));
                }

//                self._builder.clearRooms(game.getEntityManager().getAllEntities());
                game.completeTree = [];
                game.treeHashes = [];
                var range = {
                  x: 0,
                  y: 0,
                  width : 1280,
                  height: 720,
                  level: 0,
                  quadLevel : 0
                };

                game._collisionManager.mapQuadTree(game.getEntityManager().getAllEntities(), range);
//console.log(game.completeTree);
//                self._builder.buildConnections(game.getEntityManager().getAllEntities());
                self._collisionManager.updateAllCollisions();
                self._entityManager.update();
                self._levelManager.update();
                self._camera.update();
                self._inputHandler.update();

                renderer.render(stage);

                // Sets the element used for mouse-event tracking to the root GUI element. This fixes mouse input over GUI elements.
                if (stage.interactionManager.interactionDOMElement !== self._guiManager.getRoot().htmlElement) {
                  stage.setInteractionDelegate(self._guiManager.guiRoot.htmlElement);
                }
            }
        },

        updateTime: function(timestamp) {
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

        selectEntity: function(direction) {
          var entities = this.getEntityManager().getAllEntities();
          if (entities.length === 0) {
            return false;
          }
          if (direction === 1 && this._builder.selectedEntityIndex >= entities.length - 1) {
            this._builder.selectedEntityIndex = -1;
          }
          if (direction === -1 && this._builder.selectedEntityIndex <= 0) {
            this._builder.selectedEntityIndex = entities.length;
          }
          this._builder.selectedEntityIndex += direction;

          var entity = entities[this._builder.selectedEntityIndex];

          this.getEntityManager().deselectAll();
          entity.select();
          return true;
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

        /**
         * @param [element]
         */
        goFullscreen: function(element) {
            var isInFullScreen = (document.fullScreenElement && document.fullScreenElement !== null) ||    // alternative standard method
                (document.mozFullScreen || document.webkitIsFullScreen);

            var docElm = element ? element : document.body;
            if (!isInFullScreen) {

                if (docElm.requestFullscreen) {
                    docElm.requestFullscreen();
                }
                else if (docElm.mozRequestFullScreen) {
                    docElm.mozRequestFullScreen();
                }
                else if (docElm.webkitRequestFullScreen) {
                    docElm.webkitRequestFullScreen();
                }
                var self = this;
                setTimeout(function() {
                    self._renderer.resize(screen.width, screen.height);
                }, 40);
            }
            else {
                if (document.exitFullscreen) {
                    document.exitFullscreen()
                }
                else if (document.mozCancelFullScreen) {
                    document.mozCancelFullScreen();
                }
                else if (document.webkitExitFullscreen) {
                    document.webkitCancelFullscreen();
                }
                else if (document.msExitFullscreen) {
                    document.msExitFullscreen();
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

                //console.log('Past ' + this.fpsOutInterval + 'ms avg FPS: ' + (sum/this.debugStats.fps.length));
                this.debugStats.fps = [];
                this.debugStats.previousFpsOut = timestamp;
            }
        }
});
})(this);
