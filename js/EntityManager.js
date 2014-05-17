var EntityManager = Class.extend({
    _entities: [],
    _stage: null,
    init: function(stage){
        this._stage = stage;
    },

    /**
     * @param {BaseEntity} entity
     * @param {Boolean} [addToWorld]
     */
    addEntity: function(entity, addToWorld){
        if (entity instanceof BaseEntity) {
            this._entities.push(entity);
        }
        if (addToWorld === undefined || addToWorld) {
            this._stage.addChild(entity.getSprite());
        }
    },

    /**
     * @param {BaseEntity} entity
     */
    removeEntity: function(entity){
        var index;
        if ((index = this._entities.indexOf(entity)) != -1) {
            this._entities.splice(index, 1);
        }
    },

    /**
     * Returns all entities
     * @returns {*}
     */
    getEntities: function(){
        return this._entities;
    },

    /**
     * Get a single entity by name
     * @param name
     * @returns {*}
     */
    getEntityByName: function(name){
        for (var i = 0; i < this._entities.length; i++) {
            if (this._entities[i].name == name) {
                return this._entities[i];
            }
        }

        return false;
    },

    /**
     * Get all entities where partOfName is a part of their name
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

    /**
     * Update all entities, called in Game.run();
     */
    update: function() {
        for (var i = 0; i < this._entities.length; i++) {
            this._entities[i].update();
        }
    }
});