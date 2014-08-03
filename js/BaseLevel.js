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
        var blob = new Blob([JSON.stringify(this)]);
        // Hackity hack hack
        var a = document.createElement('a');
        a.href = window.URL.createObjectURL(blob);
        a.download = this.getFullLevelName();
        var ce = new Event('click');
        a.dispatchEvent(ce);
        window.URL.revokeObjectURL(a.href);
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
            var dataObject = data.entities[i];
            var entity = game._builder.createBlock(dataObject.name, dataObject.x, dataObject.y, dataObject.width, dataObject.height, dataObject.color);
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
