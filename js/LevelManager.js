(function() {
    "use strict";
    window.LevelManager = Class.extend({
        currentLevel: {},
        _stage: {},
        _currentOpacity: 1,

        /**
         * @param stage
         */
        init: function(stage) {
            this._stage = stage;
        },

        /**
         * Initializes a freshly loaded level
         * @param levelJso
         */
        initLevel: function(levelJso) {
            var level = new window.BaseLevel();
            level.fromJSON(levelJso);
            this.switchLevel(level);
        },

        switchLevel: function(level) {
            this.currentLevel = level;
            Container.getGame().getEntityManager().clearEntities();
            for (var x = 0; x < level.entities.length; x++) {
                game.getEntityManager().addEntity(level.entities[x]);
            }
        },

        /**
         * Loads the level with the given name
         * @param name
         * @param fromFile
         */
        loadLevel: function(name, fromFile) {
            var self = this;
            var loadCallback = function(levelData) {
                self.initLevel(levelData);
                game.fadeIn();
            };
            game.fadeOut(function() {
                this.clearLevel();
                this.loadData(name, fromFile, loadCallback);
            }, this);
        },

        clearLevel: function() {
            game.getEntityManager().clearEntities(true);
        },

        /**
         * creates a level of the current entities when none is present in the local storage yet.
         * !!ONLY BLOCKS ARE CURRENTLY SAVED!!
         */
        saveCurrentState: function(levelName, asFile) {
            this.currentLevel = new BaseLevel();
            this.currentLevel.name = levelName;
            var entities = Container.getComponent('EntityManager').getAllEntities();
            var blocks = [];
            for (var x = 0; x < entities.length; x++) {
                if (entities[x] instanceof Block) {
                    blocks.push(entities[x]);
                }
            }
            this.currentLevel.entities = blocks;
            this.saveLevel(asFile);
        },

        /**
         * Saves the current level in it's current state to localStorage
         */
        saveLevel: function(asFile) {
            asFile = asFile !== undefined ? asFile : false;
            if (this.currentLevel) {
                if (!asFile) {
                    store.set(this.getCurrentLevelName(), this.currentLevel);
                }
                else {
                    // Hackity hack hack
                    var a = document.createElementNS("http://www.w3.org/1999/xhtml", "a");
                    var json = JSON.stringify(this.currentLevel),
                        blob = new Blob([json], {type: "text/plain;charset=utf-8"}),
                        url = window.URL.createObjectURL(blob);
                    a.href = url;
                    a.download = this.getCurrentLevelName() + '.js';

                    var ce = new Event('click');
                    a.dispatchEvent(ce);
                    window.URL.revokeObjectURL(url);

                }
            }
        },

        /**
         * Gets the full name of the current level
         * @returns {*}
         */
        getCurrentLevelName: function() {
            return this.currentLevel.getFullLevelName();
        },

        /**
         * Load level data from either localStorage or filesystem/server
         * @param levelName
         * @param successCallback
         * @param fromFile
         */
        loadData: function(levelName, fromFile, successCallback) {
            var levelData;
            if (!fromFile) {
                levelData = store.get('Level' + levelName);
                successCallback.call(this, levelData);
            }
            else {
                ajax({
                    url: 'resources/levels/Level' + levelName + '.js',
                    dataType: 'json',
                    success: function(response) {
                        successCallback.call(this, response);
                    }
                });
            }
        }
    });
})();