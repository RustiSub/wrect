(function() {
  "use strict";

  var BaseSystem = require('./BaseSystem');
  var TimeStep = function (options) {
    BaseSystem.call(this, options);

    this.options = options || {};
    this.systems = [];

    this.fixedTimeStep = 16;
    this.remainder = 0;
    this.timeSteps = 0;
  };

  TimeStep.prototype = Object.create( BaseSystem.prototype );
  TimeStep.prototype.constructor = TimeStep;

  TimeStep.prototype.name = 'TimeStep';

  TimeStep.prototype.checkDependencies = function() {
    return false;
  };

  TimeStep.prototype.run = function() {
    var gameTime = this.options.game.gameTime;

    this.remainder += gameTime.getDelta() % this.fixedTimeStep;
    this.timeSteps = Math.round(gameTime.getDelta() / this.fixedTimeStep);

    if (this.remainder >= this.fixedTimeStep) {
      this.timeSteps += 1;
      this.remainder = this.remainder - this.fixedTimeStep;
    }
  };
  
  module.exports = TimeStep;
}());
