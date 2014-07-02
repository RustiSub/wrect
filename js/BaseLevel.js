window.BaseLevel = Class.extend({
    entityData: {},
    backgroundData: {},
    gravity: 1,
    name: '',
    _ready: false,
    _levelData: {},
    init: function(name) {
        this.name = name;
    },
    toJSON: function() {
        var o = this.getSerializableObject();
        return JSON.stringify(o);
    },
    fromJSON: function(json) {
        var data = JSON.parse(json);
        for (var i = 0; i < data.entityData.length; i++) {
          var entityObject = JSON.parse(data.entityData[i]);
          // Build entity from classname inside the object.
        }
        console.log(data);
    },
    saveToFile: function(){
        var blob = new Blob(this.getSerializableObject());
        var a = document.createElement('a');
        a.href = window.URL.createObjectURL(blob);
        a.download = this.getFullLevelName();
        console.log(a);
    },
    getSerializableObject: function() {
        return {
            entityData: this.entityData,
            backgroundData: this.backgroundData,
            gravity: this.gravity,
            name: this.name,
            className: this.getClassName()
        };
    },
    getFullLevelName: function() {
        return 'Level' + this.name;
    },
    // Unfortunately there's no inheritance-proof reliable way to dynamically get this in JS.
    getClassName: function() {
        return 'BaseLevel';
    },
    update: function() {

    }
});
