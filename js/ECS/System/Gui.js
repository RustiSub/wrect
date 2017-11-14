(function() {
  "use strict";

  wrect.ECS = wrect.ECS || {};
  wrect.ECS.System = wrect.ECS.System || {};

  var Vector = wrect.Physics.Vector;

  wrect.ECS.System.Gui = function (options) {
    wrect.ECS.System.BaseSystem.call(this, options);

    this.options = options || {};
  };

  wrect.ECS.System.Gui.prototype = Object.create( wrect.ECS.System.BaseSystem.prototype );
  wrect.ECS.System.Gui.prototype.constructor = wrect.ECS.System.Gui;

  wrect.ECS.System.Gui.prototype.name = 'Gui';

  wrect.ECS.System.Gui.prototype.checkDependencies = function(entity) {
    return !!entity.components.GuiElement;
  };

  wrect.ECS.System.Gui.prototype.perform = function(entity) {
    var guiElement = entity.components.GuiElement;

    if (!guiElement.addedToScene && guiElement.loaded) {
      var content = document.querySelector('#' + guiElement.id).import;

      var el = content.querySelector('#' + guiElement.id + '-template').content;
      var clonedQueueContent = document.importNode(el, true);
      var guiContainer = document.querySelector('#guiContainer');

      guiContainer.appendChild(clonedQueueContent);

      guiElement.addedToScene = true;

      guiElement.setupCallback();
    }

    if (guiElement.requiresUpdate) {
      guiElement.updateCallback();
      guiElement.requiresUpdate = false;
    }
  };
}());
