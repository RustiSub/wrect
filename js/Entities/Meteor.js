(function() {
  /**
   * @augments Block
   * @type {void|*}
   */
  window.Meteor = Block.extend({
    init: function(name, graphics, params) {
      this._super(name, graphics, params);
    },
    toJSON: function() {
      var obj = this._super();
      obj.entityType = 'meteor';
      return obj;
    }
  });
}());
