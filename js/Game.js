(function(global) {
    global.Game = Class.extend ({
        _stage: null,
        _renderer: null,
        _inputHandler: null,
        _entityManager: null,
        _defaults: {
            inputHandlerClass: InputHandler,
            helpersClass: Helpers,
            entityManagerClass: EntityManager,
            collisionManagerClass: CollisionManager,
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

            this._inputHandler = new this._options.inputHandlerClass();
            this._entityManager = new this._options.entityManagerClass(this._stage);
            this._collisionManager = new this._options.collisionManagerClass();

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
                  self.selectEntity('b1');
                }
                if (inputHandler.key('z')) {
                  self.selectEntity('c1');
                }
                self._entityManager.update();
                self._collisionManager.updateAllCollisions(self._entityManager.getAllEntities());

                for (var i = this.game._stage.children.length - 1; i >= 0; i--) {
                    this.game._stage.children[i].alpha -= 0.01;
                }

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

        selectEntity: function(name) {
          this._entityManager.getEntityByName(name).toggleSelect();
        },

        applyForce: function(multiplier) {
          var forcePoint = {
            x: 200,
            y: 200,
            multiplier: multiplier
          };
          var entities = this.getEntityManager().getAllEntities();
          for (var i = 0; i < entities.length; i++) {
            var entity = entities[i];
            if (entity.name.substr(0, 1) == 'b') {
              var xDist =  entity._graphics.position.x - forcePoint.x;
              var yDist =  entity._graphics.position.y - forcePoint.y;
              entity._physics.xSpeed = (xDist / 50) * forcePoint.multiplier;
              entity._physics.ySpeed = (yDist / 50) * forcePoint.multiplier ;

            }
          }
        }
    });
})(this);
