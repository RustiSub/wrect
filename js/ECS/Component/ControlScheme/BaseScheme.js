(function() {
  "use strict";

  wrect.ECS = wrect.ECS || {};
  wrect.ECS.Component = wrect.ECS.Component || {};
  wrect.ECS.Component.ControlScheme = wrect.ECS.Component.ControlScheme || {};

  wrect.ECS.Component.ControlScheme.BaseScheme = function (options) {
    wrect.ECS.Component.BaseComponent.call(this);

    options = options || {};

    this.right = options.right || function() {};
  };

  wrect.ECS.Component.ControlScheme.BaseScheme.prototype = Object.create( wrect.ECS.Component.BaseComponent.prototype );
  wrect.ECS.Component.ControlScheme.BaseScheme.prototype.constructor = wrect.ECS.Component.BaseScheme;
  wrect.ECS.Component.ControlScheme.BaseScheme.prototype.name = 'ControlScheme';
}());
