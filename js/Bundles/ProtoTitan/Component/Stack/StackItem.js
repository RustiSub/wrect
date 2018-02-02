(function() {
  "use strict";

  wrect.ECS = wrect.ECS || {};
  wrect.ECS.Component = wrect.ECS.Component || {};
  wrect.ECS.Component.Stack = wrect.ECS.Component.Stack || {};

  wrect.ECS.Component.Stack.StackItem = function (options) {
    wrect.ECS.Component.BaseComponent.call(this);

    this.options = options || {};
  };

  wrect.ECS.Component.Stack.StackItem.prototype = Object.create( wrect.ECS.Component.BaseComponent.prototype );
  wrect.ECS.Component.Stack.StackItem.prototype.constructor = wrect.ECS.Component.Stack.StackItem;
  wrect.ECS.Component.Stack.StackItem.prototype.name = 'StackItem';
}());
