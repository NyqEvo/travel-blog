// this code is originally from https://github.com/ramalho/calendar.js  and has been refactored and modified to work with this project

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
}

// This begins my code for rendering the calendar and modal which holds the note for the date

var myModalEl = document.getElementById("noteModal");
var myModalSaveBtn = document.getElementById("save-btn");

var year = "";
var month = "";
var day = "";

function renderCalendar() {
  var list = "";
  var l = document.getElementById("calendar");
  var cal = new Calendar();

  var yearElement = document.getElementById("year");
  yearElement.addEventListener("change", function () {
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
        '<button type="button" class="btn" data-bs-toggle="modal" data-bs-target="#noteModal" value="' +
        date +
        '">';
      list += date;
      list += "</button>";
      list += "</td>";
    }
    list += "</tr>";
  }
  l.innerHTML = list;
  console.log();
}

myModalEl.addEventListener("show.bs.modal", function (event) {
  var ta2 = document.querySelector(".note-textarea");
  ta2.textContent = "";
  var yearElement = document.getElementById("year");
  var monthElement = document.getElementById("month");
  var post_id = document.getElementById("post_id").innerText;

  year = parseInt(yearElement.value);
  mon = parseInt(monthElement.value);
  day = parseInt(event.relatedTarget.innerHTML);

  fetch(`/api/note/` + post_id + "/" + year + "/" + mon + "/" + day)
    .then((response) => response.json())
    .then((text) => {
      console.log(`/api/note/` + year + "/" + mon + "/" + day);
      console.log("got back" + text);
      var ta = document.querySelector(".note-textarea");
      console.log("this is before what is in the ta:" + ta.textContent);
      ta.textContent = text;
      console.log("this is what is in the ta:" + ta.textContent);
    });
});

myModalSaveBtn.addEventListener("click", function (event) {
  var ta = document.querySelector(".note-textarea");
  var text = ta.value;
  console.log("text is: " + text);

  var postIdEl = document.getElementById("post_id");
  var postId = postIdEl.innerHTML;
  console.log(postId);

  fetch("/api/note/" + postId + "/" + year + "/" + mon + "/" + day, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      info: text
    })
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      console.log("posted successfully");
    })
    .catch((err) => console.log(err));
});

// This is the code that is supposed to clear the modal when it is closed but it is not working

  // document.querySelectorAll(".modal").forEach(function (modal) {
  //   modal.addEventListener("hide.bs.modal", function () {
  //     modal
  //       .querySelectorAll("input:not([type=hidden]),textarea,select")
  //       .forEach(function (el) {
  //         el.value = "";
  //       });
  //   });
  // });

renderCalendar();
