// нещо като override на push, за да му добавим event listener
var eventify = function(arr, callback) {
    arr.push = function(e) {
        Array.prototype.push.call(arr, e);
        callback();
    };
};

var monthNow;
var yearNow;
var dayNow;
var isInput;

var calendar = {
    /**
     * Създава календара в подадения елемент
     * @param {object} pushedElement елемента, в който ще се създава календара
     * @returns {object} html table, представляваща календара
     */
    drawCalendar: function(pushedElement, isDatePicker) {
        var calendarTable = pushedElement.append("table");
        calendarTable.appendClass("calendar");

        this.addCalendarControls(calendarTable, pushedElement);

        this.addCalendarDaysTitle(calendarTable);

        dayNow = new Date().getDate();
        var daysInMoth = new Date(yearNow, monthNow, 0).getDate(); // броя на дните в месеца
        var firstDayOfMoth = new Date(yearNow, monthNow-1).getDay(); // първия ден от месеца (като ден от седмицата)
        var currentDay = 1; // инициализираме първия ден (брояч), за да попълним календара 
        var endMonth = false;

        // до 6, защото ще break-нем цикъла, когато полълним всички дни
        for(var i=1; i<=6; i++) {
            // добавяме ред
            var tr = calendarTable.append("tr");

            for(var j=1; j<=7; j++) {
                // добавяме колона към реда
                var td = tr.append("td");
                    td.appendClass("calendar-day")

                // отбелязваме днешния ден
                if(currentDay == dayNow) {
                    td.appendClass("today");
                }

                // за да стартираме на правилния ден от седмицата
                if(currentDay == 1) {
                    if(firstDayOfMoth > j) {
                        continue;
                    }
                }

                // добавяме текст към колоната
                if(currentDay <= daysInMoth) {
                    // числото на деня
                    var span = td.append("span");
                        span.appendText(currentDay);
                        span.appendClass("calendar-day-label");

                    // атрибут, за да като цъкнем да го вземем на кой ден сме
                    td.appendAttr("day", currentDay);
                    
                    // div за събитията
                    var div = td.append("div", "day" + currentDay);
                        div.appendClass("calendar-day-event");

                    if(isDatePicker) {
                        // click listener, за да попълва input-а
                        td.addEvent("click", function() {
                            dayNow = this.getAttribute("day");
                            var input = myDomLib.get("[datePicker]").element;
                            input.value = dayNow + "." + monthNow + "." + yearNow;
                            myDomLib.get("#datePicker").removeClass("display-block");
                            myDomLib.get("#datePicker").appendClass("display-none");
                        });
                    } else {
                        // click listener, за да показва pop-up-а
                        td.addEvent("click", function() {
                            
                            // ###########################################################
                            dayNow = this.getAttribute("day");

                            var popupDayNow = myDomLib.get("#popupDayNow");
                            popupDayNow.appendText(dayNow + "." + monthNow + "." + yearNow, true);

                            var popupEventList = myDomLib.get("#popupEventList");
                            
                            if(popupEventList.getText().length == 0) {
                                popupEventList.appendText("Няма събития");
                            }
                            // ###########################################################

                            myDomLib.get("#popup").removeClass("popup-hidden");
                            myDomLib.get("#popup").appendClass("popup");
                        });
                    }
                }

                if(currentDay == daysInMoth) {
                    endMonth = true;
                }

                currentDay++;
            }

            if(endMonth) break;
        }

        this.createPopup(pushedElement);

        return calendarTable;
    },

    createPopup: function(pushedElement) {
        var popup = pushedElement.append("div", "popup"); // добавяме popup
            popup.appendClass("popup-hidden"); // скриваме го

            popup.append("h1", "popupDayNow");
            popup.append("p", "popupEventList");

        var popupCloseButton = popup.append("button"); // close бутон
            popupCloseButton.appendText("Close");
            popupCloseButton.addEvent("click", function() {
                popup.removeClass("popup");
                popup.appendClass("popup-hidden");
            });
    },

    /**
     * Добавя контролите на календара (предишен, следващ месец, ...)
     * @param {object} calendarTable
     * @param {object} pushedElement
     */
    addCalendarControls: function(calendarTable, pushedElement) {
        var tr = calendarTable.append("tr");

        // previous month бутона
        var previousMonthButton = tr.append("td", "prevMonthButton");
            previousMonthButton.appendClass("calendar-buttons");
            previousMonthButton.appendText("<");
            
            previousMonthButton.addEvent("click", function(){
                monthNow--;
                if(monthNow < 1) {
                    monthNow = 12;
                    yearNow--;
                }

                pushedElement.appendHTML("", true); // изчистваме предишния календар
                pushedElement.calendar(yearNow, monthNow);
            });

        // колона с input полетата на календара
        var td = tr.append("td");
            td.appendAttr("colspan", "5");
            td.appendAttr("style", "text-align: center");

        // input с месеца
        var input = td.append("input", "monthInput");
            input.appendClass("calendar-inputs");
            input.appendAttr("value", monthNow);

        // input с годината
        var input = td.append("input", "yearInput");
            input.appendClass("calendar-inputs");
            input.appendAttr("value", yearNow);

        // бутона на календара
        var button = td.append("button", "calendarGoToButton");
            button.appendText("Go");

            button.addEvent("click", function() {
                var month = myDomLib.get("#monthInput").element.value;
                var year = myDomLib.get("#yearInput").element.value;
                pushedElement.appendHTML("", true); // изчистваме предишния календар
                pushedElement.calendar(year, month);
            });

        // next month бутона
        var nextMonthButton = tr.append("td", "nextMonthButton");
            nextMonthButton.appendClass("calendar-buttons");
            nextMonthButton.appendText(">");

            nextMonthButton.addEvent("click", function() {
                monthNow++;
                if(monthNow > 12) {
                    monthNow = 1;
                    yearNow++;
                }

                pushedElement.appendHTML("", true); // изчистваме предишния календар
                pushedElement.calendar(yearNow, monthNow);
            });
    },

    addCalendarDaysTitle: function(calendarTable) {
        var tr = calendarTable.append("tr");

        var td = tr.append("td");
            td.appendText("Пн");
            td.appendClass("calendar-day-title");

        var td = tr.append("td");
            td.appendText("Вт");
            td.appendClass("calendar-day-title");

        var td = tr.append("td");
            td.appendText("Ср");
            td.appendClass("calendar-day-title");

        var td = tr.append("td");
            td.appendText("Чт");
            td.appendClass("calendar-day-title");

        var td = tr.append("td");
            td.appendText("Пт");
            td.appendClass("calendar-day-title");

        var td = tr.append("td");
            td.appendText("Сб");
            td.appendClass("calendar-day-title");

        var td = tr.append("td");
            td.appendText("Нд");
            td.appendClass("calendar-day-title");
    },
};

// при добавяне на елемент в масива myDomLib.allElements
eventify(myDomLib.allElements, function() {
    var pushedElement = myDomLib.allElements[myDomLib.allElements.length-1];

    pushedElement.calendar = function(year, month) {
        if(year == undefined) {
            yearNow = new Date().getFullYear();
        } else {
            yearNow = year;
        }

        if(month == undefined) {
            monthNow = new Date().getMonth()+1;
        } else {
            monthNow = month;
        }

        if(pushedElement.element.nodeName == "INPUT" || isInput) {
            var parent = pushedElement.getParent();

            // прикачваме атрибут на input-а
            pushedElement.appendAttr("datePicker", "true");
            
            pushedElement.addEvent("focus", function() {
                datePicker.removeClass("display-none");
                datePicker.appendClass("display-block");
            });

            var datePicker = myDomLib.get("#datePicker");
            if(datePicker.element == null) {
            var datePicker = parent.append("div", "datePicker");
                    datePicker.appendClass("date-picker");
                    datePicker.appendClass("display-none");
            }

            // рисуваме си календара като datePicker (true)
            calendar.drawCalendar(datePicker, true);

            isInput = true;
        } else {
            // рисуваме си календара
            calendar.drawCalendar(pushedElement);
        }
    };

});