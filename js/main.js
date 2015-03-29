var wrect = {};

window.onload = function() {

  var game = new wrect.Game();
  game.bootstrap();
  game.run();

  new wrect.ECS.Assemblage.Block({
    x: 0,
    y: 0,
    w: 100,
    h: 100,
    color: 0x000000,
    alpha: 1,
    renderer: game.getRenderer(),
    eventManager: game.getEventManager()
  });
};
