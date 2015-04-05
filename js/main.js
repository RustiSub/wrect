var wrect = {};
var game;

window.onload = function() {

  game = new wrect.Game();
  game.bootstrap();
  game.run();

  function createBlock(options) {
    var block = new wrect.ECS.Assemblage.Block({
      x: options.x,
      y: options.y,
      w: options.w,
      h: options.h,
      color: 0x000000,
      alpha: 1,
      renderer: game.getRenderer(),
      eventManager: game.getEventManager(),
      frozen: options.frozen
    });
    game.getEntityManager().addEntity(block.entity);

    return block.entity;
  }
  //
  //createBlock({
  //  x: 0,
  //  y: 0,
  //  w: 300,
  //  h: 5,
  //  frozen: 1
  //});
  //
  //createBlock({
  //  x: 300,
  //  y: 0,
  //  w: 5,
  //  h: -200,
  //  frozen: 1
  //});
  //
  //createBlock({
  //  x: 0,
  //  y: -200,
  //  w: 300,
  //  h: 5,
  //  frozen: 1
  //});
  //
  //createBlock({
  //  x: 0,
  //  y: 0,
  //  w: 5,
  //  h: -200,
  //  frozen: 1
  //});
  //
  //var block = createBlock({
  //  x: 0,
  //  y: 0,
  //  w: 20,
  //  h: 10
  //});

// block.components.RigidBody.gravity = true;
//  block.components.RigidBody.physicsBody.f = new wrect.Physics.Vector(10, 12);

  //var material = new THREE.LineBasicMaterial({
  //  color: 0xFFFFFF
  //});
  //
  //var geometry = new THREE.Geometry();
  //geometry.vertices.push(new THREE.Vector3(-10, 0, 0));
  //geometry.vertices.push(new THREE.Vector3(-10, 100, 0));
  //
  //var line = new THREE.Line(geometry, material);
  //
  //game.getSceneManager().getScene().add(line);

  var loader = new THREE.ColladaLoader();

  loader.options.convertUpAxis = true;

  //loader.load( 'models/mouse_1.dae', function ( collada ) {
  //loader.load( 'models/mouse_animated_walk.dae', function ( collada ) {
  loader.load( 'models/mouse_walk_test.dae', function ( collada ) {
    //dummy1.dae

    var dae = collada.scene;

    var skin = collada.skins[ 0 ];

    dae.position.set(0,0,0);//x,z,y- if you think in blender dimensions ;)
    dae.scale.set(10, 10, 10);
    dae.rotation.y = 90 * Math.PI / 180;

    dae.traverse( function ( child ) {

      if ( child instanceof THREE.SkinnedMesh ) {

        var animation = new THREE.Animation( child, child.geometry.animation );
        animation.play();

      }

    } );
    dae.updateMatrix();
    game.getSceneManager().getScene().add(dae);
  });
};
