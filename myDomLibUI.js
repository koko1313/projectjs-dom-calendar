// нещо като override на push, за да му добавим event listener
var eventify = function(arr, callback) {
    arr.push = function(e) {
        Array.prototype.push.call(arr, e);
        callback();
    };
};

var globalMonth;
var globalYear;

var calendar = {
    /**
     * Създава календара в подадения елемент
     * @param {object} pushedElement елемента, в който ще се създава календара
     * @returns {object} html table, представляваща календара
     */
    drawCalendar: function(pushedElement) {
        var calendarTable = pushedElement.append("table");
        calendarTable.appendAttr("class", "calendar");
        calendarTable.appendHTML("<tr> <td id='prevMonthButton' class='calendar-buttons'> < </td> <td colspan='5' style='text-align: center'>" + "<input id='monthInput' class='calendar-inputs' value=" + globalMonth + ">." + "<input id='yearInput' class='calendar-inputs' value=" + globalYear + ">" + "<button id='calendarGoToButton'>Go</button>" +"</td> <td id='nextMonthButton' class='calendar-buttons'> > </td> </tr>");
        calendarTable.appendHTML("<tr> <td>Пн</td> <td>Вт</td> <td>Ср</td> <td>Чт</td> <td>Пт</td> <td>Сб</td> <td>Нд</td> </tr>");
        
        this.addEvents(pushedElement); // добавяме събитията към бутоните

        var today = new Date().getDate();
        var daysInMoth = new Date(globalYear, globalMonth, 0).getDate(); // броя на дните в месеца
        var firstDayOfMoth = new Date(globalYear, globalMonth-1).getDay(); // първия ден от месеца (като ден от седмицата)
        var currentDay = 1; // инициализираме първия ден (брояч), за да попълним календара 
        var endMonth = false;

        // до 6, защото ще break-нем цикъла, когато полълним всички дни
        for(var i=1; i<=6; i++) {
            // добавяме ред
            var tr = calendarTable.append("tr");

            for(var j=1; j<=7; j++) {
                // добавяме колона към реда
                var td = tr.append("td");

                // отбелязваме днешния ден
                if(currentDay == today) {
                    td.appendAttr("class", "today");
                }

                // за да стартираме на правилния ден от седмицата
                if(currentDay == 1) {
                    if(firstDayOfMoth > j) {
                        continue;
                    }
                }

                // добавяме текст към колоната
                if(currentDay <= daysInMoth) {
                    td.appendText(currentDay);
                }

                if(currentDay == daysInMoth) {
                    endMonth = true;
                }

                currentDay++;
            }

            if(endMonth) break;
        }

        return calendarTable;
    },

    addEvents: function(pushedElement) {
        myDomLib.get("#prevMonthButton").addEvent("click", function() {

            globalMonth--;
            if(globalMonth < 1) {
                globalMonth = 12;
                globalYear--;
            }

            pushedElement.appendHTML("", true); // изчистваме предишния календар
            pushedElement.calendar(globalYear, globalMonth);
        });

        myDomLib.get("#nextMonthButton").addEvent("click", function() {
            globalMonth++;
            if(globalMonth > 12) {
                globalMonth = 1;
                globalYear++;
            }

            pushedElement.appendHTML("", true); // изчистваме предишния календар
            pushedElement.calendar(globalYear, globalMonth);
        });

        myDomLib.get("#calendarGoToButton").addEvent("click", function() {
            var month = myDomLib.get("#monthInput").element.value;
            var year = myDomLib.get("#yearInput").element.value;
            pushedElement.appendHTML("", true); // изчистваме предишния календар
            pushedElement.calendar(year, month);
        });
    },
};

// при добавяне на елемент в масива myDomLib.allElements
eventify(myDomLib.allElements, function() {
    var pushedElement = myDomLib.allElements[myDomLib.allElements.length-1];

    pushedElement.calendar = function(year, month) {
        if(year == undefined) {
            globalYear = new Date().getFullYear();
        } else {
            globalYear = year;
        }

        if(month == undefined) {
            globalMonth = new Date().getMonth()+1;
        } else {
            globalMonth = month;
        }

        // рисуваме си календара
        calendar.drawCalendar(pushedElement);
    };

});