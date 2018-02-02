(function() {
  "use strict";

  wrect.ECS = wrect.ECS || {};
  wrect.ECS.Component = wrect.ECS.Component || {};

  wrect.ECS.Component.Action.ConditionCollection = function (options) {
    wrect.ECS.Component.BaseComponent.call(this);

    this.options = options || {};

    this.condition = options.condition || [];
  };

  wrect.ECS.Component.Action.ConditionCollection.prototype = Object.create( wrect.ECS.Component.BaseComponent.prototype );
  wrect.ECS.Component.Action.ConditionCollection.prototype.constructor = wrect.ECS.Component.Action.ConditionCollection;
  wrect.ECS.Component.Action.ConditionCollection.prototype.name = 'ConditionCollection';

  wrect.ECS.Component.Action.ConditionCollection.prototype.addCondition = function(condition) {
    this.condition.push(condition);
  };
}());
