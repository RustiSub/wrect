(function() {
  "use strict";

  wrect.ECS = wrect.ECS || {};
  wrect.ECS.Component = wrect.ECS.Component || {};

  wrect.ECS.Component.ContextMap = function (options) {
    wrect.ECS.Component.BaseComponent.call(this);

    this.options = options || {};

    this.inputMap = this.options.inputMap || [];
  };

  wrect.ECS.Component.ContextMap.prototype = Object.create( wrect.ECS.Component.BaseComponent.prototype );
  wrect.ECS.Component.ContextMap.prototype.constructor = wrect.ECS.Component.ContextMap;
  wrect.ECS.Component.ContextMap.prototype.name = 'ContextMap';
}());
