(function() {
  "use strict";

  wrect.Core = wrect.Core || {};

  /**
   * Basic timer functionality
   * @class wrect.Core.Timer
   * @constructor
   */
  wrect.Core.Timer = function(options) {

    var time = options.time || 0;
    var callback = options.callback || function() {};
    var once = options.once || false;

    this.eventManager = options.eventManager;
    this.gameTime = options.gameTime;

    /**
     * Target time
     * @type {int} - time in ms to reach
     */
    this.targetTime = time;

    /**
     * Current time
     * @type {Number}
     * @private
     */
    this._currentTime = 0;

    /**
     * Callback to be executed when detla < 0
     * @type {Function}
     */
    this.callback = callback ? callback : null;

    /**
     * Only countdown once
     * @type {boolean}
     */
    this.once = !!once;

    this.eventManager.addListener('game.updateStart', this.update, this);
  };

  /**
   * Update the timer.
   */
  wrect.Core.Timer.prototype.update = function() {
    if (this.paused) {
      return;
    }

    this._currentTime += this.gameTime.getDelta();

    if (this.callback && (this.targetTime - this._currentTime) < 0) {
      this.callback(this);
      this.reset();
      if (this.once) {
        this.stop();
      }
    }
  };

  /**
   * Returns the difference between the current and the target time.
   */
  wrect.Core.Timer.prototype.delta = function() {
    return this.targetTime - this._currentTime;
  };

  /**
   * Set the target time
   * @param {int} targetTime - time in ms to reach
   */
  wrect.Core.Timer.prototype.set = function(targetTime) {
    this.targetTime = targetTime;
  };

  /**
   * Resets the timer
   */
  wrect.Core.Timer.prototype.reset = function() {
    this._currentTime = 0;
  };

  /**
   * Pauses the timer
   */
  wrect.Core.Timer.prototype.pause = function() {
    this.paused = true;
  };

  /**
   * Unpause the timer
   */
  wrect.Core.Timer.prototype.unpause = function() {
    this.paused = false;
  };

  /**
   * Stops the timer
   */
  wrect.Core.Timer.prototype.stop = function() {
    this.pause();
    this.reset();
  };

  /**
   * Pauses the timer
   */
  wrect.Core.Timer.prototype.start = function() {
    this.reset();
    this.unpause();
  };
}());
