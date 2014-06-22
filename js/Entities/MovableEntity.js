/**
 * @augments BaseEntity
 * @type {void|*}
 */
var MovableEntity = BaseEntity.extend({
    selected: false,
    baseGraphicsCallback: {},
    selectedGraphicsCallback : {},
    position: {
        x: 0,
        y: 0
    },
    stats: {
        health: 10,
        speed: 1
    },
    physicsBody: null,

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
        this.physicsBody = new window.Physics.Body();
        this.position = this._sprite.position;

        this.physicsBody.size = {
          x: this._sprite.width,
          y: this._sprite.height
        };
        if (position) {
            this.position.x = position.x;
            this.position.y = position.y;
        }
        this.setStats(stats);
    },
    moveLeft: function() {
        console.log('----', this.position.x);
        this.position.x -= this.stats.speed;
        console.log(this.position.x);
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
      if (!this.selected) {
        this.selectedGraphicsCallback();
      }

      this.selected = true; //!this.selected;
    }
});
