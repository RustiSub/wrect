(function() {
  "use strict";

  wrect.ECS = wrect.ECS || {};
  wrect.ECS.Component = wrect.ECS.Component || {};

  wrect.ECS.Component.Selectable = function (options) {
    wrect.ECS.Component.BaseComponent.call(this);

    this.options = options || {};

    this.selected = false;
    this.actionPerformed = false;

    this.selectCallback = options.selectCallback ||function() {};
    this.deselectCallback = options.deselectCallback ||function() {};
    this.highlightCallback = options.highlightCallback ||function() {};
    this.unhighlightCallback = options.unhighlightCallback ||function() {};
  };

  wrect.ECS.Component.Selectable.prototype = Object.create( wrect.ECS.Component.BaseComponent.prototype );
  wrect.ECS.Component.Selectable.prototype.constructor = wrect.ECS.Component.Selectable;
  wrect.ECS.Component.Selectable.prototype.name = 'Selectable';
}());
