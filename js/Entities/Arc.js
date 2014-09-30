/**
 * @augments MovableEntity
 * @type {void|*}
 */
var Arc = Circle.extend({
  _className: 'Arc',
  arcShapeCoords: {},
  //dimensions: {},
  //physicsBody: {},

   init: function(name, graphics, options) {
     this._super(name, graphics, options);
     this.options = options;

     var math = window.game.getHelpers().math;
     var origin = new Vector(0, 0);
     var radius = origin.add(new Vector(this.options.radius, 0)).rotate(math.toRadians(this.options.angle), origin);
     var degrees = this.options.width / 2;

     this.dimensions.arcShapeCoords = [
       origin,
       radius.rotate(math.toRadians(-degrees), origin),
       radius,
       radius.rotate(math.toRadians(degrees), origin)
     ];


     this.dimensions.vertices = function(axis, centerConnectionPoint) {
       //var minD = this.origin.add(axis.unitScalar(this.radius));
       //var minDP = axis.dot(minD);
       //var maxD = this.origin.add(axis.unitScalar(-this.radius));
       //var maxDP = axis.dot(maxD);

       var minArc = this.arcShapeCoords[1].add(this.origin);
       //var minArcP = axis.dot(minArc);
       var maxArc = this.arcShapeCoords[3].add(this.origin);
       //var maxArcP = axis.dot(maxArc);

       //var minPoint = minArcP > minDP ? minArc :  minD;
       //var maxPoint = maxArcP < maxDP ? maxArc :  maxD;

       if (typeof axis !== 'undefined' && typeof centerConnectionPoint !== 'undefined') {
         //console.log(
         //    axis,
         //    axis.dot(this.origin.add(centerConnectionPoint.unitScalar(this.radius))),
         //    axis.dot(this.origin.add(axis.unitScalar(this.radius))),
         //    axis.dot(minArc),
         //    axis.dot(this.arcShapeCoords[2].add(this.origin)),
         //    axis.dot(maxArc)
         //);
         return [
           this.origin,
           minArc,
           this.origin.add(centerConnectionPoint.unitScalar(this.radius)),
           maxArc
         ];
       }

       return [
         this.origin,
         minArc,
         this.arcShapeCoords[2].add(this.origin),
         maxArc
        ];
     };
   }

//  init: function(name, graphics, options) {
//    this._super(name, graphics, options);
//    this.color = options.color;
//    this.alpha = options.alpha;
//
//    this.dimensions = {};
//    this.dimensions.origin = options.origin;
//    this.dimensions.radius = options.radius;
//
//    this.dimensions.vertices = function(axis) {
//      if (typeof axis != 'undefined') {
//        return [
//          this.origin.add(axis.unitScalar(this.radius)),
//          this.origin,
//          this.origin.add(axis.unitScalar(-this.radius))
//        ];
//      }
//
//      return [this.origin];
//    };
//
//    this.dimensions.move = function(v) {
//      this.origin = this.origin.add(v);
//
//      return this
//    };
//    this.dimensions.rotate = function(physicsBody, angle) {
////      physicsBody.theta += angle;
////      var center = this.center();
////
////      this.origin = this.origin.rotate(angle, center);
//
//      return this;
//    };
//    this.dimensions.center = function() {
//      return this.origin;
//    };
//    this.dimensions.bounds = function() {
//      var topLeft = this.origin.subtract(new Vector(this.radius, this.radius));
//      var diameter = this.radius * 2;
//      return {
//        topLeft : topLeft,
//        topRight : topLeft.add(new Vector(diameter, 0)),
//        bottomRight : topLeft.add(new Vector(diameter, diameter)),
//        bottomLeft : topLeft.add(new Vector(0, diameter))
//      };
//    };
//
//    this.physicsBody = {};
//
//    this.physicsBody.v = new Vector(0, 0);
//    this.physicsBody.a = new Vector(0, 0);
//    this.physicsBody.m = 1;
//    this.physicsBody.theta = 0;
//    this.physicsBody.omega = 0;
//    this.physicsBody.alpha = 0;
//    this.physicsBody.collided = false;
//
//    this.physicsBody.J = 1;//this.m * (dimensions.height * dimensions.height + dimensions.width * this.width) / 12000;
//
//    this._graphics.position.x = this.dimensions.origin.x;
//    this._graphics.position.y = this.dimensions.origin.y;
//  },
//  update: function(){
//    this._super();
//
//    this._physics.apply(this.physicsBody, this.dimensions, 0);//game.timeDelta);
//    this._graphics.position.x = this.dimensions.origin.x;
//    this._graphics.position.y = this.dimensions.origin.y;
//    this._graphics.rotation = this.physicsBody.theta;
//  },
//  handleCollision: function(collisionShape, axes2Overlap) {
//    function capSmallSpeed(speed) {
//      return speed > -1 && speed < 1 ? 0 : speed;
//    }
//    var v = this.physicsBody.v;//.unit();
//    var n = axes2Overlap.axis;//.unit();
//    var vn = v.dot(n);
//    var u = n.multiply(vn);
//    var w = v.subtract(u);
//    var v2 = w.subtract(u);
//
//
//    v2.x = capSmallSpeed(v2.x);
//    v2.y = capSmallSpeed(v2.y);
//
//    var sign = vn ? vn < 0 ? -1 : 1:0;
//    var pushOutVector = n.unit().multiply(axes2Overlap.overlap * -sign);
//
//    this.dimensions.move(pushOutVector);
//
//    if (!collisionShape.frozen) {
////      collisionShape.physicsBody.v = collisionShape.physicsBody.v.add(v.multiply(energyTransfer));
////      v2 = v2.multiply(energyTransfer);
//    }
//
//    this.physicsBody.v = v2;
//  },
//  toJSON: function() {
//      return {
//      };
//  }
});

