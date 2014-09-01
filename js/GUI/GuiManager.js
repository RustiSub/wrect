(function(){
    "use strict";
    window.GuiManager = window.Class.extend({
        elements: [],
        init: function(){

        },
        addElement: function(guiElement, container) {
            if (guiElement instanceof window.BaseGui) {
                this.elements.push(guiElement);
                if (container === undefined) {
                    container = window.Container.getComponent('Renderer').view.parentNode;
                }
                container.appendChild(guiElement.htmlElement);
                guiElement.inDom = true;
                guiElement.toDomCallback();
            }
        }
    });
})();