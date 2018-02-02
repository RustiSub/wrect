(function() {
  "use strict";

  wrect.ECS = wrect.ECS || {};
  wrect.ECS.Component = wrect.ECS.Component || {};
  wrect.ECS.Component.Action = wrect.ECS.Component.Action || {};

  wrect.ECS.Component.Action.Condition = function (options) {
    wrect.ECS.Component.BaseComponent.call(this);

    this.options = options || {};
  };

  wrect.ECS.Component.Action.Condition.prototype = Object.create( wrect.ECS.Component.BaseComponent.prototype );
  wrect.ECS.Component.Action.Condition.prototype.constructor = wrect.ECS.Component.Action.Condition;
  wrect.ECS.Component.Action.Condition.prototype.name = 'Condition';
}());
