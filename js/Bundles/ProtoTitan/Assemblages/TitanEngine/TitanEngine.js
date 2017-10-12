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

  var titanControl = wrect.Bundles.ProtoTitan.TitanControl;

  /**
   * @param options
   * @returns {wrect.ECS.Entity|wrect.ECS.Entity}
   * @constructor
   */
  wrect.ECS.Assemblage.TitanEngine = function (options) {
    this.entity = new Entity({eventManager: options.eventManager});

    this.registerListeners();
    this.buildEngine();
    this.setupActions();
  };

  wrect.ECS.Assemblage.TitanEngine.prototype.buildEngine = function() {
    var eventManager = this.entity.eventManager;
    var titanEngineSystems = new wrect.ECS.Assemblage.TitanEngineSystems(
      {
        eventManager: eventManager
      }
    );

    this.entity.addComponent(titanEngineSystems.systemsCollection);

    this.createGui(titanEngineSystems.systemsCollection);
  };

  wrect.ECS.Assemblage.TitanEngine.prototype.createGui = function(systemsCollection) {
    var shadow = document.querySelector('#guiContainer');

    var guiContent = document.querySelector('#titan-engine-gui').content;
    var systemContent = document.querySelector('#titan-engine-system').content;
    var queueContent = document.querySelector('#titan-engine-queue').content;
    var stepContent = document.querySelector('#titan-engine-step').content;
    var toolBoxContent = document.querySelector('#titan-engine-action-toolbox').content;
    var toolBoxActionContent = document.querySelector('#titan-engine-action-toolbox-action').content;

    shadow.appendChild(guiContent);

    var guiRoot = document.querySelector('.titan-engine-gui');

    var systems = systemsCollection.systems;
    for (var systemIndex in systems) if (systems.hasOwnProperty(systemIndex)) {
      var system = systems[systemIndex];
      var id = (+new Date()).toString(16) + (Math.random() * 100000000 | 0).toString(16);
      var clonedSystemContent = document.importNode(systemContent, true);
      var systemRoot = clonedSystemContent.querySelector('.titan-engine-system');

      clonedSystemContent.querySelector('.system-title-container .system-title').innerHTML = system.name;
      guiRoot.appendChild(clonedSystemContent);

      var clonedQueueContent = document.importNode(queueContent, true);

      for (var actionIndex in system.actions) {
        var action = system.actions[actionIndex];
        var clonedToolBoxContent = document.importNode(toolBoxContent, true);
        var clonedToolBoxActionContent = document.importNode(toolBoxActionContent, true);

        clonedToolBoxActionContent.querySelector('.toolbox-action').innerHTML = action.name;
        clonedToolBoxContent.querySelector('.action-toolbox-container').appendChild(clonedToolBoxActionContent);
        clonedQueueContent.querySelector('.queue-action-container').appendChild(clonedToolBoxContent);
      }

      systemRoot.appendChild(document.importNode(clonedQueueContent, true));

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
  };

  wrect.ECS.Assemblage.TitanEngine.prototype.setupActions = function() {
    var entity = this.entity;
    var actions = new wrect.ECS.Component.ActionCollection({});
    var actionConstants = wrect.Bundles.ProtoTitan.TitanControl.Constants.Actions;
    var eventManager = entity.eventManager;

    actions.addAction(new wrect.ECS.Component.Action({
      speed: 0,
      initCallback: function () {
        eventManager.addListener(actionConstants.ENGINE.QUEUE.ADD, function (data) {
            var systemsCollection = entity.components.TitanEngineSystemCollection;
            var system = systemsCollection.getSystem(data.systemCode);

            var action = new components.TitanEngineAction(system.getAction(data.actionCode).options);
            data.coord = new Vector3(data.coord);
            action.data = data;

            system.queueAction(action);
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
          if (data.actionCode === titanControl.Constants.Ranges.CURSOR.MOVE) {
            data.systemCode = TitanEngine.Constants.Systems.MOVEMENT;
            eventManager.trigger(actionConstants.ENGINE.QUEUE.ADD, data);
          }
        });
      },
      tickCallback: function (data) {},
      updateCallback: function (updatePercentage, data) {},
      stopCallback: function() {
        return true;
      }
    }));

    actions.addAction(new wrect.ECS.Component.Action({
      speed: 0,
      initCallback: function () {
        eventManager.addListener('titan_control.tile_changed', function (data) {
          if (data.actionCode === titanControl.Constants.Ranges.CURSOR.ATTACK) {
            data.systemCode = TitanEngine.Constants.Systems.OFFENSIVE;
            eventManager.trigger(actionConstants.ENGINE.QUEUE.ADD, data);
          }
        });
      }
    }));

    entity.addComponent(actions);
  };

  wrect.ECS.Assemblage.TitanEngine.prototype.registerListeners = function registerListeners() {
    var actionContent = document.querySelector('#titan-engine-action').content;

    this.entity.eventManager.addListener('titan_engine.queue.add', function (data) {
      var systemContent = document.querySelector('#' + data.system.id);
      var action = data.action;
      var clonedActionContent = document.importNode(actionContent, true);
      var id = (+new Date()).toString(16) + (Math.random() * 100000000 | 0).toString(16);
      action.id = 'action-' + data.system.name + '-' + action.name + '-' + id;

      clonedActionContent.querySelector('.action').id = action.id;
      clonedActionContent.querySelector('.action-title').innerHTML = data.action.name;

      systemContent.querySelector('.queue-action-container').appendChild(clonedActionContent);
    });

    this.entity.eventManager.addListener('titan_engine.queue.move', function (data) {
      var system = document.querySelector('#' + data.system.id);

      var toStep = system.querySelector('#' + data.toStep.id);
      var action = system.querySelector('#' + data.action.id);

      if (action) {
        action.remove();

        if (toStep) {
          toStep.appendChild(action);
        }
      }
    });

    this.entity.eventManager.addListener('titan_engine.queue.end', function (data) {
      if (data.action) {
        var system = document.querySelector('#' + data.system.id);
        var action = system.querySelector('#' + data.action.id);

        action.remove();
      }
    });
  }
}());
