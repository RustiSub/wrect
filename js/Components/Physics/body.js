window.Physics = window.Physics || {};
window.Physics.Body = Class.extend({
  COLLISION_TYPE_STATIC: 1,
  COLLISION_TYPE_DYNAMIC: 2,
  collisionType: this.COLLISION_TYPE_STATIC,
  grounded: false,
  collision: {
    x: 0,
    y: 0
  },
  collides: false,
  size: {
    x: 0,
    y: 0,
  },
  position: {
    x: 0,
    y: 0
  },
  velocity: {
    x: 0,
    y: 0
  },
  weight: 0,

  init: function(options){
    if (options && options.collisionType !== undefined) {
      this.collisionType = options.collisionType;
    }
  },

  getHorizontalCollision: function() {
    return this.collision.x;
  },

  getVerticalCollision: function() {
    return this.collision.y;
  }

});
