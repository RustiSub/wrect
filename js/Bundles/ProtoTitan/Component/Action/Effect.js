(function() {
  "use strict";

  wrect.ECS = wrect.ECS || {};
  wrect.ECS.Component = wrect.ECS.Component || {};
  wrect.ECS.Component.Action = wrect.ECS.Component.Action || {};

  wrect.ECS.Component.Action.Effect = function (options) {
    wrect.ECS.Component.BaseComponent.call(this);

    this.options = options || {};
  };

  wrect.ECS.Component.Action.Effect.prototype = Object.create( wrect.ECS.Component.BaseComponent.prototype );
  wrect.ECS.Component.Action.Effect.prototype.constructor = wrect.ECS.Component.Action.Effect;
  wrect.ECS.Component.Action.Effect.prototype.name = 'Effect';
}());
