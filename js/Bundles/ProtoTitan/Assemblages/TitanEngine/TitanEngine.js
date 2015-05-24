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
    //this.entity.addComponent(systemsCollection);

    var guiElement = new wrect.ECS.Component.Gui.GuiElement({
      html: ''
    });

    function createGui(systemsCollection) {
      var root = document.querySelector('#guiContainer');
      var shadow = root.createShadowRoot();
      var template = document.querySelector('#guiContainerTemplate');

      var systems = systemsCollection.systems;
      for (var systemIndex in systems) if (systems.hasOwnProperty(systemIndex)) {
        var system = systems[systemIndex];
        var id = (+new Date()).toString(16) + (Math.random() * 100000000 | 0).toString(16);
        root.innerHTML += '<div class="titan-engine-system" id="system-' + id + '" >' + system.name + '</div>';
        var steps = system.steps;
        for (var stepIndex in steps) if (steps.hasOwnProperty(stepIndex)) {
          var step = steps[stepIndex];
          console.log(step);
        //<div class="progress-bar blue stripes">
        //  <span style="width: 40%"></span>
        //  </div>
          root.querySelector('#system-' + id).innerHTML += '<div class="titan-engine-step" id="step-' + id + '" >' + step.name + '</div>';
        //  root.querySelector('#system-' + id).innerHTML += '<div class="progress-bar blue stripes"><span style="width: 40%"></span></div>';
        }
      }

      var clone = document.importNode(template.content, true);
      shadow.appendChild(clone);
//  document.querySelector('#nameTag').textContent = 'Shellie';
      //var guiContainer = document.getElementById('guiContainer');
      //guiContainer.innerHTML = guiElement.html;
      //this.entity.addComponent(guiElement);
    }

    createGui(systemsCollection);
  };
}());
