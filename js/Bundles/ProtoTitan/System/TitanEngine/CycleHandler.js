(function() {
  "use strict";

  wrect.ECS = wrect.ECS || {};
  wrect.ECS.System = wrect.ECS.System || {};
  wrect.ECS.System.TitanEngine = wrect.ECS.System.TitanEngine || {};

  var Vector = wrect.Physics.Vector;

  wrect.ECS.System.TitanEngine.CycleHandler = function (options) {
    wrect.ECS.System.BaseSystem.call(this, options);

    this.options = options || {};
    this.gameTime = options.gameTime;
  };

  wrect.ECS.System.TitanEngine.CycleHandler.prototype = Object.create( wrect.ECS.System.BaseSystem.prototype );
  wrect.ECS.System.TitanEngine.CycleHandler.prototype.constructor = wrect.ECS.System.TitanEngine.CycleHandler;

  wrect.ECS.System.TitanEngine.CycleHandler.prototype.name = 'CycleHandler';

  wrect.ECS.System.TitanEngine.CycleHandler.prototype.checkDependencies = function(entity) {
    return entity.components.TitanEngineSystemCollection ? true : false;
  };

  wrect.ECS.System.TitanEngine.CycleHandler.prototype.perform = function(entity) {
    console.log('Polling all systems...');
    var systems = entity.components.TitanEngineSystemCollection.systems;
    for(var systemIndex in systems) if (systems.hasOwnProperty(systemIndex)) {
      var system = systems[systemIndex];

      console.log('Handle system: ', system);
      this.handleSystem(system);
    }
  };

  wrect.ECS.System.TitanEngine.CycleHandler.prototype.handleSystem = function(system) {
    if (!system.activeStep) {
      this.activateNextStep(system);
    }

    if (system.activeStep) {
      this.handleStep(system.activeStep);

      if (system.activeStep.completed) {
        this.resetStep(system.activeStep);
        this.activateNextStep(system);
      }
    }
  };

  /**
   * @param {wrect.ECS.Component.TitanEngine.TitanEngineStep} step
   */
  wrect.ECS.System.TitanEngine.CycleHandler.prototype.handleStep = function(step) {
    console.log('Handle step: ', step);
    console.log('Update step tick: ', step.updateTick, ' reduce by ', this.gameTime.getDelta());
    step.updateTick -= this.gameTime.getDelta();

    if (step.updateTick <= 0) {
      step.tickCount += 1;
      console.log('Ticket passed...');
      console.log(step.tickLength - step.tickCount, ' ticks left');
      if (step.tickCount === step.tickLength) {
        console.log('Step completed...');
        step.completed = true;
      }
    }
  };

  /**
   * @param {wrect.ECS.Component.TitanEngine.TitanEngineStep} step
   */
  wrect.ECS.System.TitanEngine.CycleHandler.prototype.resetStep = function(step) {
    step.tickCount = 0;
    step.completed = false;
    step.updateTick = step.updateTickLength;
  };

  /**
   * @param {wrect.ECS.Component.TitanEngine.TitanEngineSystem} system
   */
  wrect.ECS.System.TitanEngine.CycleHandler.prototype.activateNextStep = function(system) {
    system.activeStepIndex += 1;
    if (system.activeStepIndex > system.steps.length) {
      system.activeStepIndex = 0;
      debugger;
    }

    system.activeStep = system.steps[system.activeStepIndex];

    console.log('Activate step: ', system.activeStep);
  };

  wrect.ECS.System.TitanEngine.CycleHandler.prototype.handleAction = function() {

  };
}());