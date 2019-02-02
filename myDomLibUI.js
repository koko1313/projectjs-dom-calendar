// нещо като override на push, за да му добавим event listener
var eventify = function(arr, callback) {
    arr.push = function(e) {
        Array.prototype.push.call(arr, e);
        callback();
    };
};

var year = 2019;
var month = 5;
var today = new Date().getDate();

// при добавяне на елемент в масива myDomLib.allElements
eventify(myDomLib.allElements, function() {
    var pushedElement = myDomLib.allElements[myDomLib.allElements.length-1];

    pushedElement.calendar = function(year, month) {
        if(year == undefined) {
            year = new Date().getFullYear();
        }

        if(month == undefined) {
            month = new Date().getMonth()+1;
        }

        pushedElement.append("table", "calendarTable");

        var daysInMoth = new Date(year, month, 0).getDate(); // броя на дните в месеца
        var firstDayOfMoth = new Date(year, month-1).getDay(); // първия ден от месеца (като дата)
        var currentDay = 1; // инициализираме първия ден (брояч), за да попълним календара 
        var endMonth = false;

        var table = myDomLib.get("#calendarTable");
        table.appendAttr("class", "calendar");
        table.appendHTML("<tr> <td id='prevMonthButton' class='calendar-buttons'> < </td> <td colspan='5' style='text-align: center'>" + "<input id='monthInput' class='calendar-inputs' value=" + month + ">." + "<input id='yearInput' class='calendar-inputs' value=" + year + ">" + "<button id='calendarGoToButton'>Go</button>" +"</td> <td id='nextMonthButton' class='calendar-buttons'> > </td> </tr>");
        table.appendHTML("<tr> <td>Пн</td> <td>Вт</td> <td>Ср</td> <td>Чт</td> <td>Пт</td> <td>Сб</td> <td>Нд</td> </tr>");

        myDomLib.get("#prevMonthButton").addEvent("click", function() {
            month--;
            if(month < 1) {
                month = 12;
                year--;
            }

            pushedElement.appendHTML("", true); // изчистваме предишния календар
            pushedElement.calendar(year, month);
        });

        myDomLib.get("#nextMonthButton").addEvent("click", function() {
            month++;
            if(month > 12) {
                month = 1;
                year++;
            }

            pushedElement.appendHTML("", true); // изчистваме предишния календар
            pushedElement.calendar(year, month);
        });

        myDomLib.get("#calendarGoToButton").addEvent("click", function() {
            var month = myDomLib.get("#monthInput").element.value;
            var year = myDomLib.get("#yearInput").element.value;
            pushedElement.appendHTML("", true); // изчистваме предишния календар
            pushedElement.calendar(year, month);
        });

        // до 6, защото ще break-нем цикъла, когато полълним всички дни
        for(var i=1; i<=6; i++) {
            // добавяме ред
            table.append("tr", "r"+i);
            var tr = myDomLib.get("#r"+i);

            for(var j=1; j<=7; j++) {
                // добавяме колона към реда
                tr.append("td", "r"+i+"c"+j);
                var td = myDomLib.get("#r"+i+"c"+j);

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
    };

});