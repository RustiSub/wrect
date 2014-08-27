(function(global) {
    global.Game = Class.extend ({
        _stage: null,
        _renderer: null,
        _inputHandler: null,
        _entityManager: null,
        _levelManager: null,
        _defaults: {
            inputHandlerClass: InputHandler,
            helpersClass: Helpers,
            entityManagerClass: EntityManager,
            collisionManagerClass: CollisionManager,
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

        /**
         * @param options
         * @param {Boolean} options.autoBoot Whether or not to automatically start up the game. This can be useful for overriding classes between the init and boot
         */
        init: function(options) {
            this.buildOptions(options);
            this.buildComponents();
            if (this._options && typeof this._options.autoBoot !== 'undefined' && this._options.autoBoot) {
                this.bootstrap(options);
            }
            this.createGlobalContainer.call(this);
        },

        /**
         * Builds up the default components. See _defaults to overwrite default classes.
         */
        buildComponents: function() {
            this._stage = new PIXI.Stage(0x5E5E5E);
            this._renderer = new PIXI.autoDetectRenderer(this._options.width, this._options.height);
            // Required for fading
            this._renderer.view.style.opacity = 1;

            this._inputHandler = new this._options.inputHandlerClass();
            this._entityManager = new this._options.entityManagerClass(this._stage);
            this._collisionManager = new this._options.collisionManagerClass();
            this._gravityManager = new this._options.gravityManagerClass();
            this._builder = new this._options.builder();
            this._levelManager = new this._options.levelManagerClass(this._stage);

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

            global.document.body.appendChild(renderer.view);
            requestAnimationFrame(run);

            function run() {
                requestAnimationFrame(run);
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

                self._builder.clearRooms(game.getEntityManager().getAllEntities());
                self._builder.buildConnections(game.getEntityManager().getAllEntities());

                self._collisionManager.updateAllCollisions(self._entityManager.getAllEntities());
                self._entityManager.update();

                renderer.render(stage);
            }
        },

        createGlobalContainer: function() {
            var self = this;
            global.Container = {
                getComponent: function(componentName) {
                    var propertyName = 'get' + componentName;
                    if (typeof self[propertyName] === 'function') {
                        return self[propertyName]();
                    }
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

        applyForce: function(multiplier) {
          var maxDistance = 500;
          var forcePoint = {
            x: 500,
            y: 200,
            multiplier: multiplier,
            gravity: 100
          };
          var entities = this.getEntityManager().getAllEntities();
          for (var i = 0; i < entities.length; i++) {
            var entity = entities[i];
            if (entity.name.substr(0, 1) == 'b') {
              if (entity.hasGlue) {
                continue;
              }
              var xMultiplier = multiplier;
              var yMultiplier = multiplier;
              var xDist =  (entity._graphics.position.x - forcePoint.x);
              var yDist =  (entity._graphics.position.y - forcePoint.y);

              if (xDist < 0) {
                xDist = -xDist;
                xMultiplier = -multiplier;
              }

              if (xDist != 0) {
                entity._physics.xSpeed = (1 - (xDist / maxDistance)) * xMultiplier;
              }

              if (yDist < 0) {
                yDist = -yDist;
                yMultiplier = -multiplier;
              }

              if (yDist != 0) {
                entity._physics.ySpeed = (1 - (yDist / maxDistance)) * yMultiplier;
              }
            }
          }
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
        }
});
})(this);
