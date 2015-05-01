(function() {
  "use strict";

  wrect.ECS = wrect.ECS || {};

  /**
   * @type {void|*}
   */
  wrect.ECS.Entity = function (options) {
    this.components = {};

    this.id = (+new Date()).toString(16) + (Math.random() * 100000000 | 0).toString(16);
    this.eventManager = options.eventManager;

    return this;
  };

  /**
   * @param component
   */
  wrect.ECS.Entity.prototype.addComponent = function(component) {
    //TODO: What should happen when a 'subcomponent' was added? Split up the name?
    this.components[component.name] = component;
    this.eventManager.trigger('entity.component.add', {entity: this});
  };

  /**
   * @param {String} name
   */
  wrect.ECS.Entity.prototype.removeComponent = function(name) {
    delete this.components[name];
    this.eventManager.trigger('entity.component.remove', {entity: this});
  };

  /**
   * @returns {string|*}
   */
  wrect.ECS.Entity.prototype.getId = function() {
    return this.id;
  };
}());
