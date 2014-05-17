window.onload = function() {
    var game = new Game();

    var texture = PIXI.Texture.fromImage('resources/player.png', false, PIXI.scaleModes.NEAREST);
    var playerFrame = new PIXI.Texture(texture, {x: 0, y: 0, width: 64, height: 64});

    var player = new Player('player', {x: 200, y: 200}, 'resources/player.png', true, {speed: 5});

    game.getEntityManager().addEntity(player);
};