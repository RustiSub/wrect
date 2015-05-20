(function() {
  "use strict";

  wrect.ECS = wrect.ECS || {};
  wrect.ECS.Component = wrect.ECS.Component || {};
  wrect.ECS.Component.Gui = wrect.ECS.Component.Gui || {};

  wrect.ECS.Component.Gui.GuiElement = function (options) {
    wrect.ECS.Component.BaseComponent.call(this);

    this.options = options || {};

    this.html = options.html || '';
  };

  wrect.ECS.Component.Gui.GuiElement.prototype = Object.create( wrect.ECS.Component.BaseComponent.prototype );
  wrect.ECS.Component.Gui.GuiElement.prototype.constructor = wrect.ECS.Component.Gui.GuiElement;
  wrect.ECS.Component.Gui.GuiElement.prototype.name = 'GuiElement';
}());
