/**
 * @augments MovableEntity
 * @type {void|*}
 */
var Circle = MovableEntity.extend({
  _className: 'Circle',
  dimensions: {},
  physicsBody: {},

  init: function(name, graphics, options) {
    this._super(name, graphics);
    this.color = options.color;
    this.alpha = options.alpha;

    this.dimensions = {};
    this.dimensions.origin = options.origin;
    this.dimensions.radius = options.radius;

    this.dimensions.vertices = function() {
      return [this.origin];
    };

    this.dimensions.move = function(v) {
      this.origin = this.origin.add(v);

      return this
    };
    this.dimensions.rotate = function(physicsBody, angle) {
      physicsBody.theta += angle;
      var center = this.center();

      this.origin = this.origin.rotate(angle, center);

      return this;
    };

    this.dimensions.center = function() {
      return this.origin;
    };

    this.dimensions.bounds = function() {
      var topLeft = this.origin.subtract(new Vector(this.radius, this.radius));
      var diameter = this.radius * 2;
      return {
        topLeft : topLeft,
        topRight : topLeft.add(new Vector(diameter, 0)),
        bottomRight : topLeft.add(new Vector(diameter, diameter)),
        bottomLeft : topLeft.add(new Vector(0, diameter))
      };
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

