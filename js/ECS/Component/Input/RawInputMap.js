(function() {
  "use strict";

  wrect.ECS = wrect.ECS || {};
  wrect.ECS.Component = wrect.ECS.Component || {};
  wrect.ECS.Component.Input = wrect.ECS.Component.Input || {};

  wrect.ECS.Component.Input.RawInputMap = function (options) {
    wrect.ECS.Component.BaseComponent.call(this);

    this.options = options || {};

    this.keys = this.options.keys || [];
  };

  wrect.ECS.Component.Input.RawInputMap.prototype = Object.create( wrect.ECS.Component.BaseComponent.prototype );
  wrect.ECS.Component.Input.RawInputMap.prototype.constructor = wrect.ECS.Component.Input.RawInputMap;
  wrect.ECS.Component.Input.RawInputMap.prototype.name = 'RawInputMap';
}());
