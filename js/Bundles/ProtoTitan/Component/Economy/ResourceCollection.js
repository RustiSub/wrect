(function() {
  "use strict";

  wrect.ECS = wrect.ECS || {};
  wrect.ECS.Component = wrect.ECS.Component || {};

  wrect.ECS.Component.ResourceCollection = function (options) {
    wrect.ECS.Component.BaseComponent.call(this);

    this.options = options || {};

    this.resource = options.resource || 0;
    this.originalResource = options.originalResource || this.resource;
    this.min = options.min || 0;
    this.max = options.max || 100;
  };

  wrect.ECS.Component.ResourceCollection.prototype = Object.create( wrect.ECS.Component.BaseComponent.prototype );
  wrect.ECS.Component.ResourceCollection.prototype.constructor = wrect.ECS.Component.ResourceCollection;
  wrect.ECS.Component.ResourceCollection.prototype.name = 'ResourceCollection';

  wrect.ECS.Component.ResourceCollection.prototype.setResource = function(resource) {
    this.resource = resource;
  };

  wrect.ECS.Component.ResourceCollection.prototype.removeResource = function(resource) {
    this.resource -= resource;
  };

  wrect.ECS.Component.ResourceCollection.prototype.addResource = function(resource) {
    this.resource += resource;
  };

  wrect.ECS.Component.ResourceCollection.prototype.resetResource = function() {
    this.resource = this.originalResource;
  };

  wrect.ECS.Component.ResourceCollection.prototype.minResource = function() {
    this.resource = this.min;
  };

  wrect.ECS.Component.ResourceCollection.prototype.maxResource = function() {
    this.resource = this.max;
  };
}());
