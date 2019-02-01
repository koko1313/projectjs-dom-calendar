var myDomLib = {

    /** 
     * Взима елемент по id или class
     * @param {string} element id (#) или class (.)
     * @returns {object} връща намерения обект
    */
    get: function(element) {
        var elementType = element[0]; // взимаме типа на елемента (#/.)
        elementIdentificator = element.substring(1, element.length);

        switch(elementType) {
            case "#":
                return document.getElementById(elementIdentificator);
            case ".":
                return document.getElementsByClassName(elementIdentificator);
        }
    },

    /**
     * Добавя елемент към елемент
     * @param {string} id id на елемента, към който ще се добави
     * @param {string} element елемента, който ще се създаде
     * @param {string} elementId id на елемента, който ще се създаде
     */
    append: function(id, element, elementId) {
        var parentElement = this.get("#"+id);
        
        var newElement = document.createElement(element);
        
        if(elementId != undefined) {
            newElement.setAttribute("id", elementId);
        }

        parentElement.appendChild(newElement);
    },

    /**
     * Добавя текст в елемент
     * @param {string} id id на елемента, към който ще бъде добавен текста
     * @param {string} text текста, който ще се добави
     * @param {boolean} replace да бъде ли заместен съществуващия текст
     */
    appendText: function(id, text, replace) {
        var parentElement = this.get("#"+id);

        if(replace) {
            // изтриваме всички child елементи
            while (parentElement.firstChild) {
                parentElement.removeChild(parentElement.firstChild);
            }
        }

        var textNode = document.createTextNode(text);
        parentElement.appendChild(textNode);
    },

    /**
     * Връща текста, който се съдържа в елемента
     * @param {string} id id на елемента, на който ще вземем текста
     * @returns {string} текста, който се съдържа в елемента
     */
    getText: function(id) {
        var element = this.get("#"+id);
        return element.innerText;
    },

    /**
     * Добавя HTML към елемент
     * @param {string} id id на елемента, към който ще бъде добавен html-а
     * @param {string} html html-а, който ще се добави
     * @param {boolean} replace да бъде ли заместен съществуващия HTML
     */
    appendHTML: function(id, html, replace) {
        var parentElement = this.get("#"+id);

        if(replace) {
            parentElement.innerHTML = html;
        } else {
            parentElement.innerHTML += html;
        }

    },

    /**
     * Връща HTML-а, който се съдържа в елемента
     * @param {string} id id на елемента, на който ще вземем HTML-а
     * @returns {string} HTML-a, който се съдържа в елемента
     */
    getHTML: function(id) {
        var element = this.get("#"+id);
        return element.innerHTML;
    },

    /**
     * Добавя атрибут към елемент
     * @param {string} id id на елемента, към който ще бъде добавен атрибут
     * @param {string} attr атрибута, който ще бъде добавен
     * @param {string} attrValue стойността на атрибута
     */
    appendAttr: function(id, attr, attrValue) {
        var element = this.get("#"+id);
        element.setAttribute(attr, attrValue);
    },

    /**
     * Добавя стил към елемент
     * @param {string} id id на елемента, към който ще бъде добавен стила
     * @param {object} styleCollection масив с колекции от вида {property: "color", value: "red"}
     */
    setStyle: function(id, styleCollection){
        var element = this.get("#"+id);

        for(var i=0; i<styleCollection.length; i++) {
            element.style.setProperty(styleCollection[i].property, styleCollection[i].value);
        }
    },

    /**
     * Връща родителския елемент
     * @param {*} id id на елемента, на който ще върне родителския елемент
     * @returns {object} родителския елемент
     */
    getParent: function(id) {
        var element = this.get("#"+id);
        return element.parentElement;
    },

    /**
     * Връща следващия съседен елемент
     * @param {string} id id на елемента, на който ще върне следващия
     * @returns {object} следващия елемент
     */
    getNextSibling: function(id) {
        var element = this.get("#"+id);
        return element.nextElementSibling;
    },

    /**
     * Връща предишния съседен елемент
     * @param {string} id id на елемента, на който ще върне предишния
     * @returns {object} предишния елемент
     */
    getPreviousSibling: function(id) {
        var element = this.get("#"+id);
        return element.previousElementSibling;
    },

    /**
     * Връща децата на елемент
     * @param {string} id id на елемента, на който ще върне децата
     * @returns {Array} масив с елементите, които са деца
     */
    getChildrens: function(id) {
        var element = this.get("#"+id);
        return element.children;
    }
};

myDomLib.appendText("div1", "sad---");
myDomLib.appendText("div1", "dd", true); // презаписва съществуващия текст

myDomLib.getText("div1");


myDomLib.append("div1", "div", "myDiv");
myDomLib.appendAttr("myDiv", "class", "myClass");
myDomLib.appendAttr("myDiv", "class", "myClass2"); // презаписваме атрибута

myDomLib.appendHTML("div2", "<h1>asd</h1>");
myDomLib.appendHTML("div2", "<h3>asd3</h3>", true); // презаписва HTML-а

myDomLib.getHTML("div1");

myDomLib.setStyle("div1", [
    {property: "border", value: "10px solid black"},
    {property: "background", value: "red"},
]);

// презаписваме стила на рамката
myDomLib.setStyle("div1", [
    {property: "border", value: "1px solid black"},
]);

myDomLib.getParent("myDiv");

myDomLib.getNextSibling("list1");
myDomLib.getPreviousSibling("list2");

myDomLib.getChildrens("div3");