(function() {
  "use strict";

  wrect.ECS = wrect.ECS || {};
  wrect.ECS.Component = wrect.ECS.Component || {};
  wrect.ECS.Component.TitanEngine = wrect.ECS.Component.TitanEngine || {};

  wrect.ECS.Component.TitanEngine.TitanEngineStep = function (options) {
    wrect.ECS.Component.BaseComponent.call(this);

    this.options = options || {};

    this.name = options.name;
    this.timer = options.timer || {};
    this.confirm = options.confirm || {
      start: false,
      true: false
    };
    this.weight = options.weight || 0;
    this.updateTickLength = options.updateTickLength || 1000;
    this.updateTick = this.updateTickLength;
    this.tickCount = 0;
    this.tickLength = options.tickLength || 1;
    this.completed = false;

    this.action = false;
  };

  wrect.ECS.Component.TitanEngine.TitanEngineStep.prototype = Object.create( wrect.ECS.Component.BaseComponent.prototype );
  wrect.ECS.Component.TitanEngine.TitanEngineStep.prototype.constructor = wrect.ECS.Component.TitanEngine.TitanEngineStep;
  wrect.ECS.Component.TitanEngine.TitanEngineStep.prototype.name = 'TitanEngineStep';
}());
