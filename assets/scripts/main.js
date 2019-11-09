$(document).ready(function() {

    // debug info
    // set test time
    // var testNow = moment().set('hour', 13);
    var timeCurrentHour = moment().hour();

    // populate date in header: Day, Month Date
    var ptagCurrentDay = $("#currentDay");
    var currentDay = moment().format('dddd, MMMM Do');
    ptagCurrentDay.text(currentDay);

    // draw calendar
    var numHoursInDay = 9;
    var divDayCalendar = $("#divDayCalendar");
    var calStartTime = 9;

    var row = "";
    for (var i = 0; i < numHoursInDay; i++) {
        row += `
        <div class="row" id="${i}">
            <div class="col-1 text-right hour pt-4">${get12HrClockTime(i,calStartTime)}</div>
            <div class="col-10 pt-2 description ${getPastPresentFutureColor(i,calStartTime)}" id="desc${i}"><input type="text" readonly class="form-control-plaintext" id="staticDesc${i}" value="read from localStorage"></div>
            <div class="col-1 saveBtn d-flex align-items-center justify-content-center"><i class="far fa-save"></i></div>
        </div>`;
    }

    $("#staticDesc1").on("click", function(event) {
        event.preventDefault();
        console.log(clicked);
    });

    function get12HrClockTime(x,y) {
        twelveHrClockTime = x+y;
        if (twelveHrClockTime > 12) {
            twelveHrClockTime = (twelveHrClockTime-12).toString() + "PM";
        } else {
            twelveHrClockTime = twelveHrClockTime.toString() + "AM";
        }
        return twelveHrClockTime;
    }

    function getPastPresentFutureColor(x,y) {
        twelveHrClockTime = x+y;
        if (twelveHrClockTime < timeCurrentHour) {
            return "past";
        } else if (twelveHrClockTime > timeCurrentHour) {
            return "future";
        } else {
            return "present";
        }
    }

    divDayCalendar.append(row);

});