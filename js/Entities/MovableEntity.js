/**
 * @augments BaseEntity
 * @type {void|*}
 */
var MovableEntity = BaseEntity.extend({
    position: {},
    stats: {},

    /**
     * @param {String} name
     * @param {Object} position
     * @param {Number} position.x
     * @param {Number} position.y
     * @param spritePath
     * @param collide
     * @param stats
     */
    init: function(name, position, spritePath, collide, stats) {
        this._super(name, spritePath, collide);
        this.position = this._sprite.position;

        this.stats = Container.getComponent('Helpers').merge(this.getDefaultStats(), stats);
        if (position) {
            this.position.x = position.x;
            this.position.y = position.y;
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
    }
});
