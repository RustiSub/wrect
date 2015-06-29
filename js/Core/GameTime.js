(function() {
  "use strict";

  wrect.Core = wrect.Core || {};

  /**
   * Wrapper class for Minivents
   * @class wrect.Core.GameTime
   * @constructor
   */
  wrect.Core.GameTime = function(options) {
    this.eventManager = options.eventManager;
    this.previousTime = 0;
    this.timeDelta = 0;
  };

  wrect.Core.GameTime.prototype.updateTime = function(timeStamp) {
    this.timeDelta = timeStamp - this.previousTime;
    this.previousTime = timeStamp;
  };

  wrect.Core.GameTime.prototype.getDelta = function() {
    return this.timeDelta;
  };

  wrect.Core.GameTime.prototype.getPreviousTime = function() {
    return this.previousTime;
  };
}());
