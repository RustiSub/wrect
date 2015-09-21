(function() {
  "use strict";

  /**
   * @type {void|*}
   */
  var Entity = function (options) {
    this.components = {};

    this.id = (options.name || 'Entity') + '_' + (+new Date()).toString(16) + (Math.random() * 100000000 | 0).toString(16);
    this.eventManager = options.eventManager;

    return this;
  };

  /**
   * @param component
   */
  Entity.prototype.addComponent = function(component) {
    //TODO: What should happen when a 'subcomponent' was added? Split up the name?
    this.components[component.name] = component;
    this.eventManager.trigger('entity.component.add', {entity: this});
  };

  /**
   * @param {String} name
   */
  Entity.prototype.removeComponent = function(name) {
    delete this.components[name];
    this.eventManager.trigger('entity.component.remove', {entity: this});
  };

  /**
   * @returns {string|*}
   */
  Entity.prototype.getId = function() {
    return this.id;
  };
  
  module.exports = Entity;
}());
