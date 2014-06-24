window.LevelManager = Class.extend({
    level: {},
    _stage: {},
    _currentOpacity: 1,
    fading: 'none',
    _fadeReady: false,
    init: function(stage) {
      this._stage = stage;
    },
    createInitialLevel: function() {
      this.level = new BaseLevel();
      this.level.name = 'Base';
      this.saveLevel();
    },
    initLevel: function(level) {
      console.log(level);
    },

    /**
     * Manager logic
     */

    loadLevel: function(path) {
      this.startFadeOut();
      this.loadData(path, this.initLevel);
    },
    saveLevel: function() {
      if (this.level) {
        this.level.entities = entities;
        store.set(this.getCurrentLevelName(), this.level);
      }

    },
    getCurrentLevelName: function() {
      return 'Level' + this.level.name;
    },

    loadData: function(levelName, successCallback) {
      successCallback(store.get('Level' + levelName));
      /*ajax({
        url: path,
        success: function(response) {
          successCallback(response);
        },
        error: function(response) {
          console.error('Something went wrong while loading the next level :(');
          console.info('ResponseText: ', response.responseText);
        }
      });*/
    },

    /**
     * Transition logic
     */
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

    /**
     * Update logic
     */
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
