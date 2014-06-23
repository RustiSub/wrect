/**
 * @augments MovableEntity
 * @type {void|*}
 */
var Player = MovableEntity.extend({
    init: function(name, position, spritePath, collide, stats) {
        this._super(name, position, spritePath, collide, stats);
    },
    update: function(){
        this._super();
        var inputHandler = Container.getComponent('InputHandler');
        if (inputHandler.key('left')) {
            this.moveLeft();
        }
        if (inputHandler.key('right')) {
            this.moveRight();
        }
    }
});
