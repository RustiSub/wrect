window.BaseLevel = Class.extend({
    entityData: {},
    backgroundData: {},
    gravity: 1,
    name: '',
    _ready: false,
    _levelData: {},
    init: function(name, dataPath) {
        this.name = name;
        this.fadeOut();
        this.loadData(dataPath, postRequestInit);
    },
    postRequestInit: function(levelData) {
        this._levelData = levelData;
    },
    loadData: function(path, successCallback) {
        ajax({
            url: path,
            success: function(response) {
                successCallback(response);
            },
            error: function(response) {
                console.error('Something went wrong while loading the next level :(');
                console.info('ResponseText: ', response.responseText);
            }
        });
    },
    fadeOut: function() {

    },
    fadeIn: function() {

    },
    update: function() {
    }
});