(function() {
  window.SpaceLevel = BaseLevel.extend({
    _className: 'SpaceLevel',
    timer: 0,
    init: function(name) {
      this._super(name);
      this.levelData.meteors = [];
      this.levelData.meteorsSpawned = [];
    },
    update: function() {
      this.timer += game.getDelta();
      if (this.timer > ((15000 - 5000) * Math.random() + 5000)) {
        if (this.levelData.meteorsSpawned.length !== this.levelData.meteors.length) {
          this.timer = 0;
          var randomIndex = this.getRandomMeteorIndex();
          this.spawnMeteor(randomIndex);
          this.levelData.meteorsSpawned.push(randomIndex);
        }
        else {
          console.log('done!');
        }
      }
    },
    getRandomMeteorIndex: function() {
      var r = Math.round(Math.random() * (this.levelData.meteors.length-1));
      if (this.levelData.meteorsSpawned[r] !== undefined) {
        r = this.getRandomMeteorIndex();
      }
      return r;
    },
    spawnMeteor: function(index) {
      var ship = window.game.getEntityManager().getEntityByName('shield');
      var meteor = this.levelData.meteors[index];
      var entityManager = window.game.getEntityManager();
      var position = this.getRandomMeteorPosition();
      var speed = (15-2) * Math.random() + 2;

      meteor.setPosition(position);
      meteor.physicsBody.v = ship.dimensions.topLeft.subtract(position).unit().multiply(speed);

      entityManager.addEntity(meteor);
    },
    getRandomMeteorPosition: function(){
      var x = 0;
      var y = 0;
      while (x >= 0 && x < Container.getGame().getWidth()) {
        x = 20000 * Math.random() - 10000;
      }
      while (y >= 0 && y < Container.getGame().getHeight()) {
        y = 20000 * Math.random() - 10000;
      }
      return new Vector(x, y);
    },
    toJSON: function() {
      var obj = this._super();
      obj._className = this._className;
      return obj;
    }
  });
}());
