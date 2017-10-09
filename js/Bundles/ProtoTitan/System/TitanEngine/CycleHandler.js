(function() {
  "use strict";

  wrect.ECS = wrect.ECS || {};
  wrect.ECS.System = wrect.ECS.System || {};
  wrect.ECS.System.TitanEngine = wrect.ECS.System.TitanEngine || {};

  var Vector = wrect.Physics.Vector;

  wrect.ECS.System.TitanEngine.CycleHandler = function (options) {
    wrect.ECS.System.BaseSystem.call(this, options);

    this.options = options || {};
    this.eventManager = options.eventManager;
    this.gameTime = options.gameTime;
  };

  wrect.ECS.System.TitanEngine.CycleHandler.prototype = Object.create( wrect.ECS.System.BaseSystem.prototype );
  wrect.ECS.System.TitanEngine.CycleHandler.prototype.constructor = wrect.ECS.System.TitanEngine.CycleHandler;

  wrect.ECS.System.TitanEngine.CycleHandler.prototype.name = 'CycleHandler';

  wrect.ECS.System.TitanEngine.CycleHandler.prototype.checkDependencies = function(entity) {
    return entity.components.TitanEngineSystemCollection ? true : false;
  };

  wrect.ECS.System.TitanEngine.CycleHandler.prototype.perform = function(entity) {
    //console.log('Polling all systems...');
    var systems = entity.components.TitanEngineSystemCollection.systems;
    for(var systemIndex in systems) if (systems.hasOwnProperty(systemIndex)) {
      var system = systems[systemIndex];

      this.handleSystem(system);
    }
  };

  wrect.ECS.System.TitanEngine.CycleHandler.prototype.handleSystem = function(system) {
    if (!system.activeStep) {
      this.activateNextStep(system);
    }

    if (system.activeStep) {
      this.handleStep(system.activeStep);

      if (system.activeStep.updateCallback) {
        system.activeStep.updateCallback(this, system);
      }

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
    step.updateTick -= this.gameTime.getDelta();

    var percentage = (step.updateTickLength - step.updateTick) / step.updateTickLength * 100;
    percentage = percentage < 100 ? percentage : 100;
    this.eventManager.trigger('titan_engine.tick.update', {
      step: step,
      percentage: percentage
    });

    step.completed = true;

    if (step.action && step.endCallback) {
      step.endCallback(step.action);
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

    if (system.activeStepIndex >= system.steps.length) {
      if (system.steps[system.activeStepIndex - 1].action) {
        var lastAction = system.steps[system.activeStepIndex - 1].action;

        this.eventManager.trigger('titan_engine.queue.end', {
          system: system,
          action: lastAction
        });

        system.steps[system.activeStepIndex - 1].action = false;
      }

      this.eventManager.trigger('titan_engine.system.reset', {
        system: system
      });

      system.activeStepIndex = 0;
    }

    if (system.activeStepIndex === 0) {
      this.moveActionFromQueue(system);
    } else if (system.activeStepIndex >= 0 && system.activeStepIndex < system.steps.length) {
      this.moveActionToNextStep(system);
    }

    system.activeStep = system.steps[system.activeStepIndex];

    if (system.activeStep && system.activeStep.action && system.activeStep.startCallback) {
      system.activeStep.startCallback(system.activeStep.action);
    }
  };

  /**
   * Get Action from the queue and assign it to the given step
   *
   * @param {wrect.ECS.Component.TitanEngine.TitanEngineSystem} system
   * @param {wrect.ECS.Component.TitanEngine.TitanEngineStep} currentStep
   */
  wrect.ECS.System.TitanEngine.CycleHandler.prototype.getActionFromQueue = function(system, currentStep) {
    var action = system.getNextAction();
    currentStep.action = action;

    return currentStep.action;
  };

  /**
   * Move Action from one step to the next, if given
   *
   * @param {wrect.ECS.Component.TitanEngine.TitanEngineStep} currentStep
   * @param {wrect.ECS.Component.TitanEngine.TitanEngineStep} nextStep
   */
  wrect.ECS.System.TitanEngine.CycleHandler.prototype.moveAction = function(currentStep, nextStep) {
    if (currentStep && currentStep.action) {
      nextStep.action = currentStep.action;
      currentStep.action = false;
    }

    return nextStep.action;
  };

  wrect.ECS.System.TitanEngine.CycleHandler.prototype.handleAction = function() {

  };

  wrect.ECS.System.TitanEngine.CycleHandler.prototype.moveActionFromQueue = function(system) {
    var queuedAction = this.getActionFromQueue(system, system.steps[system.activeStepIndex]);

    this.eventManager.trigger('titan_engine.queue.move', {
      system: system,
      toStep: system.steps[system.activeStepIndex],
      action: queuedAction
    });
  };

  wrect.ECS.System.TitanEngine.CycleHandler.prototype.moveActionToNextStep = function(system) {
    var movedAction = this.moveAction(system.steps[system.activeStepIndex - 1], system.steps[system.activeStepIndex]);

    if (movedAction) {
      this.eventManager.trigger('titan_engine.queue.move', {
        system: system,
        fromStep: system.steps[system.activeStepIndex - 1],
        toStep: system.steps[system.activeStepIndex],
        action: movedAction
      });
    }
  }
}());
