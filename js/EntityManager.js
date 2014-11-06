(function() {
    window.EntityManager = Class.extend({
        _entities: [],
        _entitiesByName: {},
        _stage: null,
        cameraContainer: null,
        init: function(stage){
            this._stage = stage;
            this.cameraContainer = Container.getGame()._cameraContainer;
        },

        /**
         * @param {BaseEntity} entity
         * @param {Boolean} [addToWorld]
         */
        addEntity: function(entity, addToWorld){
            if (addToWorld === undefined){
              addToWorld = true;
            }
            this._entities.push(entity);
            this._entitiesByName[entity.name] = entity;
            if (addToWorld) {
                this.cameraContainer.addChild(entity.getGraphics());
            } else {
                game.getStage().addChild(entity.getGraphics());
            }
        },

        /**
         * @param {BaseEntity} entity
         */
        removeEntity: function(entity){
            var index;
            if ((index = this._entities.indexOf(entity)) != -1) {
                this._entities.splice(index, 1);
                delete this._entitiesByName[entity.name];
            }
        },

      /**
       * @param {string} name
       */
        removeEntityByName: function(name) {
            var entity = this._entitiesByName[name];
            if (entity) {
                this.removeEntity(entity);
            }
        },

        /**
         * Returns all entities
         * @returns {*}
         */
        getAllEntities: function(){
            return this._entities;
        },

        /**
         * Returns all entities indexed by name
         * @returns {*}
         */
        getAllEntitiesByName: function() {
            return this._entitiesByName;
        },

        /**
         * Get a single entity by name
         * @param name
         * @returns {*}
         */
        getEntityByName: function(name){
            return this._entitiesByName[name];
        },

        /**
         * Get all entities where partOfName is a part of their name
         * THIS. IS. SLOW.
         * @param partOfName
         * @returns {Array}
         */
        getEntitiesByName: function(partOfName){
            var found = [];
            for (var i = 0; i < this._entities.length; i++) {
                if (this._entities[i].name.indexOf(partOfName) != -1) {
                    found.push(this._entities[i]);
                }
            }

            return found;
        },

        clearEntities: function(clearStage) {
            this._entities = [];
            this._entitiesByName = {};
            if (clearStage) {
                Container.getGame()._builder.clearRooms(this.getAllEntities());
                this.cameraContainer.removeChildren();
            }
        },

        /**
         * Update all entities, called in Game.run();
         */
        update: function() {
            for (var i = 0; i < this._entities.length; i++) {
                this._entities[i].update();
            }
        },
        deselectAll: function() {
            for (var i = 0; i < this._entities.length; i++) {
                this._entities[i].deselect();
            }
        }
    });
})();
