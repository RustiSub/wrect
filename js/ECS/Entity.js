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
   * @param {wrect.ECS.Component.BaseComponent} component
   */
  Entity.prototype.addComponent = function(component) {
    this.components[component.name] = component;
  };

  /**
   * @param {String} name
   */
  Entity.prototype.removeComponent = function(name) {
    delete this.components[name];
  }
}());
