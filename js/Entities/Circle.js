/**
 * @augments MovableEntity
 * @type {void|*}
 */
var Circle = MovableEntity.extend({
  _className: 'Circle',
  dimensions: {},
  physicsBody: {},

  init: function(name, graphics, params) {

  },
  update: function(){

  },
  handleCollision: function(collisionShape, axes1Overlap, axes2Overlap) {

  },
  toJSON: function() {
      return {
      };
  }
});

