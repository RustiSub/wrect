(function() {
  "use strict";

  wrect.ECS = wrect.ECS || {};

  /**
   * @type {void|*}
   */
  wrect.ECS.Entity = function () {
    this.components = {};

    return this;
  };

  var Entity = wrect.ECS.Entity;

  /**
   * @param component
   */
  Entity.prototype.addComponent = function(component) {
    this.components[component.name] = component;
  };

  /**
   * @param {String} name
   */
  Entity.prototype.removeComponent = function(name) {
    delete this.components[name];
  };

  //TODO: THIS NEEDS TO GO, put it here so we are hard wired into the PIXI rendering
  Entity.prototype.getGraphics = function() {
    return this.components.Visual.graphics;
  };
}());
