(function() {
  "use strict";

  wrect.ECS = wrect.ECS || {};
  wrect.ECS.Assemblage = wrect.ECS.Assemblage || {};

  var Vector = wrect.Physics.Vector;
  var Entity = wrect.ECS.Entity;

  wrect.ECS.Assemblage.BaseEntity = function () {
    var entity = new Entity();

    //entity.addComponent( new ECS.Components.Appearance());
    //entity.addComponent( new ECS.Components.Position());
    //entity.addComponent( new ECS.Components.Collision());
  };


  /**
   * @type {void|*}
   */
  wrect.ECS.Assemblage.BaseEntity = Class.extend({
  _physics: {},

  /**
   * @param {String} name Name of the entity. Used for identification purposes.
   * @param {PIXI.Sprite|PIXI.Graphics|String} graphics. Object or path to sprite to use for graphical representation.
   */
  init: function(name, graphics) {
  },

  update: function() {

  },
  handleCollision: function(collisionShape, axesOverlap) {
    if (!collisionShape._physics.solid) {
      return;
    }
    function capSmallSpeed(speed) {
      return speed > -1 && speed < 1 ? 0 : speed;
    }

    var v = this.physicsBody.v;//.unit();
    var n = axesOverlap.axis;//.unit();
    var vn = v.dot(n);
    var u = n.multiply(vn);
    var w = v.subtract(u);
    var v2 = w.subtract(u);


    v2.x = capSmallSpeed(v2.x);
    v2.y = capSmallSpeed(v2.y);

    var sign = vn ? vn < 0 ? -1 : 1:0;
    var pushOutVector = n.unit().multiply(axesOverlap.overlap * -sign);

    this.dimensions.move(pushOutVector);

    if (!collisionShape.frozen) {
      //      collisionShape.physicsBody.v = collisionShape.physicsBody.v.add(v.multiply(energyTransfer));
      //      v2 = v2.multiply(energyTransfer);
    }

    this.physicsBody.v = v2;
  }
});
}());
