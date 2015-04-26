(function() {
  "use strict";

  wrect.ECS = wrect.ECS || {};
  wrect.ECS.Component = wrect.ECS.Component || {};
  wrect.ECS.Component.Input = wrect.ECS.Component.Input || {};

  wrect.ECS.Component.Input.ContextMap = function (options) {
    wrect.ECS.Component.BaseComponent.call(this);

    this.options = options || {};

    this.actions = this.options.actions || {};
    this.states = this.options.states || {};
    this.ranges = this.options.ranges || {};
  };

  wrect.ECS.Component.Input.ContextMap.prototype = Object.create( wrect.ECS.Component.BaseComponent.prototype );
  wrect.ECS.Component.Input.ContextMap.prototype.constructor = wrect.ECS.Component.Input.ContextMap;
  wrect.ECS.Component.Input.ContextMap.prototype.name = 'ContextMap';
}());
