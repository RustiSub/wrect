(function() {
  "use strict";

  wrect.ECS = wrect.ECS || {};
  wrect.ECS.Component = wrect.ECS.Component || {};
  wrect.ECS.Component.Input = wrect.ECS.Component.Input || {};

  wrect.ECS.Component.Input.Constants = {
    STATES : {
      OFF: 0,
      ON: 1
    }
  };

  wrect.ECS.Component.Input.ContextAction = function (options) {
    wrect.ECS.Component.BaseComponent.call(this);

    this.action = options.action;
    this.state = wrect.ECS.Component.Input.Constants.STATES.OFF;
  };

  wrect.ECS.Component.Input.ContextAction.prototype = Object.create( wrect.ECS.Component.BaseComponent.prototype );
  wrect.ECS.Component.Input.ContextAction.prototype.constructor = wrect.ECS.Component.Input.ContextAction;
  wrect.ECS.Component.Input.ContextAction.prototype.name = 'ContextAction';
}());
