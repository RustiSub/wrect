(function() {
  "use strict";

  wrect.Core = wrect.Core || {};

  /**
   * Basic timer functionality
   * @param {int} time - time in ms
   * @param {function} [callback] - Callback to trigger on reaching 0
   * @param {boolean} [once] - If callback should only be called once or if it should reset
   * @class wrect.Core.Timer
   * @constructor
   */
  wrect.Core.Timer = function(time, callback, once) {

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
     * Reference to Game
     * @type {Game}
     */
    this.game = Container.getGame();

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

    this.game.getEventManager().addListener('game.updateStart', this.update, this);
  };

  /**
   * Update the timer.
   */
  wrect.Core.Timer.prototype.update = function() {
    if (this.paused) {
      return;
    }

    this._currentTime += this.game.getDelta();

    if (this.callback && (this.targetTime - this._currentTime) < 0) {
      this.callback();
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
}());
