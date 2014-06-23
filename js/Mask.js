window.Mask = Class.extend({
    mask: {},
    color: null,
    time: null,
    init: function(mask, color, stage) {
        this.mask = mask;
        mask.beginFill();
        mask.drawRect(0, 0, 1280, 720);
        mask.endFill();
        stage.addChild(mask);
    }
});