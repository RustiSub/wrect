(function() {
  "use strict";

  wrect.ECS = wrect.ECS || {};
  wrect.ECS.Component = wrect.ECS.Component || {};

  wrect.ECS.Component.BaseComponent = function () {
    this.awesome = true;
  };

  wrect.ECS.Component.BaseComponent.prototype.name = 'BaseComponent';
}());
