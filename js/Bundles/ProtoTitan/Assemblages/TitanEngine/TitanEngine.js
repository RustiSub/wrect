(function() {
  "use strict";

  wrect.ECS = wrect.ECS || {};
  wrect.ECS.Assemblage = wrect.ECS.Assemblage || {};

  var Entity = wrect.ECS.Entity;

  wrect.Bundles.ProtoTitan.TitanEngine = wrect.Bundles.ProtoTitan.TitanEngine || {};

  var TitanEngine = wrect.Bundles.ProtoTitan.TitanEngine;
  var components = wrect.ECS.Component.TitanEngine;
  var Vector3 = wrect.Physics.Vector3;

  TitanEngine.Constants = TitanEngine.Constants || {};
  TitanEngine.Constants = TitanEngine.TitanEngine || {};
  TitanEngine.Constants = {
    Systems : {
      MOVEMENT: 'MOVEMENT',
      OFFENSIVE: 'OFFENSIVE',
      DEFENSIVE: 'DEFENSIVE'
    },
    Steps: {
      INPUT: 'INPUT',
      PROCESS: 'PROCESS',
      OUTPUT: 'OUTPUT'
    }
  };

  /**
   * @param options
   * @returns {wrect.ECS.Entity|wrect.ECS.Entity}
   * @constructor
   */
  wrect.ECS.Assemblage.TitanEngine = function (options) {
    this.entity = new Entity({eventManager: options.eventManager});

    var eventManager = this.entity.eventManager;

    this.entity.eventManager.addListener('titan_engine.system.reset', function(data) {
      var steps = document.querySelectorAll('#' + data.system.id + ' .progress-bar-container .progress-bar');

      for (var stepIndex = 0; stepIndex < steps.length; stepIndex++) {
        var step = steps[stepIndex];
        step.style.width = '0%';
      }
    });

    this.entity.eventManager.addListener('titan_engine.tick.update', function(data) {
      var step = document.querySelector('.titan-engine-gui #' + data.step.id);
      var percentage = Math.round(data.percentage) + '%';
      step.querySelector('.progress-bar-container .progress-bar').style.width = percentage;
      step.querySelector('.progress-bar-container .progress-bar').innerHTML = percentage;
    });

    this.entity.eventManager.addListener('titan_engine.tick', function(data) {
      //console.log(data.step.name);
    });

    var actionContent = document.querySelector('#titan-engine-action').content;

    this.entity.eventManager.addListener('titan_engine.queue.add', function(data) {
      var system = document.querySelector('#' + data.system.id);
      var action = data.action;
      var clonedActionContent = document.importNode(actionContent, true);
      var id = (+new Date()).toString(16) + (Math.random() * 100000000 | 0).toString(16);
      action.id = 'action-' + system.name + '-' + action.name + '-' + id;

      clonedActionContent.querySelector('.action').id = action.id;
      clonedActionContent.querySelector('.action-title').innerHTML = data.action.name;

      system.querySelector('.queue-action-container').appendChild(clonedActionContent);
    });

    this.entity.eventManager.addListener('titan_engine.queue.move', function(data) {
      var system = document.querySelector('#' + data.system.id);
      var toStep = system.querySelector('#' + data.toStep.id);
      var action = system.querySelector('#' + data.action.id);

      if (action) {
        action.remove();

        if (toStep) {
          toStep.appendChild(action);
        }
      }

      //var action = system.querySelector('#' + data.action.id);
      //
      //action.remove();
      //step.appendChild(action);
    });

    var steps = [];
    steps.push(new components.TitanEngineStep(({name: TitanEngine.Constants.Steps.INPUT, updateTickLength: 1000})));
    steps.push(new components.TitanEngineStep(({name: TitanEngine.Constants.Steps.PROCESS, updateTickLength: 1000})));
    steps.push(new components.TitanEngineStep((
    {
      name: TitanEngine.Constants.Steps.OUTPUT,
      updateTickLength: 1000,
      endCallback: function(action) {
        action.actionCallback(action.data);
      }
    })));

    var systemsCollection = new components.TitanEngineSystemCollection({});

    var movementSystem = new components.TitanEngineSystem({name: TitanEngine.Constants.Systems.MOVEMENT, eventManager: eventManager});
    movementSystem.actions = [
      new components.TitanEngineAction(
        {
          name: 'Forward',
          actionCallback: function(data) {
            eventManager.trigger('titan_control.move', data);
          }
        }
      ),
      new components.TitanEngineAction({name: 'Backward'})
    ];
    movementSystem.steps = steps;

    systemsCollection.addSystem(movementSystem);

    //var offensiveSystem = new components.TitanEngineSystem({name: TitanEngine.Constants.Systems.OFFENSIVE});
    //offensiveSystem.steps = steps;
    //systemsCollection.addSystem(offensiveSystem);

    this.entity.addComponent(systemsCollection);

    var guiElement = new wrect.ECS.Component.Gui.GuiElement({
      html: ''
    });

    function createGui(systemsCollection) {
      var shadow = document.querySelector('#guiContainer');//.createShadowRoot();

      var guiContent = document.querySelector('#titan-engine-gui').content;
      var systemContent = document.querySelector('#titan-engine-system').content;
      var queueContent = document.querySelector('#titan-engine-queue').content;
      var stepContent = document.querySelector('#titan-engine-step').content;

      shadow.appendChild(guiContent);

      var guiRoot = document.querySelector('.titan-engine-gui');

      var systems = systemsCollection.systems;
      for (var systemIndex in systems) if (systems.hasOwnProperty(systemIndex)) {
        var system = systems[systemIndex];
        var id = (+new Date()).toString(16) + (Math.random() * 100000000 | 0).toString(16);
        var clonedSystemContent = document.importNode(systemContent, true);
        var clonedQueueContent = document.importNode(queueContent, true);
        clonedSystemContent.querySelector('.system-title-container .system-title').innerHTML = system.name;

        guiRoot.appendChild(clonedSystemContent);

        var systemRoot = document.querySelector('.titan-engine-system');

        systemRoot.appendChild(clonedQueueContent);

        system.id = 'system-' + system.name + '-' + id;
        systemRoot.id = system.id;
        var steps = system.steps;

        for (var stepIndex in steps) if (steps.hasOwnProperty(stepIndex)) {
          var step = steps[stepIndex];
          step.id = 'step-' + step.name + '-' + id;
          var clonedStepContent = document.importNode(stepContent, true);

          clonedStepContent.querySelector('.titan-engine-step').id = step.id;
          clonedStepContent.querySelector('.step-title-container .step-title').innerHTML = step.name;
          clonedStepContent.querySelector('.progress-bar-container .progress-bar').style.width = '0%';
          clonedStepContent.querySelector('.progress-bar-container .progress-bar .progress-bar-label').innerHTML = '0%';
          systemRoot.appendChild(clonedStepContent);
        }
      }
    }

    createGui(systemsCollection);

    this.setupActions();
  };

  var actionConstants = wrect.Bundles.ProtoTitan.TitanControl.Constants.Actions;

  wrect.ECS.Assemblage.TitanEngine.prototype.setupActions = function() {
    var entity = this.entity;
    var actions = new wrect.ECS.Component.ActionCollection({});
    var actionConstants = wrect.Bundles.ProtoTitan.TitanControl.Constants.Actions;
    var eventManager = entity.eventManager;

    actions.addAction(new wrect.ECS.Component.Action({
      speed: 0,
      initCallback: function () {
        var action = this;
        eventManager.addListener(actionConstants.ENGINE.QUEUE.ADD, function (data) {
          var systems = entity.components.TitanEngineSystemCollection.systems;
          var movementSystem = systems[0];
          var action = movementSystem.actions[0];
          data.coord = new Vector3(data.coord);
          action.data = data;

          movementSystem.queueAction(action);
        });
      },
      tickCallback: function () {},
      updateCallback: function () {},
      stopCallback: function() {
        return true;
      }
    }));

    actions.addAction(new wrect.ECS.Component.Action({
      speed: 0,
      initCallback: function () {
        var action = this;
        eventManager.addListener('titan_control.tile_changed', function (data) {
          eventManager.trigger(actionConstants.ENGINE.QUEUE.ADD, data);
        });
      },
      tickCallback: function (data) {},
      updateCallback: function (updatePercentage, data) {},
      stopCallback: function() {
        return true;
      }
    }));

    entity.addComponent(actions);
  };
}());
