(function() {
  "use strict";

  wrect.ECS = wrect.ECS || {};
  wrect.ECS.System = wrect.ECS.System || {};

  wrect.Bundles.ProtoTitan.Damage = wrect.Bundles.ProtoTitan.Damage || {};
  var damage = wrect.Bundles.ProtoTitan.Damage;

  damage.Constants = {
    DAMAGE: 'damage'
  };

  wrect.ECS.System.DamageHandler = function (options) {
    wrect.ECS.System.BaseSystem.call(this, options);

    this.options = options || {};
    this.eventManager = this.options.eventManager;
    this.gameTime = this.options.gameTime;

    this.eventManager.addListener(damage.Constants.DAMAGE, this.handleDamage, this);
  };

  wrect.ECS.System.DamageHandler.prototype = Object.create( wrect.ECS.System.BaseSystem.prototype );
  wrect.ECS.System.DamageHandler.prototype.constructor = wrect.ECS.System.DamageHandler;

  wrect.ECS.System.DamageHandler.prototype.name = 'DamageHandler';

  wrect.ECS.System.DamageHandler.prototype.checkDependencies = function(entity) {
    return entity.components.Health ? true : false;
  };

  wrect.ECS.System.DamageHandler.prototype.perform = function(entity) {
    var health = entity.components.Health;

    if (damage = this.getNextDamageSource(health)) {
      this.applyDamage(entity, health, damage);
    }
  };

  /**
   *
   * @param {wrect.ECS.Component.Health} health
   * @param {wrect.ECS.Component.Damage} damage
   */
  wrect.ECS.System.DamageHandler.prototype.applyDamage = function(entity, health, damage) {
    health.damageStack.shift();

    if (health.damageCallback) {
      health.damageCallback(entity, health.currentHealth, damage);
    }

    var damageRange = damage.amount > 0 ? 1 : -1;

    for (var h = 1; h <= Math.abs(damage.amount); h += damageRange) {
      for (var d = 0; d < health.damageStates.length; d++) {
        var damageState = health.damageStates[d];

        if (health.currentHealth - h  === damageState.amount) {
          damageState.callback(health.currentHealth, damage);
        }
      }
    }

    health.currentHealth -= damage.amount;
  };

  wrect.ECS.System.DamageHandler.prototype.handleDamage = function(data) {
    for (var e = 0; e < data.entities.length; e++) {
      var entity = data.entities[e];

      if (this.checkDependencies(entity)) {
        var health = entity.components.Health;
        var damage = data.damage;

        this.addDamageToStack(health, damage);
      }
    }
  };

  /**
   *  Add new Damage source to the top of the stack.
   *
   * @param {wrect.ECS.Component.Health} health
   * @param {wrect.ECS.Component.Damage} damage
   */
  wrect.ECS.System.DamageHandler.prototype.addDamageToStack = function(health, damage) {
    health.damageStack.push(damage);
  };

  /**
   * Get bottom of the DamageStack or false if stack is empty.
   *
   * @param {wrect.ECS.Component.Health} health
   * @returns {wrect.ECS.Component.Damage|boolean} damage
   */
  wrect.ECS.System.DamageHandler.prototype.getNextDamageSource = function(health) {
    if (health.damageStack.length > 0) {
      return health.damageStack[0];
    }

    return false;
  };
}());
