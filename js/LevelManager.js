window.LevelManager = Class.extend({
    currentLevel: {},
    _stage: {},
    _currentOpacity: 1,
    fading: 'none',
    _fadeReady: false,

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
      // TODO: this will break as soon as we namespace. Possibly we can store the whole namespace inside localStorage and split it to separate components?
      var level = new window[levelJso._className]();
      level.fromJSON(levelJso);
      this.switchLevel(level);
    },

    switchLevel: function(level) {
        this.currentLevel = level;
        Container.getGame().getEntityManager().clearEntities();
        for (var x = 0; x < level.entities.length; x++) {
          console.log(level.entities[x]);
            Container.getGame().getEntityManager().addEntity(level.entities[x]);
        }
    },

    /////
    // Management Logic
    /////
    /**
     * Loads the level with the given name
     * @param name
     */
    loadLevel: function(name) {
      this.startFadeOut();
      this.loadData(name, this.initLevel);
    },

    /**
     * creates a level of the current entities when none is present in the local storage yet.
     */
    createInitialLevel: function() {
        this.currentLevel = new BaseLevel();
        this.currentLevel.name = 'Base';
        this.currentLevel.entities = Container.getComponent('EntityManager').getAllEntities();
        this.saveLevel();
    },

    /**
     * Saves the current level in it's current state to localStorage
     */
    saveLevel: function() {
      if (this.currentLevel) {
        store.set(this.getCurrentLevelName(), this.currentLevel);
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
     */
    loadData: function(levelName, successCallback) {
      successCallback.call(this, store.get('Level' + levelName));
      /*ajax({
        url: path,
        success: function(response) {
          successCallback(response);
        },
        error: function(response) {
          console.error('Something went wrong while loading the next currentLevel :(');
          console.info('ResponseText: ', response.responseText);
        }
      });*/
    },

     /////
     //Transition logic
     /////
    _fadeOut: function() {
      if (this._currentOpacity > 0) {
        var i;
        this._currentOpacity -= 0.01;
        for (i = 0; i < this._stage.children.length; i++) {
          this._stage.children[i].opacity = this._currentOpacity;
        }
      }
      else {
        this._fadeReady = true;
        this.fading = 'none';
      }
    },
    _fadeIn: function() {
      if (this._currentOpacity < 1) {
        var i;
        this._currentOpacity += 0.01;
        for (i = 0; i < this._stage.children.length; i++) {
          this._stage.children[i].opacity = this._currentOpacity;
        }
      }
      else {
        this._fadeReady = true;
        this.fading = 'none';
      }
    },
    startFadeIn: function() {
      this._fadeReady = false;
      this.fading = 'in';
    },
    startFadeOut: function() {
      this._fadeReady = false;
      this.fading = 'out';
    },

    /////
    // Update logic
    /////
    update: function() {
      this.updateFades();
    },
    updateFades: function() {
      if (this.fading !== 'none') {
        switch (this.fading) {
          case 'in':
            this._fadeIn();
            break;
          case 'out':
            this._fadeOut();
            break;
        }
      }
    }
});
