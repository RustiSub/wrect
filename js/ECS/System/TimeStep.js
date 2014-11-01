(function() {
  "use strict";

  wrect.ECS = wrect.ECS || {};
  wrect.ECS.System = wrect.ECS.System || {};

  var Vector = wrect.Physics.Vector;

  wrect.ECS.System.TimeStep = function (options) {
    wrect.ECS.System.BaseSystem.call(this);

    this.options = options || {};
    this.systems = [];

    this.fixedTimeStep = 16;
    this.remainder = 0;
    this.timeSteps = 0;
  };

  wrect.ECS.System.TimeStep.prototype = Object.create( wrect.ECS.System.BaseSystem.prototype );
  wrect.ECS.System.TimeStep.prototype.constructor = wrect.ECS.System.TimeStep;

  wrect.ECS.System.TimeStep.prototype.name = 'TimeStep';

  wrect.ECS.System.BaseSystem.prototype.checkDependencies = function(entity) {
    return false;
  };

  wrect.ECS.System.TimeStep.prototype.run = function(entity) {
    this.remainder += game.getDelta() % this.fixedTimeStep;
    this.timeSteps = Math.round(game.getDelta() / this.fixedTimeStep);

    if (this.remainder >= this.fixedTimeStep) {
      this.timeSteps += 1;
      this.remainder = this.remainder - this.fixedTimeStep;
    }
  }
}());
