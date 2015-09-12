(function() {
  "use strict";

  /**
   * Wrapper class for Minivents
   * @class GameTime
   * @constructor
   */
  var GameTime = function(options) {
    this.eventManager = options.eventManager;
    this.previousTime = 0;
    this.timeDelta = 0;
  };

  GameTime.prototype.updateTime = function(timeStamp) {
    this.timeDelta = timeStamp - this.previousTime;
    this.previousTime = timeStamp;
  };

  GameTime.prototype.getDelta = function() {
    return this.timeDelta;
  };

  GameTime.prototype.getPreviousTime = function() {
    return this.previousTime;
  };

  module.exports = GameTime;
}());
