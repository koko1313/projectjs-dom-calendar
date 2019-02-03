var myDomLib = {

    /**
     * Съдържа всички елементи, създадени от библиотеката
     */
    allElements: [],

    /**
     * Връща елемент по зададено id
     * @param {string} element #id или .class на елемента (при .class връща само първия срещнат)
     * @returns {object} връща обекта, съдържащ елемента, заедно с всички негови методи
     */
    get: function(element) {
        var elementObject = {

            element: null, // ще съхранява самия елемент

            // set-ва елемента
            set: function(element) {
                if(element[0] == "#" || element[0] == ".") {
                    elementObject.element = document.querySelector(element);
                } else {
                    elementObject.element = element;
                }
            },

            // и тук има функция get, за да може да се прави вложен get
            get: function(element) {
                // проверяваме дали търсения елемент се намира вътре в текущия
                if(this.element.querySelector(element)) {
                    return myDomLib.get(element);
                }
            },

            /**
             * Добавя елемент
             * @param {string} element елемента, който ще се създаде
             * @param {string} elementId id на елемента, който ще се създаде
             * @returns {object} връща добавения елемент като обект от вида на myDomLib
             */
            append: function(element, elementId) {
                var parentElement = this.element;
                
                var newElement = document.createElement(element);
                
                if(elementId != undefined) {
                    newElement.setAttribute("id", elementId);
                }

                parentElement.appendChild(newElement);
                return myDomLib.get(newElement);
            },

            /**
             * Добавя текст
             * @param {string} text текста, който ще се добави
             * @param {boolean} replace да бъде ли заместен съществуващия текст
             */
            appendText: function(text, replace) {
                var parentElement = this.element;

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
             * @returns {string} текста, който се съдържа в елемента
             */
            getText: function() {
                return this.element.innerText;
            },

            /**
             * Добавя HTML
             * @param {string} html html-а, който ще се добави
             * @param {boolean} replace да бъде ли заместен съществуващия HTML
             */
            appendHTML: function(html, replace) {
                var parentElement = this.element;

                if(replace) {
                    parentElement.innerHTML = html;
                } else {
                    parentElement.innerHTML += html;
                }
            },

            /**
             * Връща HTML-а, който се съдържа в елемента
             * @returns {string} HTML-a, който се съдържа в елемента
             */
            getHTML: function() {
                return this.element.innerHTML;
            },

            /**
             * Добавя атрибут
             * @param {string} attr атрибута, който ще бъде добавен
             * @param {string} attrValue стойността на атрибута
             */
            appendAttr: function(attr, attrValue) {
                this.element.setAttribute(attr, attrValue);
            },

            /**
             * Добавя клас към елемент
             * @param {string} className името на класа
             */
            appendClass: function(className) {
                this.element.classList.add(className);
            },

            /**
             * Премахва клас от елемент
             * @param {string} className името на класа
             */
            removeClass: function(className) {
                this.element.classList.remove(className);
            },

            /**
             * Добавя стил към елемент
             * @param {object} styleCollection масив с колекции от вида {property: "color", value: "red"}
             */
            setStyle: function(styleCollection) {
                for(var i=0; i<styleCollection.length; i++) {
                    this.element.style.setProperty(styleCollection[i].property, styleCollection[i].value);
                }
            },

            /**
             * Връща родителския елемент
             * @returns {object} родителския елемент
             */
            getParent: function() {
                return this.element.parentElement;
            },

            /**
             * Връща следващия съседен елемент
             * @returns {object} следващия елемент
             */
            getNextSibling: function() {
                return this.element.nextElementSibling;
            },

            /**
             * Връща предишния съседен елемент
             * @returns {object} предишния елемент
             */
            getPreviousSibling: function() {
                return this.element.previousElementSibling;
            },

            /**
             * Връща децата на елемент
             * @returns {Array} масив с елементите, които са деца
             */
            getChildren: function() {
                return this.element.children;
            },

            /**
             * Добавя събитие на елемент
             * @param {string} event събитие
             * @param {string} callback callback функция
             */
            addEvent: function(event, callback) {
                this.element.addEventListener(event, callback);
            },
        };

        elementObject.set(element);
        this.allElements.push(elementObject);
        return elementObject;
    },
};