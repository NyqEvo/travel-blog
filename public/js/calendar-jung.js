var CalendarException = function CalendarException(message) {
  this.message = message;
  this.toString = function () {
    return this.constructor.name + ": " + this.message;
  };
};

class Calendar {
  static {
    var months = "JAN FEB MAR APR MAY JUN JUL AUG SEP OCT NOV DEC".split(" ");
    for (var i = 0; i < months.length; i++) Calendar[months[i]] = i;
  }

  constructor(firstWeekDay) {
    this.firstWeekDay = firstWeekDay || 0; // 0 = Sunday
  }

  weekStartDate(date) {
    var startDate = new Date(date.getTime());
    while (startDate.getDay() !== this.firstWeekDay) {
      startDate.setDate(startDate.getDate() - 1);
    }
    return startDate;
  }

  monthDates(year, month, dayFormatter, weekFormatter) {
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
  }

  // monthDays(year, month) {
  //   var getDayOrZero = function getDayOrZero(date) {
  //     return date.getMonth() === month ? date.getDate() : 0;
  //   };
  //   return this.monthDates(year, month, getDayOrZero);
  // }
}

function renderCalendar() {
  var list = "";
  var l = document.getElementById("calendar");
  var cal = new Calendar();

  var yearElement = document.getElementById("year");
  yearElement.addEventListener("change", function() {
    renderCalendar();
  });

  var monthElement = document.getElementById("month");
  monthElement.addEventListener("change", function () {
    renderCalendar();
  });

  var year = parseInt(yearElement.value);
  var mon = parseInt(monthElement.value);
  var month = cal.monthDates(year, mon);

  for (var week of month) {
    list += "<tr>";
    for (var day of week) {
      date = day.getDate();
      list += "<td class='day' value='" + date + "'>";
      list +=
        '<button type="button" class="btn" data-bs-toggle="modal" data-bs-target="#noteModal" value="' + date + '">';
      list += date;
      list += "</button>";
      list += "</td>";
    }
    list += "</tr>";
  }
  l.innerHTML = list;
  console.log();

}
var myModalEl = document.getElementById("noteModal");

myModalEl.addEventListener("show.bs.modal", function (event) {
  var yearElement = document.getElementById("year");
  var monthElement = document.getElementById("month");
  
  var year = parseInt(yearElement.value);
  var mon = parseInt(monthElement.value);
  var day = parseInt(event.relatedTarget.innerHTML);

  fetch(`/api/note/`+ year + "/" + mon + "/" + day)
  .then ((response) => response.text())
    .then((text) => {
    var ta = document.querySelector(".note-textarea");
    ta.innerHTML = text;
  });
});

renderCalendar();

