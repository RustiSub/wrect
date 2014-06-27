/**
 * @augments BaseEntity
 * @type {void|*}
 */
var MovableEntity = BaseEntity.extend({
    selected: false,
    baseGraphicsCallback: {},
    selectedGraphicsCallback : {},
    position: {},
    stats: {},
    frozen: true,
    collision: {
      x: false,
      y: false,
      rest: {
        x: false,
        y: false
      }
    },

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
      }
    },
    toggleSelect: function()  {
      if (!this.selected) {
        this.selectedGraphicsCallback();
      }
  
      this.selected = true; //!this.selected;
    }
});
