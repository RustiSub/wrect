/**
 * @augments BaseEntity
 * @type {void|*}
 */
var MovableEntity = BaseEntity.extend({
    position: {
        x: 0,
        y: 0
    },
    stats: {
        health: 10,
        speed: 1
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
    /**
     * Set the stats of this entity
     * @param {int} stats.health Health of the entity
     * @param {int} stats.speed Speed of the entity
     *
     */
    setStats: function(stats) {
        for (var stat in stats) {
            if (stats.hasOwnProperty(stat)) {
                this.stats[stat] = stats[stat]
            }
        }
    }
});
