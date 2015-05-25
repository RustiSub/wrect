(function() {
  "use strict";

  wrect.ECS = wrect.ECS || {};
  wrect.ECS.Assemblage = wrect.ECS.Assemblage || {};

  var Entity = wrect.ECS.Entity;

  wrect.Bundles.ProtoTitan.TitanEngine = wrect.Bundles.ProtoTitan.TitanEngine || {};

  var TitanEngine = wrect.Bundles.ProtoTitan.TitanEngine;
  var components = wrect.ECS.Component.TitanEngine;

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


    this.entity.eventManager.addListener('titan_engine.system.reset', function(data) {
      var steps = document.querySelectorAll('#' + data.system.id + ' .progress-bar-container .progress-bar');

      for (var stepIndex = 0; stepIndex < steps.length; stepIndex++) {
        var step = steps[stepIndex];
        step.style.width = '0%';
      }
    });

    this.entity.eventManager.addListener('titan_engine.tick.update', function(data) {
      var step = document.querySelector('.titan-engine-gui #' + data.step.id);
      step.querySelector('.progress-bar-container .progress-bar').style.width =  Math.round(data.percentage) + '%';
    });

    this.entity.eventManager.addListener('titan_engine.tick', function(data) {
      //console.log(data.step.name);
    });

    var steps = [];
    steps.push(new components.TitanEngineStep(({name: TitanEngine.Constants.Steps.INPUT})));
    steps.push(new components.TitanEngineStep(({name: TitanEngine.Constants.Steps.PROCESS})));
    steps.push(new components.TitanEngineStep(({name: TitanEngine.Constants.Steps.OUTPUT})));

    var systemsCollection = new components.TitanEngineSystemCollection({});

    var movementSystem = new components.TitanEngineSystem({name: TitanEngine.Constants.Systems.MOVEMENT});
    movementSystem.actions = [
      new components.TitanEngineAction({name: 'Forward'}),
      new components.TitanEngineAction({name: 'Backward'})
    ];
    movementSystem.steps = steps;

    systemsCollection.addSystem(movementSystem);
    this.entity.addComponent(systemsCollection);

    var guiElement = new wrect.ECS.Component.Gui.GuiElement({
      html: ''
    });

    function createGui(systemsCollection) {
      var shadow = document.querySelector('#guiContainer');//.createShadowRoot();

      var guiContent = document.querySelector('#titan-engine-gui').content;
      var systemContent = document.querySelector('#titan-engine-system').content;
      var stepContent = document.querySelector('#titan-engine-step').content;

      shadow.appendChild(guiContent);

      var guiRoot = document.querySelector('.titan-engine-gui');

      var systems = systemsCollection.systems;
      for (var systemIndex in systems) if (systems.hasOwnProperty(systemIndex)) {
        var system = systems[systemIndex];
        var id = (+new Date()).toString(16) + (Math.random() * 100000000 | 0).toString(16);
        var clonedSystemContent = document.importNode(systemContent, true);
        clonedSystemContent.querySelector('.system-title-container .system-title').innerHTML = system.name;

        guiRoot.appendChild(clonedSystemContent);

        var systemRoot = document.querySelector('.titan-engine-system');
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
          systemRoot.appendChild(clonedStepContent);
        }
      }
    }

    createGui(systemsCollection);
  };
}());
