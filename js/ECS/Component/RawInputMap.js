(function() {
  "use strict";

  wrect.ECS = wrect.ECS || {};
  wrect.ECS.Component = wrect.ECS.Component || {};

  wrect.ECS.Component.RawInputMap = function (options) {
    wrect.ECS.Component.BaseComponent.call(this);

    this.options = options || {};

    this.keys = this.options.inputMap || [];
  };

  wrect.ECS.Component.RawInputMap.prototype = Object.create( wrect.ECS.Component.BaseComponent.prototype );
  wrect.ECS.Component.RawInputMap.prototype.constructor = wrect.ECS.Component.RawInputMap;
  wrect.ECS.Component.RawInputMap.prototype.name = 'RawInputMap';
}());
