(function() {
  "use strict";

  wrect.ECS = wrect.ECS || {};
  wrect.ECS.Component = wrect.ECS.Component || {};
  wrect.ECS.Component.Input = wrect.ECS.Component.Input || {};

  wrect.ECS.Component.Input.TitanEngineStep = function (options) {
    wrect.ECS.Component.BaseComponent.call(this);

    this.options = options || {};

    this.name = options.name;
    this.timer = options.timer || {};
    this.confirm = options.confirm || {
      start: false,
      true: false
    };
    this.weight = options.weight || 0;
  };

  wrect.ECS.Component.Input.TitanEngineStep.prototype = Object.create( wrect.ECS.Component.BaseComponent.prototype );
  wrect.ECS.Component.Input.TitanEngineStep.prototype.constructor = wrect.ECS.Component.Input.TitanEngineStep;
  wrect.ECS.Component.Input.TitanEngineStep.prototype.name = 'TitanEngineStep';
}());
