(function() {
  "use strict";

  wrect.ECS = wrect.ECS || {};
  wrect.ECS.Assemblage = wrect.ECS.Assemblage || {};
  wrect.ECS.Assemblage.Map = wrect.ECS.Assemblage.Map || {};

  var Entity = wrect.ECS.Entity;
  var Rectangle = wrect.Geometry.Rectangle;
  var Vector3 = wrect.Physics.Vector3;

  /**
   * @param options
   * @returns {wrect.ECS.Entity|wrect.ECS.Entity}
   * @constructor
   */
  wrect.ECS.Assemblage.Map.Terrain = function (options) {
    this.entity = new Entity({eventManager: options.eventManager});
    this.entity.test = true;

    var visualComponent = new wrect.ECS.Component.Visual({
      color: options.color,
      alpha: options.alpha,
      useSprite: options.useSprite,
      shape: new Rectangle({
        origin: options.position,
        dimension: options.dimension,
        material: options.material
      }),
      renderer: options.renderer
    });
    visualComponent.graphics.castShadow = true;
    visualComponent.graphics.receiveShadow = true;
    this.entity.addComponent(visualComponent);

    var coord = new wrect.ECS.Component.Map.Coord({
      coord: new Vector3(0, 0, 0),
      size: 50
    });
    coord.targetCoord = options.coord;
    this.entity.addComponent(coord);
  };
}());
