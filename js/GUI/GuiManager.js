(function(){
    "use strict";
    window.GuiManager = window.Class.extend({
        elements: [],
        init: function(){

        },
        addElement: function(guiElement, container) {
            if (guiElement instanceof window.BaseGuiElement) {
                this.elements.push(guiElement);
                if (container === undefined) {
                    container = window.Container.getComponent('Renderer').view.parentNode;
                }
                if (guiElement.htmlWrapper) {
                    container.appendChild(guiElement.htmlWrapper);
                }
                else {
                    container.appendChild(guiElement.htmlElement);
                }
                guiElement.inDom = true;
                guiElement.toDomCallback();
            }
        }
    });
})();
