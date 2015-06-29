(function() {
  "use strict";

  wrect.ECS = wrect.ECS || {};
  wrect.ECS.Assemblage = wrect.ECS.Assemblage || {};
  wrect.Bundles.ProtoTitan.Steps = wrect.Bundles.ProtoTitan.Steps || {};

  var TitanEngine = wrect.Bundles.ProtoTitan.TitanEngine;
  var components = wrect.ECS.Component.TitanEngine;

  /**
   * @returns {Array}
   * @constructor
   */
  wrect.ECS.Assemblage.TitanEngineSteps = function (options) {
    this.eventManager = options.eventManager;
    this.steps = [];

    var steps = this.steps;

    steps.push(new components.TitanEngineStep((
    {
      name: TitanEngine.Constants.Steps.INPUT,
      updateTickLength: 1000,
      updateCallback: function (cycleHandler, system) {
        if (!this.action) {
          cycleHandler.moveActionFromQueue(system);
        }
      }
    })));

    steps.push(new components.TitanEngineStep(({name: TitanEngine.Constants.Steps.PROCESS, updateTickLength: 1000})));

    var eventManager = this.eventManager;
    var outputStep = new components.TitanEngineStep((
    {
      name: TitanEngine.Constants.Steps.OUTPUT,
      updateTickLength: 1000,
      initCallback: function(step) {
        eventManager.addListener('titan_control.move.time', function(data) {
          if (data.step && data.step === step) {
            data.step.backupUpdateTickLength = data.step.updateTickLength;
            data.step.updateTickLength = data.time;
            data.step.updateTick = data.time;
          }
        });
      },
      startCallback: function (action) {
        action.data.step = this;
        action.startCallback(action.data);
      },
      endCallback: function() {
        this.updateTickLength = this.backupUpdateTickLength;
        this.updateTick = this.updateTickLength;
      }
    }));

    steps.push(outputStep);
  };
}());
