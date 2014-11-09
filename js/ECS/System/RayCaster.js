(function() {
  "use strict";

  wrect.ECS = wrect.ECS || {};
  wrect.ECS.System = wrect.ECS.System || {};

  var Line = wrect.Geometry.Line;

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

  wrect.ECS.System.RayCaster.prototype.castRay = function(origin, direction, size) {
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
      var edges = entity.components.RigidBody.dimensions.getEdges();
      //Loop edges
      for (var edgeIndex = 0; edgeIndex < edges.length; edges++) {
        var edge = edges[edgeIndex];
        //Get Intersections bewteen ray and edge
        var intersection = rayLine.getIntersections(edge);
        //Store intersection as Ray-Entity-Edge-Vector/Line
        ray.intersections.push({
          entity: entity,
          point: intersection
        });
      }
    }

    return ray;
  };

  wrect.ECS.System.RayCaster.prototype.drawRay = function(ray) {
    var rayGraphics = new PIXI.Graphics();
    rayGraphics.beginFill(0xFFFFFF, 1);
    rayGraphics.lineStyle(1, 0xFFFFFF, 1);

    rayGraphics.moveTo(ray.line.point1.x, ray.line.point1.y);
    rayGraphics.lineTo(ray.line.point2.x, ray.line.point2.y);

    for (var i = 0; i < ray.intersections.length; i++) {
      var intersection = ray.intersections[i];
      rayGraphics.drawCircle(intersection.point.x, intersection.point.y, 5);
    }

    rayGraphics.endFill();

    game.getEntityManager().cameraContainer.addChild(rayGraphics);
  };

  wrect.ECS.System.RayCaster.prototype.run = function() {
    return;
    var edges = [];

    for (var se = 0; se < this.sourceEntities.length; se++) {
      var sourceEntity = this.sourceEntities[se];
      var visual = sourceEntity.components.Visual;
      var center = sourceEntity.components.RigidBody.dimensions.getCenter();
      var rays = [];

      //Cast a ray to every possible vertex
      for (var e = 0; e < this.entities.length; e++) {
        var entity = this.entities[e];

        if (entity.id === sourceEntity.id) {
          continue;
        }

        var vertices = entity.components.RigidBody.dimensions.vertices;
        var minRay;
        var minP;
        var maxRay;
        var maxP;
        //visual.lightGraphics.moveTo(center.x, center.y);
        for (var v = 0; v < vertices.length; v++) {
          var vector = vertices[v];

          var projectRay = vector.subtract(center).perpendicular().unit();
          var ownProjection = vector.dot(projectRay);
          var smallerCount = 0;

          for (var p = 0; p < vertices.length; p++) {
            var projection = vertices[p].dot(projectRay);
            smallerCount += (ownProjection - projection < 0);
          }

          if (smallerCount == vertices.length - 1) {
            maxRay = vector;
            maxP = ownProjection;
          }

          if (smallerCount == 0) {
            minRay = vector;
            minP = ownProjection;
          }
        }
        edges.push({
          minR: minRay,
          maxR: maxRay
        });
      }

      for (var edg = 0; edg < edges.length ; edg++) {
        var edge = edges[edg];

        rays.push(this.castRayAtEdges(edges, center, edge.minR));
        rays.push(this.castRayAtEdges(edges, center, edge.maxR));
      }

      //Draw lines to all shortest ray intersections
      visual.lightGraphics.clear();
      visual.lightGraphics.beginFill(0xFFFFFF, 1);
      visual.lightGraphics.lineStyle(1, 0xFFFFFF, 1);
      visual.lightGraphics.moveTo(center.x, center.y);

      var triangleCount = 0;

      for (var r = 0; r < rays.length ; r++) {
        var ray = rays[r];

        //visual.lightGraphics.lineTo(ray.endPoint.x, ray.endPoint.y);
        //visual.lightGraphics.drawCircle(ray.endPoint.x, ray.endPoint.y, 5);

        //visual.lightGraphics.lineTo(ray.shortestIntersection.x, ray.shortestIntersection.y, 5);
        //visual.lightGraphics.drawCircle(ray.shortestIntersection.x, ray.shortestIntersection.y, 5);

        //if (ray.interSections.length > 0) {
        //  var interSection = ray.interSections[0];
        //
        //  if (interSection.subtract(center).len() < ray.shortestIntersection.subtract(center).len()) {
        //
        //  }
        //}

        for (var i = 0; i < ray.interSections.length ; i++) {
          visual.lightGraphics.lineTo(ray.interSections[i].x, ray.interSections[i].y, 5);
          visual.lightGraphics.lineTo(center.x, center.y);
          triangleCount += 1;
          //visual.lightGraphics.drawCircle(ray.interSections[i].x, ray.interSections[i].y, 5);

          if (triangleCount === 2) {
            triangleCount = 0;
            //visual.lightGraphics.lineTo(center.x, center.y);
          }
        }

        //visual.lightGraphics.moveTo(center.x, center.y);
      }
      //visual.lightGraphics.moveTo(center.x, center.y);

      visual.lightGraphics.endFill();
      //console.log(rays);
      //debugger;
    }
  };

  wrect.ECS.System.RayCaster.prototype.castRayAtEdges = function(edges, origin, endPoint) {
    //.minR.subtract(center).unitScalar(500).add(center))
    var rayEndPoint = endPoint.subtract(origin).unitScalar(500).add(origin);
    var ray = {
      origin: origin,
      endPoint: rayEndPoint,
      originIntersect: {},
      interSections: [],
      shortestIntersection: endPoint
    };

    for (var otherEdg = 0; otherEdg < edges.length ; otherEdg++) {
      var otherEdge = edges[otherEdg];

      if (endPoint == otherEdge.minR || endPoint == otherEdge.maxR) {
        ray.originIntersect = this.getLineIntersection(origin, rayEndPoint, otherEdge.minR, otherEdge.maxR);
        continue;
      }

      var intersect = this.getLineIntersection(origin, rayEndPoint, otherEdge.minR, otherEdge.maxR);

      if (intersect) {
        ray.interSections.push(intersect);
        if (intersect.subtract(origin).len() <= ray.shortestIntersection.subtract(origin).len()) {
          ray.shortestIntersection = intersect;
        }
      }
    }

    if (ray.originIntersect && ray.shortestIntersection.subtract(origin).len() >= ray.originIntersect.subtract(origin).len()) {
      ray.interSections.push(ray.originIntersect);
    }

    ray.interSections.sort(function(a, b) {
      if (a.subtract(origin).len() < b.subtract(origin).len())
        return -1;
      if (a.subtract(origin).len() > b.subtract(origin).len())
        return 1;
      return 0;
    });

    return ray;
  };

  wrect.ECS.System.RayCaster.prototype.perform = function(entity) {

  };
}());
