(function() {
  "use strict";

  wrect.ECS = wrect.ECS || {};
  wrect.ECS.Component = wrect.ECS.Component || {};

  wrect.ECS.Component.Control = function (options) {
    wrect.ECS.Component.BaseComponent.call(this);

    options = options || {};

  };

  wrect.ECS.Component.Control.prototype = Object.create( wrect.ECS.Component.BaseComponent.prototype );
  wrect.ECS.Component.Control.prototype.constructor = wrect.ECS.Component.Control;
  wrect.ECS.Component.Control.prototype.name = 'Control';
}());
