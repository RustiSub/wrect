(function() {
  "use strict";

  wrect.ECS = wrect.ECS || {};
  wrect.ECS.Component = wrect.ECS.Component || {};
  wrect.ECS.Component.TitanEngine = wrect.ECS.Component.TitanEngine || {};

  wrect.ECS.Component.TitanEngine.TitanEngineSystem = function (options) {
    wrect.ECS.Component.BaseComponent.call(this);

    this.options = options || {};

    this.name = options.name;
    this.actions = options.actions;
    this.steps = options.steps || [];
    this.activeStepIndex = -1;
    this.activeStep = false;
  };

  wrect.ECS.Component.TitanEngine.TitanEngineSystem.prototype = Object.create( wrect.ECS.Component.BaseComponent.prototype );
  wrect.ECS.Component.TitanEngine.TitanEngineSystem.prototype.constructor = wrect.ECS.Component.TitanEngine.TitanEngineSystem;
  wrect.ECS.Component.TitanEngine.TitanEngineSystem.prototype.name = 'TitanEngineSystem';
}());
