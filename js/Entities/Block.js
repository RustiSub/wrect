/**
 * @augments MovableEntity
 * @type {void|*}
 */
var Block = MovableEntity.extend({

  hasGlue: false,
  changed: false,
  glueSource: false,
  width: 400,
  height: 400,
  _className: 'Block',
  dimensions: {},
  physicsBody: {},
  health: {},

  init: function(name, graphics, params) {
    this._super(name, graphics);
    this._physics.solid = true;

    this.dimensions = {};

    this.dimensions.width = params.w;
    this.dimensions.height = params.h;

    this.dimensions.topLeft = new Vector(params.x, params.y);
    this.dimensions.topRight = new Vector(params.x + params.w, params.y);
    this.dimensions.bottomRight = new Vector(params.x + params.w, params.y + params.h);
    this.dimensions.bottomLeft = new Vector(params.x, params.y + params.h);

    this.dimensions.vertices = function() {
      return [
        this.topLeft,
        this.topRight,
        this.bottomRight,
        this.bottomLeft
      ];
    };

    this.dimensions.bounds = function() {
      return this;
    };

    this.dimensions.center = function() {
      var diagonal = this.bottomRight.subtract(this.topLeft);
      return this.topLeft.add(diagonal.scale(0.5));
    };

    this.dimensions.compareVector = function(compareVector, callable) {
      var match = true;
      var vertices = this.vertices();
      for (var v in  vertices) {
        var vector = vertices[v];

        match = match && callable(compareVector, vector);
      }

      return match;
    };

    this.physicsBody = {};

    this.physicsBody.v = new Vector(0, 0);
    this.physicsBody.a = new Vector(0, 0);
    this.physicsBody.m = 1;
    this.physicsBody.theta = 0;
    this.physicsBody.omega = 0;
    this.physicsBody.alpha = 0;
    this.physicsBody.collided = false;

    this.physicsBody.J = 1;//this.m * (dimensions.height * dimensions.height + dimensions.width * this.width) / 12000;

    this._graphics.position = this.dimensions.topLeft;

    var max = typeof params.health.max !== 'undefined' ? params.health.max : 100;
    var current = typeof params.health.current !== 'undefined' ? params.health.current : max;
    this.health = {
      max: max,
      current: current,
      doDamage: function(percentage) {
        this.current -= percentage;
      }
    };
  },
  displayDamage: function() {
    this._graphics.clear();
    this.baseCallback(this.health.current / this.health.max);

    if (this.health.current <= 0) {
      game.getEntityManager().removeEntity(this);
    }
  },
  move: function () {
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

    //this._physics.applyFriction(0);
    //this._physics.applyFriction(this._graphics.position.y, this.height);
  },
  update: function(){
    this._super();

    this._physics.apply(this.physicsBody, this.dimensions, 0);//game.timeDelta);

    this._graphics.position = this.dimensions.topLeft;
    this._graphics.rotation = this.physicsBody.theta;
  },
  handleCollision: function(collisionShape, axes1Overlap, axes2Overlap) {
    if (!collisionShape._physics.solid) {
      return;
    }
    function capSmallSpeed(speed) {
      return speed > -1 && speed < 1 ? 0 : speed;
    }

    var v = this.physicsBody.v;//.unit();
    var n = axes2Overlap.axis;//.unit();
    var vn = v.dot(n);
    var u = n.multiply(vn);
    var w = v.subtract(u);
    var v2 = w.subtract(u);


    v2.x = capSmallSpeed(v2.x);
    v2.y = capSmallSpeed(v2.y);

    var sign = vn ? vn < 0 ? -1 : 1:0;
    var pushOutVector = n.unit().multiply(axes2Overlap.overlap * -sign);

    this._physics.move(this.dimensions, pushOutVector);

    if (!collisionShape.frozen) {
//      collisionShape.physicsBody.v = collisionShape.physicsBody.v.add(v.multiply(energyTransfer));
//      v2 = v2.multiply(energyTransfer);
    }

    this.physicsBody.v = v2;

    var damage = Math.abs(u.dot(new Vector(1, 1)));
    damage = damage * this.physicsBody.m;
    var damageCapped = damage <= 100 ? damage : 100;

    this.health.doDamage(damageCapped);
    this.displayDamage();

    collisionShape.health.doDamage(damageCapped);
    collisionShape.displayDamage();
  },
  toJSON: function() {
      return {
          name: this.name,
          x: this._graphics.position.x,
          y: this._graphics.position.y,
          width: this.size.x,
          height: this.size.y,
          color: this._graphics.currentPath.fillColor
      };
  }
});

