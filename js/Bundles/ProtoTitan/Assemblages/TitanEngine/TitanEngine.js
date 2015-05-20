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

    var systems = new components.TitanEngineSystemCollection({});

    var movementSystem = new components.TitanEngineSystem({name: TitanEngine.Constants.Systems.MOVEMENT});
    movementSystem.actions = [
      new components.TitanEngineAction({name: 'Forward'}),
      new components.TitanEngineAction({name: 'Backward'})
    ];
    movementSystem.steps = steps;

    systems.addSystem(movementSystem);
    this.entity.addComponent(systems);

    var guiElement = new wrect.ECS.Component.Gui.GuiElement({
      html: '<div class="titan-engine-gui"></div>'
    });

    var guiContainer = document.getElementById('guiContainer');
    guiContainer.innerHTML = guiElement.html;

    this.entity.addComponent(guiElement);
  };
}());
