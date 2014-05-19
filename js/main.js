window.onload = function() {
    var game = new Game();
    var player = new Player('player', {x: 200, y: 200}, 'resources/player.png', true, {speed: 5});

    game.getEntityManager().addEntity(player);
};