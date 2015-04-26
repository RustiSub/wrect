(function() {
  "use strict";

  wrect.ECS = wrect.ECS || {};
  wrect.ECS.Component = wrect.ECS.Component || {};
  wrect.ECS.Component.Input = wrect.ECS.Component.Input || {};

  wrect.ECS.Component.Input.ControlMap = function (options) {
    wrect.ECS.Component.BaseComponent.call(this);

    this.options = options || {};

    this.controls = this.options.controls || {};
    this.actions = this.options.controls || [];
  };

  wrect.ECS.Component.Input.ControlMap.prototype = Object.create( wrect.ECS.Component.BaseComponent.prototype );
  wrect.ECS.Component.Input.ControlMap.prototype.constructor = wrect.ECS.Component.Input.ControlMap;
  wrect.ECS.Component.Input.ControlMap.prototype.name = 'ControlMap';
}());
