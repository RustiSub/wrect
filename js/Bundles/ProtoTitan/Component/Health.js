(function() {
  "use strict";

  wrect.ECS = wrect.ECS || {};
  wrect.ECS.Component = wrect.ECS.Component || {};

  wrect.ECS.Component.Health = function (options) {
    wrect.ECS.Component.BaseComponent.call(this);

    this.options = options || {};

    this.maxHealth = options.maxHealth || {};
    this.currentHealth = options.currentHealth || this.maxHealth;

    this.damageStack = options.damageStack || [];

    this.damageCallback = options.damageCallback ||function() {};

    if (options.damageStates) {
      this.damageStates = options.damageStates;
    } else {
      this.damageStates = [];
      this.damageStates.push({
        amount: this.maxHealth,
        callback: function(damage) {
          console.log('Full health');
        }
      });

      this.damageStates.push({
        amount: 0,
        callback: function(damage) {
          console.log('No health');
        }
      });
    }
  };

  wrect.ECS.Component.Health.prototype = Object.create( wrect.ECS.Component.BaseComponent.prototype );
  wrect.ECS.Component.Health.prototype.constructor = wrect.ECS.Component.Health;
  wrect.ECS.Component.Health.prototype.name = 'Health';
}());
