(function() {
  "use strict";

  wrect.ECS = wrect.ECS || {};
  wrect.ECS.Component = wrect.ECS.Component || {};
  wrect.ECS.Component.TitanEngine = wrect.ECS.Component.TitanEngine || {};

  wrect.ECS.Component.TitanEngine.TitanEngineAction = function (options) {
    wrect.ECS.Component.BaseComponent.call(this);

    this.options = options || {};

    this.name = options.name;
    this.timer = options.timer || {};
    this.cost = options.cost || {};

    this.actionCallback = options.actionCallback || false;
  };

  wrect.ECS.Component.TitanEngine.TitanEngineAction.prototype = Object.create( wrect.ECS.Component.BaseComponent.prototype );
  wrect.ECS.Component.TitanEngine.TitanEngineAction.prototype.constructor = wrect.ECS.Component.TitanEngine.TitanEngineAction;
  wrect.ECS.Component.TitanEngine.TitanEngineAction.prototype.name = 'TitanEngineAction';
}());
