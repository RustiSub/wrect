(function(){
    "use strict";
    window.GuiManager = window.Class.extend({
        elements: [],
        init: function(){

        },
        addElement: function(guiElement, container) {
            if (guiElement instanceof BaseGui) {
                this.elements.push(guiElement);
                if (container === undefined) {
                    container = document.body;
                }
                container.appendChild(guiElement.htmlElement);
            }
        }
    });
})();