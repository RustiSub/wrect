window.onload = function() {
    var game = new Game();
    var player = new Player('player', {x: 200, y: 200}, 'resources/player.png', true, {speed: 5, health: 5});
    var otherSprite = new MovableEntity('other', {x: 400, y: 200}, 'resources/player.png', true, {speed: 1, health: 1});

    game.getEntityManager().addEntity(player);
    game.getEntityManager().addEntity(otherSprite);
};
