(function() {
  "use strict";

  wrect.ECS = wrect.ECS || {};
  wrect.ECS.Component = wrect.ECS.Component || {};

  wrect.ECS.Component.GuiElement = function (options) {
    wrect.ECS.Component.BaseComponent.call(this);

    this.options = options || {};
  };

  wrect.ECS.Component.GuiElement.prototype = Object.create( wrect.ECS.Component.BaseComponent.prototype );
  wrect.ECS.Component.GuiElement.prototype.constructor = wrect.ECS.Component.GuiElement;
  wrect.ECS.Component.GuiElement.prototype.name = 'GuiElement';
}());
