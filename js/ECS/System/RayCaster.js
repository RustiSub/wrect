(function() {
  "use strict";

  wrect.ECS = wrect.ECS || {};
  wrect.ECS.System = wrect.ECS.System || {};

  var Vector = wrect.Physics.Vector;

  wrect.ECS.System.RayCaster = function (options) {
    wrect.ECS.System.BaseSystem.call(this);

    this.sourceEntities = [];
    this.options = options || {};

  };

  wrect.ECS.System.RayCaster.prototype = Object.create( wrect.ECS.System.BaseSystem.prototype );
  wrect.ECS.System.RayCaster.prototype.constructor = wrect.ECS.System.RayCaster;

  wrect.ECS.System.RayCaster.prototype.name = 'RayCaster';

  wrect.ECS.System.RayCaster.prototype.checkDependencies = function(entity) {
    return entity.components.RigidBody ? true : false;
  };

  wrect.ECS.System.RayCaster.prototype.checkSourceDependencies = function(entity) {
    return entity.components.Light ? true : false;
  };

  wrect.ECS.System.RayCaster.prototype.addEntity = function(data) {
    if (this.checkDependencies(data.entity) && this.entities.indexOf(data.entity) === -1) {
      this.entities.push(data.entity);
    }

    if (this.checkSourceDependencies(data.entity) && this.sourceEntities.indexOf(data.entity) === -1) {
      this.sourceEntities.push(data.entity);
    }
  };

  wrect.ECS.System.RayCaster.prototype.run = function() {
    var edges = [];

    for (var se = 0; se < this.sourceEntities.length; se++) {
      var sourceEntity = this.sourceEntities[se];
      var visual = sourceEntity.components.Visual;
      var center = sourceEntity.components.RigidBody.dimensions.getCenter();
      visual.lightGraphics.clear();
      visual.lightGraphics.beginFill(0xFFFFFF, 1);
      visual.lightGraphics.lineStyle(1, 0xFFFFFF, 1);
      //visual.lightGraphics.moveTo(center.x, center.y);

      //Cast a ray to every possible vertex
      for (var e = 0; e < this.entities.length; e++) {
        var entity = this.entities[e];

        if (entity.id === sourceEntity.id) {
          continue;
        }

        var vertices = entity.components.RigidBody.dimensions.vertices;
        var minRay;
        var maxRay;
        visual.lightGraphics.moveTo(center.x, center.y);
        for (var v = 0; v < vertices.length; v++) {
          var vector = vertices[v];

          var ray = vector.subtract(center);
          var projectRay = ray.perpendicular().unit();
          var ownProjection = vector.dot(projectRay);
          var smallerCount = 0;

          for (var p = 0; p < vertices.length; p++) {
            var projection = vertices[p].dot(projectRay);
            smallerCount += (ownProjection - projection < 0);
          }

          if (smallerCount == vertices.length - 1) {
            maxRay = vector;
          }

          if (smallerCount == 0) {
            minRay = vector;
          }
        }
        edges.push({
          min: minRay,
          max: maxRay
        });
        //Move line to border
        visual.lightGraphics.lineTo(maxRay.x, maxRay.y);
        visual.lightGraphics.lineTo(minRay.x, minRay.y);
        visual.lightGraphics.lineTo(center.x, center.y);
      }
      visual.lightGraphics.endFill();

      for (var e = 0; e < edges.length ; e++) {
        var edge = edges[e];


      }
    }
  };

  wrect.ECS.System.RayCaster.prototype.moveToBorder = function(vector) {

  };

  wrect.ECS.System.RayCaster.prototype.getLineIntersection = function(a, b, c, d) {
    var CmP = c.subtract(a);
    var r = b.subtract(a);
    var s = d.subtract(c);

    var CmPxr = CmP.cross(r);
    var CmPxs = CmP.cross(s);
    var rxs = r.cross(s);

    var rxsr = 1 / rxs;
    var t = CmPxs * rxsr;
    var u = CmPxr * rxsr;

    //console.log(t, u);
    var ptr = a.add(r.multiply(t));
    var qus = c.add(s.multiply(u));
    //p + t r = q + u s.
    //console.log(ptr, qus);

    return qus;
  };

  wrect.ECS.System.RayCaster.prototype.perform = function(entity) {

  };
}());
