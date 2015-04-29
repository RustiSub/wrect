(function() {
  "use strict";

  wrect.ECS = wrect.ECS || {};
  wrect.ECS.Component = wrect.ECS.Component || {};
  wrect.ECS.Component.Input = wrect.ECS.Component.Input || {};

  wrect.ECS.Component.Input.TitanEngineAction = function (options) {
    wrect.ECS.Component.BaseComponent.call(this);

    this.options = options || {};

    this.name = options.name;
    this.timer = options.timer || {};
    this.cost = options.cost || {};
  };

  wrect.ECS.Component.Input.TitanEngineAction.prototype = Object.create( wrect.ECS.Component.BaseComponent.prototype );
  wrect.ECS.Component.Input.TitanEngineAction.prototype.constructor = wrect.ECS.Component.Input.TitanEngineAction;
  wrect.ECS.Component.Input.TitanEngineAction.prototype.name = 'TitanEngineAction';
}());
