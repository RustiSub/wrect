(function() {
  "use strict";

  wrect.ECS = wrect.ECS || {};
  wrect.ECS.System = wrect.ECS.System || {};

  var Line = wrect.Geometry.Line;

  wrect.ECS.System.RayCaster = function (options) {
    wrect.ECS.System.BaseSystem.call(this);

    this.sourceEntities = [];
    this.options = options || {};

    this.rayGraphics = new PIXI.Graphics();

    //TODO: Add a container that can hold 'debugger' graphics?
    game.getEntityManager().cameraContainer.addChild(this.rayGraphics);
  };

  wrect.ECS.System.RayCaster.prototype = Object.create( wrect.ECS.System.BaseSystem.prototype );
  wrect.ECS.System.RayCaster.prototype.constructor = wrect.ECS.System.RayCaster;

  wrect.ECS.System.RayCaster.prototype.name = 'RayCaster';

  wrect.ECS.System.RayCaster.prototype.checkDependencies = function(entity) {
    return entity.components.RigidBody ? true : false;
  };

  wrect.ECS.System.RayCaster.prototype.addEntity = function(data) {
    if (this.checkDependencies(data.entity) && this.entities.indexOf(data.entity) === -1) {
      this.entities.push(data.entity);
    }
  };

  wrect.ECS.System.RayCaster.prototype.castRay = function(origin, direction, size, excludedTargets) {
    excludedTargets = excludedTargets || [];
    //Define ray
    var endPoint = direction.subtract(origin).unitScalar(size).add(origin);
    var rayLine = new Line(origin, endPoint);
    var ray = {
      line: rayLine,
      intersections: []
    };

    //Loop all relevant entities (that contain Dimensions (~= RigidBody)
    for (var entityIndex = 0; entityIndex < this.entities.length; entityIndex++) {
      var entity = this.entities[entityIndex];

      if (excludedTargets.indexOf(entity) !== -1) {
        continue;
      }

      //var edges = entity.components.RigidBody.dimensions.getEdges();
      var edges = entity.components.RigidBody.dimensions.getVisibleEdges(origin);
      //Loop edges
      for (var edgeIndex = 0; edgeIndex < edges.length; edgeIndex++) {
        var edge = edges[edgeIndex];
        //Get Intersections between ray and edge
        var intersection = rayLine.getIntersections(edge);

        var existingFound = false;
        for (var existingIndex = 0; existingIndex < ray.intersections.length; existingIndex++) {
          var existingIntersection = ray.intersections[existingIndex];
          if (existingIntersection.x === intersection.x && existingIntersection.y === intersection.y) {
            existingFound = true;
            break;
          }
        }

        if (intersection && !existingFound) {
          //Store intersection as Ray-Entity-Edge-Vector/Line
          var passThrough = false;
          //console.log(intersection.x, direction.x, intersection.y, direction.y);
          if (intersection.x >= direction.x - 0.01 && intersection.x <= direction.x + 0.01) {
            if (intersection.y >= direction.y - 0.01 && intersection.y <= direction.y + 0.01) {
              passThrough = true;
            }
          }

          ray.intersections.push({
            point: intersection,
            passThrough: passThrough
          });
        }
      }
    }

    return ray;
  };

  wrect.ECS.System.RayCaster.prototype.drawRay = function(ray) {
    //this.rayGraphics.clear();
    //this.rayGraphics.beginFill(0xFFFFFF, 1);
    //this.rayGraphics.lineStyle(1, 0xFFFFFF, 1);

    this.rayGraphics.moveTo(ray.line.point1.x, ray.line.point1.y);
    this.rayGraphics.lineTo(ray.line.point2.x, ray.line.point2.y);

    for (var i = 0; i < ray.intersections.length; i++) {
      var intersection = ray.intersections[i];
      if (intersection.passThrough) {

      } else {
        this.rayGraphics.drawCircle(intersection.point.x, intersection.point.y, 5);
      }
    }

    //this.rayGraphics.endFill();
  };
}());
