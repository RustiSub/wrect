var Builder = Class.extend({

  connectedClusters: [],

  createLine: function (points) {
    var graphics = new PIXI.Graphics();

// begin a green fill...
    graphics.beginFill(0x00FF00);

// draw a triangle using lines
    var startPoint;
    for (var x = 0; x < points.length; x++) {
      var point = points[x];
      if (x === 0) {
        console.log('moveTo', point.x, point.y);
        graphics.moveTo(point.x, point.y);
        startPoint = point;
      }
      else {
        console.log('lineTo', point.x, point.y);
        graphics.lineTo(point.x, point.y);
      }
    }

    console.log('lineTo start', startPoint.x, startPoint.y);
    graphics.lineTo(startPoint.x, startPoint.y);

// end the fill
    graphics.endFill();

// add it the stage so we see it on our screens..
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

  buildConnectedClusters: function(bodies) {
    var clusterCounter = 0;
    for (var x = 0; x < bodies.length; x++) {
      var mainBody = bodies[x];
      if (mainBody.connected) {
        continue;
      }

      var connectedBodies = [];
      connectedBodies = this.getConnectedBodies(mainBody, connectedBodies);
      if (connectedBodies.length > 0) {
        connectedBodies.push(mainBody);
        clusterCounter += 1;
        this.connectedClusters.push({
          id: clusterCounter,
          bodies: connectedBodies
        });
      }
    }

    for (var b = 0; b < this.connectedClusters.length; b++) {
      var points = [];
      var clusterBodies = this.connectedClusters[b].bodies;
      for (var cp = 0; cp < clusterBodies.length; cp++) {
        var connectionPoint = clusterBodies[cp].connectionPoint;
        console.log(clusterBodies[cp].name);
        var point = {
          x: connectionPoint.x,
          y: connectionPoint.y
        };
        console.log(point);
        points.push(point);
      }

      this.createLine(points);
    }

    console.log(this.connectedClusters);
  },
  getConnectedBodies: function(body, connectedBodies) {
    body.connected = true;
    if (body.connectedBodies.length > 0) {
      for (var x = 0; x < body.connectedBodies.length; x++) {
        var connectedBody = body.connectedBodies[x];
        if (!connectedBody.connected) {
          connectedBodies.push(connectedBody);
          this.getConnectedBodies(connectedBody, connectedBodies);
        }
      }
    }

    return connectedBodies;
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

              var connectingFace = {
                first: {
                  x: 0,
                  y: 0
                },
                second: {
                  x: 0,
                  y: 0
                }
              };

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

              /*              mainBody.connectedBodies.push(otherBody);
               mainBody.connectionPoint = {
               x: face.x2.x,
               y: face.x2.y
               };
               */

              if (x1 !== null && x2 !== null) {
                this.createLine(
                    [
                      {
                        x: x1,
                        y: y1
                      },
                      {
                        x: x2,
                        y: y2
                      },
                      {
                        x: x2,
                        y: y2 + 5
                      },
                      {
                        x: x1,
                        y: y1 + 5
                      },
                    ]
                );
              }
            }
          }
        }
      }
    }

    //this.buildConnectedClusters(bodies);
  }
});
