(function() {
  /**
   * @augments Block
   * @type {void|*}
   */
  window.Meteor = Block.extend({
    mass: 0,
    init: function(name, graphics, params) {
      this._super(name, graphics, params);
      this.mass = params.mass;
    },
    toJSON: function() {
      var obj = this._super();
      obj.entityType = 'meteor';
      return obj;
    },
    handleCollision: function(collisionShape, axes1Overlap, axes2Overlap) {
      this._super(collisionShape, axes1Overlap, axes2Overlap);
      Container.getGame().getCamera().shake(this.mass * 50, 2000);
    }
  });
}());
