/**
 * @augments MovableEntity
 * @type {void|*}
 */
var Player = MovableEntity.extend({
    _className: 'Player',
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
