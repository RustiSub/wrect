/**
 * @augments MovableEntity
 * @type {void|*}
 */
var Circle = MovableEntity.extend({
  _className: 'Circle',
  dimensions: {},
  physicsBody: {},

  init: function(name, graphics, params) {
    this._super(name, graphics);
    this.circle = params.color;
    this.dimensions = {};
    this.dimensions.origin = params.origin;
    this.dimensions.radius = params.radius;
    this.dimensions.radius = params.radius;

    this.dimensions.vertices = function() {
      return [this.radius];
    };

    this.dimensions.center = function() {
      return this.origin;
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

    this._graphics.position = this.dimensions.origin;
  },
  update: function(){
    this._super();

    this._physics.apply(this.physicsBody, this.dimensions, 0);//game.timeDelta);

    this._graphics.position = this.dimensions.origin;
    this._graphics.rotation = this.physicsBody.theta;
  },
  handleCollision: function(collisionShape, axes1Overlap, axes2Overlap) {

  },
  toJSON: function() {
      return {
      };
  }
});

