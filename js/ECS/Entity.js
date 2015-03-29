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

  var Entity = wrect.ECS.Entity;

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

  //TODO: THIS NEEDS TO GO, put it here so we are hard wired into the PIXI rendering
  Entity.prototype.getGraphics = function() {
    if (this.components.Visual) {
      return this.components.Visual.graphics;
    } else {
      return new PIXI.Graphics();
    }
  };
}());
