# Календара на бъдещето
Университетски проект по "JavaScript в дълбочина".

## Файлове
- **index.html**
- **script.js** - *Клиентския скритпов файл, чрез него клиента ще работи с библиотеката*
- **style.css** - *Стиловете за UI компонентите*
- **myDomLib.js** - *Библиотеката за работа с DOM дървото*
- **myDomLibUI.js** - *UI библиотеката*

## myDomLib.js - Функционалности с примери

> var myElement ще съдържа взетия, чрез метода myDomLib.get(element) елемент

**Взимане на елемент от DOM дървото**
```javascript
var myElement = myDomLib.get(element); // element - id (#), class (.) или атрибут ([attribure])
```

**Взимане на поделемент от DOM дървото**
```javascript
var mySubElement = myElement.get(element); // element - id (#) или class (.)
```

**Добавяне на елемент в DOM дървото**
```javascript
// element - елемента като string (например "ul")
// elementId - id на новия елемент (не е задължително)
// връща добавения елемент
myElement.append(element, elementId);
```

**Добавяне на текст към елемент**
```javascript
// text - текста, който ще се добави
// replace - true (да се замести вече съществуващия) / false (да се прибави към вече съществуващия). По подразбиране е false
myElement.appendText(text, replace);
```

**Взимане на текст от елемент**
```javascript
var text = myElement.getText();
```

**Добавяне на HTML към елемент**
```javascript
// html - html-а, който ще се добави
// replace - true (да се замести вече съществуващия) / false (да се прибави към вече съществуващия). По подразбиране е false
myElement.appendHTML(html, replace);
```

**Взимане на HTML от елемент**
```javascript
var text = myElement.getHTML();
```

**Добавяне на атрибут към елемент**
```javascript
// attr - името на атрибута
// attrValue - стойността на атрибута
myElement.appendAttr(attr, attrValue);
```

**Добавяне на клас към елемент**
```javascript
// className - името на класа
myElement.appenClass(cnassName);
```

**Премахване на клас от елемент**
```javascript
// className - името на класа
myElement.removeClass(cnassName);
```

**Добавяне на стил към елемент**
```javascript
// styleCollection - масив с колекции от вида {property: "color", value: "red"}
myElement.setStyle(styleCollection);
```

**Взимане на родителския елемент**
```javascript
var parentElement = myElement.getParent();
```

**Взимане на следващия съседен елемент**
```javascript
var nextSibling = myElement.getNextSibling();
```

**Взимане на предишния съседен елемент**
```javascript
var previousSibling = myElement.getPreviousSibling();
```

**Взимане на децата на елемент**
```javascript
var childrenCollection = myElement.getChildren(); // връща масив с елементите, които са деца
```

**Добавяне на събитие към елемент**
```javascript
// event - събитие
// callback - callback функция
myElement.addEvent(event, callback);
```

## myDomLibUI.js - Функционалности с примери
**Указване на календар**
> ако myElement е от тип input - календара става date picker
```javascript
myElement.calendar(); // календар с текущата дата
myElement.calendar(year, month); // календар с указани година и месец

// календар със списък от събития
myElement.calendar([
    {day: 1, month: 1, year: 2019, event: "Event name"},
    {day: 2, month: 1, year: 2019, event: "Event name 2"},
]);
```