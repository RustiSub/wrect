(function() {
  "use strict";

  wrect.ECS = wrect.ECS || {};
  wrect.ECS.Component = wrect.ECS.Component || {};
  wrect.ECS.Component.TitanEngine = wrect.ECS.Component.TitanEngine || {};

  wrect.ECS.Component.TitanEngine.TitanEngineSystem = function (options) {
    wrect.ECS.Component.BaseComponent.call(this);

    this.options = options || {};
    this.eventManager = options.eventManager;
    this.name = options.name;
    this.actions = options.actions;
    this.steps = options.steps || [];
    this.activeStepIndex = -1;
    this.activeStep = false;

    this.actionQueue = [];
  };

  wrect.ECS.Component.TitanEngine.TitanEngineSystem.prototype = Object.create( wrect.ECS.Component.BaseComponent.prototype );
  wrect.ECS.Component.TitanEngine.TitanEngineSystem.prototype.constructor = wrect.ECS.Component.TitanEngine.TitanEngineSystem;
  wrect.ECS.Component.TitanEngine.TitanEngineSystem.prototype.name = 'TitanEngineSystem';

  /**
   * @returns {wrect.ECS.Component.TitanEngineAction|boolean}
   */
  wrect.ECS.Component.TitanEngine.TitanEngineSystem.prototype.getNextAction = function() {
    var action = this.actionQueue.shift();

    return action ? action : false;
  };

  /**
   * @param {wrect.ECS.Component.TitanEngineAction} action
   */
  wrect.ECS.Component.TitanEngine.TitanEngineSystem.prototype.queueAction = function(action) {
    this.actionQueue.push(action);

    this.eventManager.trigger('titan_engine.queue.add', {
      system: this,
      action: action
    });
  };


  /**
   * @param {string} actionCode
   * @returns {wrect.ECS.Component.TitanEngine.TitanEngineAction|boolean}
   */
  wrect.ECS.Component.TitanEngine.TitanEngineSystem.prototype.getAction = function(actionCode) {
    for(var s = 0; s < this.actions.length; s++) {
      var action = this.actions[s];

      if (action.name === actionCode) {
        return action;
      }
    }

    return false;
  };
}());
