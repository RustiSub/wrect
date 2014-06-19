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

    var inputHandler = Container.getComponent('InputHandler');
    if (inputHandler.key('left')) {
      this._physics.increaseSpeedX(-1);
    }
    if (inputHandler.key('right')) {
      this._physics.increaseSpeedX(1);
    }
    if (inputHandler.key('up')) {
      this._physics.increaseSpeedY(-1);
    }
    if (inputHandler.key('down')) {
      this._physics.increaseSpeedY(1);
    }

    if (this._graphics.position.x > 1000 || this._graphics.position.x < 0) {
      this._physics.reverseSpeedX();
    }

    this._graphics.position.x += this._physics.calculateSpeedX();

    if (this._graphics.position.y > 600 || this._graphics.position.y < 0) {
      this._physics.reverseSpeedY();
    }

    this._graphics.position.y += this._physics.calculateSpeedY();

    this._physics.applyFriction(this._graphics.position.y);

//    console.log(this._graphics.position.x);
//    console.log(this._graphics.position.y);

//    this._physics.

//    if (this._graphics.position.y < 500)
//    {
//      this._graphics.position.y += 5;
//    }
//    else  {
//      this._graphics.position.y = 100;
//    }

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

