
function renderCal() {
  var month = Calendar.monthDates();
  console.log(month)
}

function renderCalendar() {
  var list = "";
  var l = document.getElementById("calendar");

  for (x = 0; x < 5; x++) {
    list += "<tr>";
    for (y = 0; y < 7; y++) {
      var date = x * 7 + y + 1;

      list += "<td class='day' value=' + date + '>";
      list +=
        '<button type="button" class="btn" data-bs-toggle="modal" data-bs-target="#exampleModal" value=" + date + ">';
      list += date;
      list += "</button>";
      list += "</td>";
    }
    list += "</tr>";
  }
  l.innerHTML = list;
  console.log();
}

renderCalendar();


var Calendar = function Calendar(firstWeekDay) {
  //properties
  this.firstWeekDay = firstWeekDay || 0; // 0 = Sunday
};

Calendar.prototype = {
  constructor: Calendar,
  weekStartDate: function weekStartDate(date) {
    var startDate = new Date(date.getTime());
    while (startDate.getDay() !== this.firstWeekDay) {
      startDate.setDate(startDate.getDate() - 1);
    }
    return startDate;
  },
  monthDates: function monthDates(year, month, dayFormatter, weekFormatter) {
    if (typeof year !== "number" || year < 1970) {
      throw new CalendarException("year must be a number >= 1970");
    }
    if (typeof month !== "number" || month < 0 || month > 11) {
      throw new CalendarException("month must be a number (Jan is 0)");
    }
    var weeks = [],
      week = [],
      i = 0,
      date = this.weekStartDate(new Date(year, month, 1));
    do {
      for (i = 0; i < 7; i++) {
        week.push(dayFormatter ? dayFormatter(date) : date);
        date = new Date(date.getTime());
        date.setDate(date.getDate() + 1);
      }
      weeks.push(weekFormatter ? weekFormatter(week) : week);
      week = [];
    } while (date.getMonth() <= month && date.getFullYear() === year);
    return weeks;
  },
  monthDays: function monthDays(year, month) {
    var getDayOrZero = function getDayOrZero(date) {
      return date.getMonth() === month ? date.getDate() : 0;
    };
    return this.monthDates(year, month, getDayOrZero);
  },
};

var months = "JAN FEB MAR APR MAY JUN JUL AUG SEP OCT NOV DEC".split(" ");
for (var i = 0; i < months.length; i++) Calendar[months[i]] = i;
