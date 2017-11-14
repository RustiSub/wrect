(function() {
  "use strict";

  wrect.ECS = wrect.ECS || {};
  wrect.ECS.Component = wrect.ECS.Component || {};

  wrect.ECS.Component.GuiElement = function (options) {
    wrect.ECS.Component.BaseComponent.call(this);

    this.options = options || {};

    this.id = options.id || {};
    this.template = options.template || {};
    this.updateCallback = options.updateCallback || function() {};
    this.setupCallback = options.setupCallback || function() {};

    this.loaded = false;
    this.addedToScene = false;
    this.requiresUpdate = false;

    this.setup();
  };

  wrect.ECS.Component.GuiElement.prototype = Object.create( wrect.ECS.Component.BaseComponent.prototype );
  wrect.ECS.Component.GuiElement.prototype.constructor = wrect.ECS.Component.GuiElement;
  wrect.ECS.Component.GuiElement.prototype.name = 'GuiElement';

  wrect.ECS.Component.GuiElement.prototype.setup = function() {

    var self = this;
    var link = document.createElement('link');
    link.rel = 'import';
    link.href = this.template;
    link.id = this.id;

    link.onload = function() {
      self.loaded = true;
      self.requiresUpdate = true;
    };

    document.head.appendChild(link);
  };

  wrect.ECS.Component.GuiElement.prototype.forceUpdate = function() {
    this.requiresUpdate = true;
  }
}());
