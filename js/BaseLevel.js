window.BaseLevel = Class.extend({
    entities: [],
    backgroundData: {},
    gravity: 1,
    name: '',
    levelData: {},
    _ready: false,
    _className: 'BaseLevel',
    init: function(name) {
        this.name = name;
    },
    saveToFile: function(){
        var blob = new Blob(this.getSerializableObject());
        var a = document.createElement('a');
        a.href = window.URL.createObjectURL(blob);
        a.download = this.getFullLevelName();
        console.log(a);
    },
    getFullLevelName: function() {
        return 'Level' + this.name;
    },
    update: function() {

    },

    // JSON logic
    toJSON: function() {
        return {
            entities: this.entities,
            backgroundData: this.backgroundData,
            gravity: this.gravity,
            name: this.name,
            _className: this._className,
            levelData: this.levelData
        };
    },
    fromJSON: function(data) {
        // EntityData
        for (var i = 0; i < data.entities.length; i++) {
            var entityObject = data.entities[i];
            // TODO: this will break as soon as we namespace. Possibly we can store the whole namespace inside localStorage and split it to separate components?
            // Dirty check to see what kind of graphics we had (sprite or graphic)
            var graphic;
            if (entityObject._graphics.texture !== undefined) {
                graphic = PIXI.Sprite.fromJso(entityObject._graphics);
            }
            else {
                graphic = PIXI.Graphics.fromJso(entityObject._graphics);
            }
          console.log(graphic);
            var entity = new window[entityObject._className](entityObject.name, graphic);

            entity._physics = new window[entityObject._physics._className]();
            for (var j in entityObject) {
                if (entity.hasOwnProperty(j) && j !== '_graphics' && j !== '_physics') {
                    entity[j] = entityObject[j];
                }
            }
          console.log(entity);
            this.entities.push(entity);
        }

        // Background Data
        this.backgroundData = data.backgroundData;

        // Gravity
        this.gravity = data.gravity;

        // Name
        this.name = data.name;

        // LevelData
        this.levelData = data.levelData;

        return this;
    }
});
