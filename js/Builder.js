var Builder = Class.extend({
  connectionFaces: [],
  rooms: [],
  selectedEntityIndex: -1,
  clusters: [],

  createObject: function(glueSource) {
    var uniqueId = game.getEntityManager().getAllEntities().length;
    var createdBlock = game._builder.createBlock('created_block_' + uniqueId, 0, 0, 200, 20, 0xFFFFFF);
    createdBlock.glueSource = glueSource;
    game.addEntity(createdBlock);
  },

  moveBuilderBlock: function(builderBlock) {
    builderBlock._physics.xSpeed = 0;
    builderBlock._physics.ySpeed = 0;

    var speed = 0.5;
    var collision = false;
    var collisionDirections = {
      up: false,
      right: false,
      down: false,
      left: false
    };

    if (builderBlock.connectedBodies.length > 0) {
      var minX = builderBlock.position.x;
      var minY = builderBlock.position.y;

      var maxX = builderBlock.position.x + builderBlock.size.x;
      var maxY = builderBlock.position.y + builderBlock.size.y;


        for (var x = 0; x < builderBlock.connectedBodies.length; x++) {
          var face = builderBlock.connectedBodies[x].face;
          if (face.first.x == face.second.x && face.first.y == face.second.y) {
            continue;
          }

          if (face.first.y + speed >= maxY && face.second.y >= maxY) {
            collisionDirections.down = true;
            collision = true;
          }

          if (face.first.y <= minY && face.second.y - speed <= minY) {
            collisionDirections.up = true;
            collision = true;
          }

          if (face.first.x + speed >= maxX && face.second.x >= maxX) {
            collisionDirections.right = true;
            collision = true;
          }

          if (face.first.x <= minX && face.second.x - speed <= minX) {
            collisionDirections.left = true;
            collision = true;
          }
        }

    }

    if (collision) {
//console.log(collisionDirections);
    }

    var inputHandler = Container.getComponent('InputHandler');

    if (inputHandler.key('SPACE')) {
      speed *= 10;
    }

    if (inputHandler.key('left') && !collisionDirections.left) {
      builderBlock._physics.xSpeed -=speed;
    }
    if (inputHandler.key('right') && !collisionDirections.right) {
      builderBlock._physics.xSpeed += speed;
    }
    if (inputHandler.key('up') && !collisionDirections.up) {
      builderBlock._physics.ySpeed -= speed;
    }
    if (inputHandler.key('down') && !collisionDirections.down) {
      builderBlock._physics.ySpeed += speed;
    }
    if (inputHandler.key('K_NINE')) {
      builderBlock.rotate();
    }

    if (inputHandler.key('K_FIVE')) {
      console.log('game.addEntity(game._builder.createBlock("' + builderBlock.name + '",' +  builderBlock.position.x + ', ' + builderBlock.position.y + ', ' + builderBlock.size.x + ', ' + builderBlock.size.y + ', ' + '0xFFFFFF));');
    }
  },

  clearRooms: function(bodies) {
    for (var b = 0; b < bodies.length; b++) {
      var body = bodies[b];
      body.inClusters = -1;
      body.connectedBodies = [];
    }
    for (var x = 0; x < this.rooms.length; x++) {
      this.rooms[x].clear();
      game.getEntityManager()._stage.removeChild(this.rooms[x]);
    }
    this.rooms = [];
    this.connectionFaces = [];
    this.clusters = [];
  },
  createLine: function (points) {
    if (points.length > 0) {
      var graphics = new PIXI.Graphics();
      graphics.beginFill(0x0000FF, 0.2);

      var startPoint;
      for (var x = 0; x < points.length; x++) {
        var point = points[x];
        if (x === 0) {
          graphics.moveTo(point.x, point.y);
          startPoint = point;
        }
        else {
          graphics.lineTo(point.x, point.y);
        }
      }


      graphics.lineTo(startPoint.x, startPoint.y);
      graphics.endFill();

      game.getEntityManager()._stage.addChildAt(graphics, 0);

      this.rooms.push(graphics);
    }
  },
  createBorder: function (name, coords) {
    var width = coords.width;
    var height = coords.height;
    var blockGraphics = new PIXI.Graphics();

    var block = new Block(name, blockGraphics);
    block.name = name;
    block.position = blockGraphics.position;

    block.baseGraphicsCallback = function() {
      block._graphics.beginFill(0xFFFFFF);
      block._graphics.drawRect(0, 0, coords.width, coords.height);
      block._graphics.endFill();
    };

    block.baseGraphicsCallback();

    block.size = {x: width, y: height};

    blockGraphics.position.x = coords.x;
    blockGraphics.position.y = coords.y;

    block.frozen = true;

    return block;
  },

  createBlock: function (name, x, y, width, height, color, alpha) {
    alpha = typeof alpha !== 'undefined' ? alpha : 1;
    color = typeof color !== 'undefined' ? color : 0x00FF00;

    var blockGraphics = new PIXI.Graphics();

    var block = new Block(name, blockGraphics);
    block.name = name;
    block.size = {x: width, y: height};

    blockGraphics.position.x = x;
    blockGraphics.position.y = y;
    blockGraphics.position.getAnchor = function() {
      return {
        x: block.position.x + (block.size.x / 2),
        y: block.position.y + (block.size.y / 2)
      }
    };
    block.position = blockGraphics.position;

    block.baseGraphicsCallback = function() {
      this._graphics.clear();
      this.selectCallback();
      this.baseCallback();
      this.glueCallback();

      this._graphics.beginFill(0x0080FF);
      this._graphics.drawCircle(this.size.x / 2, this.size.y / 2, 2);
      this._graphics.endFill();
    };

    block.baseCallback  = function() {
      this._graphics.beginFill(color, alpha);
      this._graphics.drawRect(0, 0, this.size.x, this.size.y);
      this._graphics.endFill();
    };

    block.glueCallback = function() {
      if (block.hasGlue) {
        var mark = 4;
        this._graphics.beginFill(0xB231EB);
        this._graphics.drawRect(0 + mark , 0 + mark , this.size.x - (mark  * 2), this.size.y - (mark  * 2));
        this._graphics.endFill();
      }
    };

    block.selectCallback = function() {
      if (this.selected) {
        this._graphics.beginFill(0x00FF00);
        this._graphics.drawRect(0 - 2, 0 - 2, this.size.x + 4, this.size.y + 4);
        this._graphics.endFill();
      }
    };

    block.baseGraphicsCallback();

    block.frozen = false;

    return block;
  },

  createCircle: function (point) {
      var graphics = new PIXI.Graphics();
      graphics.beginFill(0xFF0000, 1);

      graphics.drawCircle(point.x, point.y, 2);
      graphics.endFill();

      game.getEntityManager()._stage.addChildAt(graphics, game.getEntityManager()._stage.children.length);

      this.rooms.push(graphics);
  },
  connectGlue: function(bodies) {

  },
  drawConnectionFaces: function() {
    for (var f = 0; f < this.connectionFaces.length; f++) {
      var points = [];
      var chain = [];
      if (!this.connectionFaces[f].chained) {
        this.sortFaces(null, this.connectionFaces[f], chain, points);
        if (points.length >= 4) {
          this.createLine(points);
        }
      }
      break;
    }
  },
  sortFaces: function(previousFace, originFace, chain, points) {

    for (var f = 0; f < this.connectionFaces.length; f++) {
      if (previousFace != null && previousFace === this.connectionFaces[f]) {
        continue;
      }
      if (chain.indexOf(originFace) !== -1) {
        continue;
      }
      if (originFace === this.connectionFaces[f]) {
        continue;
      }
      var matchIndexFirst = -1;
      var matchIndexSecond = -1;
      //No faces match
      if (originFace.bodies[1] === this.connectionFaces[f].bodies[0] ) {
        matchIndexFirst = 0;
      }
      if (originFace.bodies[1] === this.connectionFaces[f].bodies[1] ) {
        matchIndexFirst = 1;
      }
      if (originFace.bodies[0] === this.connectionFaces[f].bodies[0] ) {
        matchIndexSecond = 0;
      }
      if (originFace.bodies[0] === this.connectionFaces[f].bodies[1] ) {
        matchIndexSecond = 1;
      }

      if (matchIndexFirst === -1 && matchIndexSecond === -1) {
        continue;
      }
      if (chain.indexOf(originFace) === -1 && chain.indexOf(this.connectionFaces[f] === -1)) {
        var face = originFace.face;
        var matchFace = this.connectionFaces[f].face;

        //Check if first or second point is closer
        var x1x1 = Math.abs(face.first.x - matchFace.first.x);
        var x2x1 = Math.abs(face.second.x - matchFace.first.x);

        var closestPointX1;
        if (x1x1 <= x2x1) {
          closestPointX1 = face.first.x;
        } else {
          closestPointX1 = face.second.x;
        }

        var xCx1 = closestPointX1 - matchFace.first.x;
        var xCx2 = closestPointX1 - matchFace.second.x;

        var closestPointX2;
        if (xCx1 <= xCx2) {
          closestPointX2 = matchFace.first.x;
        } else {
          closestPointX2 = matchFace.second.x;
        }

        var y1y1 = Math.abs(face.first.y - matchFace.first.y);
        var y2y1 = Math.abs(face.second.y - matchFace.first.y);

        var closestPointY1;
        if (y1y1 <= y2y1) {
          closestPointY1 = face.first.y;
        } else {
          closestPointY1 = face.second.y;
        }

        var yCy1 = closestPointY1 - matchFace.first.y;
        var yCy2 = closestPointY1 - matchFace.second.y;

        var closestPointY2;
        if (yCy1 <= yCy2) {
          closestPointY2 = matchFace.first.y;
        } else {
          closestPointY2 = matchFace.second.y;
        }

        points.push({x: closestPointX1, y:closestPointY1});

        chain.push(originFace);
        originFace.chained = true;
        originFace.chainCount += 1;

        this.connectionFaces[f].chainCount += 1;

        this.sortFaces(originFace, this.connectionFaces[f], chain, points);
        break;
      }
    }
  },
  buildConnections: function() {
      for (var t = 0; t < game.completeTree.length; t++) {
          var bodies = game.completeTree[t];

          for (var x = 0; x < bodies.length; x++) {
              var mainBody = bodies[x];

              var face = {
                  p1: {
                      x: mainBody.position.x,
                      y: mainBody.position.y
                  },
                  p2: {
                      x: mainBody.position.x + mainBody.size.x,
                      y: mainBody.position.y + mainBody.size.y
                  }
              };

              for (var y = 0; y < bodies.length; y++) {
                  if (x !== y) {
                      var otherBody = bodies[y];

                      var matchingFace = {
                          p1: {
                              x: otherBody.position.x,
                              y: otherBody.position.y
                          },
                          p2: {
                              x: otherBody.position.x + otherBody.size.x,
                              y: otherBody.position.y  + otherBody.size.y
                          }
                      };

                      if (face.p2.x >= matchingFace.p1.x && face.p1.x <= matchingFace.p2.x) {
                          if (face.p2.y >= matchingFace.p1.y && face.p1.y <= matchingFace.p2.y) {

                              var x1 = null;
                              var x2 = null;

                              //CALCULATE X
                              //P1-right <=> P2-left
                              if (face.p2.x === matchingFace.p1.x) {
                                  x1 = face.p2.x;
                                  x2 = face.p2.x;
                              }

                              //P1-left <=> P2-right
                              if (face.p1.x === matchingFace.p2.x) {
                                  x1 = face.p1.x;
                                  x2 = face.p1.x;
                              }

                              //P1-top <=> P2-bottom
                              if (face.p1.x <= matchingFace.p1.x) {
                                  x1 = matchingFace.p1.x;
                              } else if (face.p1.x > matchingFace.p1.x) {
                                  x1 = face.p1.x;
                              }

                              if (face.p2.x <= matchingFace.p2.x) {
                                  x2 = face.p2.x;
                              } else if (face.p2.x > matchingFace.p2.x) {
                                  x2 = matchingFace.p2.x;
                              }

                              //CALCULATE Y
                              var y1 = null;
                              var y2 = null;
                              //P1-right <=> P2-left
                              if (face.p2.y === matchingFace.p1.y) {
                                  y1 = face.p2.y;
                                  y2 = face.p2.y;
                              }

                              //P1-left <=> P2-right
                              if (face.p1.y === matchingFace.p2.y) {
                                  y1 = face.p1.y;
                                  y2 = face.p1.y;
                              }

                              //P1-top <=> P2-bottom
                              if (face.p1.y <= matchingFace.p1.y) {
                                  y1 = matchingFace.p1.y;
                              } else if (face.p1.y > matchingFace.p1.y) {
                                  y1 = face.p1.y;
                              }

                              if (face.p2.y <= matchingFace.p2.y) {
                                  y2 = face.p2.y;
                              } else if (face.p2.y > matchingFace.p2.y) {
                                  y2 = matchingFace.p2.y;
                              }

                              var connectionFace = {
                                  first: {
                                      x: x1,
                                      y: y1
                                  },
                                  second: {
                                      x: x2,
                                      y: y2
                                  }
                              };

                              mainBody.connectedBodies.push({
                                  body: otherBody,
                                  face: connectionFace
                              });

                              //If neither body is currently in a cluster, push them both in a new cluster
                              if (mainBody.inClusters === -1 && otherBody.inClusters === -1) {
                                  var cluster = [];
                                  cluster.push(mainBody.name);
                                  cluster.push(otherBody.name);
                                  var clusterId = this.clusters.push(cluster) - 1;
                                  mainBody.inClusters = clusterId;
                                  otherBody.inClusters = clusterId;
                              }
                              else if (otherBody.inClusters !== -1 && mainBody.inClusters !== -1 && mainBody.inClusters !== otherBody.inClusters) {
                                  var cluster = [];
                                  var clusterId = this.clusters.push(cluster) - 1;
                                  for (var ce = 0; ce < this.clusters[otherBody.inClusters].length; ce++) {
                                      var mergingEntity = game.getEntityManager().getEntityByName(this.clusters[otherBody.inClusters][ce]);

                                      if (this.clusters[clusterId].indexOf(mergingEntity.name) === -1) {
                                          this.clusters[clusterId].push(mergingEntity.name);
                                      }

                                      mergingEntity.inClusters = clusterId;
                                  }

                                  for (var ce = 0; ce < this.clusters[mainBody.inClusters].length; ce++) {
                                      var mergingEntity = game.getEntityManager().getEntityByName(this.clusters[mainBody.inClusters][ce]);

                                      if (this.clusters[clusterId].indexOf(mergingEntity.name) === -1) {
                                          this.clusters[clusterId].push(mergingEntity.name);
                                      }

                                      mergingEntity.inClusters = clusterId;
                                  }
                              }
                              else if (otherBody.inClusters !== -1 && mainBody.inClusters === -1) {
                                  mainBody.inClusters = otherBody.inClusters;
                                  this.clusters[otherBody.inClusters].push(mainBody.name);
                              } else if (mainBody.inClusters !== -1 && otherBody.inClusters === -1) {
                                  otherBody.inClusters = mainBody.inClusters;
                                  this.clusters[mainBody.inClusters].push(otherBody.name);
                              }

                              if (this.connectionFaces.indexOf(connectionFace) === -1) {
                                  var found = false;
                                  for (var f = 0; f < this.connectionFaces.length; f++) {
                                      var existingFace = this.connectionFaces[f].face;

                                      found = existingFace.first.x === connectionFace.first.x;
                                      found = existingFace.first.y === connectionFace.first.y && found;
                                      found = existingFace.second.x === connectionFace.second.x && found;
                                      found = existingFace.second.y === connectionFace.second.y && found;
                                      if (found) {
                                          break;
                                      }
                                  }

                                  if (!found) {
                                      this.createCircle(connectionFace.first);
                                      this.createCircle(connectionFace.second);
                                      this.connectionFaces.push(
                                          {
                                              face: connectionFace,
                                              bodies: [mainBody.name, otherBody.name],
                                              chained: false,
                                              chainCount: 0
                                          }
                                      )
                                      ;
                                  }
                              }
                          }
                      }
                  }
              }

              if (mainBody.inClusters === -1 && mainBody.hasGlue) {
                  mainBody.removeGlue();
              }

              if (mainBody.glueSource) {
                  mainBody.changed = true;
                  mainBody.applyGlue();
              }
          }
      }
      for (var c = 0; c < this.clusters.length; c++) {
          var clusterGlued = false;
          for (var cb = 0; cb < this.clusters[c].length; cb++) {
              var entity = game.getEntityManager().getEntityByName(this.clusters[c][cb]);

              if (entity.glueSource) {
                  clusterGlued = true;
                  break;
              }
          }

          for (var cb = 0; cb < this.clusters[c].length; cb++) {
              var entity = game.getEntityManager().getEntityByName(this.clusters[c][cb]);

              if (entity.glueSource) {
                  continue;
              }

              entity.changed = true;

              if (clusterGlued) {
                  entity.applyGlue();
              } else {
                  entity.removeGlue();
              }
          }
      }
//    this.drawConnectionFaces();
  }
});
