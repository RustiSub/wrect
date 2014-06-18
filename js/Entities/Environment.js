/**
 * @augments MovableEntity
 * @type {void|*}
 */
var Block = MovableEntity.extend({
  init: function() {
    this.setGraphics();
  },
  update: function(){
    this._super();

    if (this._graphics.position.y < 500)
    {
      this._graphics.position.y += 5;
    }
    else  {
      this._graphics.position.y = 100;
    }

//    this.setGraphics();
//        var inputHandler = Container.getComponent('InputHandler');
//        if (inputHandler.key('left')) {
//            this.position.x -= this.stats.speed;
//        }
//        if (inputHandler.key('right')) {
//            this.position.x += this.stats.speed;
//        }
  }
});

