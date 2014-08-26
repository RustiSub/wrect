/**
 * @augments BaseEntity
 * @type {void|*}
 */
var MovableEntity = BaseEntity.extend({
    selected: false,
    baseGraphicsCallback: {},
    originalBaseGraphicsCallback: {},
    selectedGraphicsCallback : {},
    deselectGraphicsCallback: {},
    gluedGraphicsCallback: {},
    unGluedGraphicsCallback: {},
    position: {},
    stats: {},
    frozen: true,
    collisions: [],

    /**
     * @param {String} name
     * @param {PIXI.Sprite, PIXI.Graphics, String} graphics
     * @param {Object} options
     * @param {Object} options.position
     * @param {Number} options.position.x
     * @param {Number} options.position.y
     */
    init: function(name, graphics, options) {
      this._super(name, graphics);
      this.position = this._graphics.position;
      if (options && options.position) {
        this.position.x = options.position.x;
        this.position.y = options.position.y;
      }
    },
    moveLeft: function() {
        this.position.x -= this.stats.speed;
    },
    moveRight: function() {
        this.position.x += this.stats.speed;
    },
    moveUp: function() {
        // TODO: top-down only
    },
    moveDown: function() {
        // TODO: top-down only
    },
    jump: function() {

    },

    getDefaultStats: function() {
      return {
        health: 10,
        speed: 1
      };
    },
    deselect: function() {
      this.deselectGraphicsCallback();
      this.selected = false;
    },
    select: function() {
      this.selectedGraphicsCallback();
      this.selected = true;
    },
    toggleSelect: function()  {
      if (this.selected) {
        this.deselect();
      } else {
        this.select();
      }
    }
});
