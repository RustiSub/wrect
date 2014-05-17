var Player = MovableEntity.extend({
    update: function(){
        this._super();
        var inputHandler = Container.getComponent('InputHandler');
        if (inputHandler.key('left')) {
            this.position.x -= this.stats.speed;
        }
        if (inputHandler.key('right')) {
            this.position.x += this.stats.speed;
        }
    }
});