/**
 * @augments BaseEntity
 * @type {void|*}
 */
var MovableEntity = BaseEntity.extend({
    selected: false,
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
     * @param {Object} position
     * @param {Number} position.x
     * @param {Number} position.y
     * @param spritePath
     * @param collide
     * @param stats
     */
    init: function(name, position, spritePath, collide, stats) {
        this._super(name, spritePath, collide);
        this.position = this._graphics.position;
        if (position) {
            this.position.x = position.x;
            this.position.y = position.y;
        }
        this.setStats(stats);
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
    },
    toggleSelect: function()  {
      this.select = true;

      if (this.select) {
        //this._graphics.beginFill(0x000000);
        //this._graphics.position.x, this._graphics.position.y
        //this._graphics.drawCircle(100,100, 12);
      }
    }
});
