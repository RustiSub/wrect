(function() {

  /**
   * Basic timer functionality
   * @param {int} time - time in ms
   * @constructor
   */
  window.Timer = function(time) {
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
    
    Container.getGame().getEventManager().addListener('game.updateStart', this.update);
  };
  
  window.Timer.prototype.game = Container.getGame();
  
  /**
   * Update the timer. Needs the current delta since the previous update
   * @param delta
   */
  window.Timer.prototype.update = function(delta) {
    this._currentTime += delta;
  };

  /**
   * Returns the difference between the current and the target time.
   */
  window.Timer.prototype.delta = function() {
    return this.targetTime - this._currentTime;
  };

  /**
   * Set the target time
   * @param {int} targetTime - time in ms to reach
   */
  window.Timer.prototype.set = function(targetTime) {
    this.targetTime = targetTime;
  };

  /**
   * Reset the current time
   */
  window.Timer.prototype.reset = function() {
    this._currentTime = 0;
  };
}());
