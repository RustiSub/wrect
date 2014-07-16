var Builder = Class.extend({

  connectedClusters: [],
  connectionFaces: [],

  createLine: function (points) {
    var graphics = new PIXI.Graphics();

// begin a green fill...
    graphics.beginFill(0x00FF00, 0.5);

// draw a triangle using lines
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

    game.getEntityManager()._stage.addChild(graphics);
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

    return block;
  },

  createBlock: function (name, x, y, width, height, color) {
    color = typeof color !== 'undefined' ? color : 0x00FF00;

    var blockGraphics = new PIXI.Graphics();

    var block = new Block(name, blockGraphics);
    block.name = name;
    block.position = blockGraphics.position;

    block.baseGraphicsCallback = function() {
      block._graphics.beginFill(color);
      block._graphics.drawRect(0, 0, width, height);
      block._graphics.endFill();
    };

    block.selectedGraphicsCallback = function() {
      block._graphics.beginFill(0xFF0000);
      block._graphics.drawRect(0 - 1, 0- 1, width + 2, height + 2);
      block._graphics.endFill();

      block.baseGraphicsCallback();
    };

    block.baseGraphicsCallback();

    block.size = {x: width, y: height};

    blockGraphics.position.x = x;
    blockGraphics.position.y = y;

    block.frozen = false;

    return block;
  },

  createCircle: function (name) {
    var radius = 20;
    var circleGraphics = new PIXI.Graphics();

    var circle = new Block(name, circleGraphics);
    circle.name = name;
    circle.position = circleGraphics.position;

    circle.baseGraphicsCallback = function() {
      circleGraphics.beginFill(0x00FF00);
      circleGraphics.drawCircle(0, 0, radius);
      circleGraphics.endFill();
    };

    circle.selectedGraphicsCallback = function() {
      circle._graphics.beginFill(0xFF0000, 90);
      circle._graphics.drawCircle(0,0, radius + 1);
      circle._graphics.endFill();

      circle.baseGraphicsCallback();
    };

    circle.baseGraphicsCallback();

    circle.size = {x: radius, y:radius};

    circleGraphics.position.x = 120;
    circleGraphics.position.y = 50;

    return circle;
  },

  createTriangle: function(name) {
    var color = typeof color !== 'undefined' ? color : 0xFFFFFF;

    var graphics = new PIXI.Graphics();

    var triangle = new Triangle(name, graphics);
    triangle.name = name;
    triangle.position = graphics.position;

    triangle.baseGraphicsCallback = function() {
      triangle._graphics.beginFill(color);
      triangle._graphics.lineTo(20,20);
      triangle._graphics.endFill();
    };

    triangle.baseGraphicsCallback();

    triangle.size = {x: width, y: height};

    graphics.position.x = x;
    graphics.position.y = y;

    triangle.frozen = false;

    return triangle;
  },
  drawConnectionFaces: function() {
    var points = [];
    var chain = [];
    this.sortFaces(this.connectionFaces[0], chain, points);

    this.createLine(points);
  },
  sortFaces: function(originFace, chain, points) {
    for (var f = 0; f < this.connectionFaces.length; f++) {
      if (originFace === this.connectionFaces[f]) {
        continue;
      }
      //No faces match
      if (this.connectionFaces[f].bodies[0] !== originFace.bodies[1] && this.connectionFaces[f].bodies[1] !== originFace.bodies[1]) {
        continue;
      }

      if (chain.indexOf(originFace) === -1) {
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
        this.sortFaces(this.connectionFaces[f], chain, points);
        break;
      }
    }
  },
  buildConnections: function(bodies) {
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
                  this.connectionFaces.push(
                      {
                        face: connectionFace,
                        bodies: [mainBody.name, otherBody.name]
                      }
                  )
                  ;
                }
              }
            }
          }
        }
      }
    }

    //this.buildConnectedClusters(bodies);
    this.drawConnectionFaces();
  }
});
