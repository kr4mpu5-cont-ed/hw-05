$(document).ready(function() {

    // populate timeslots[] fromlocalstorage
    getTimeslotsLS = localStorage.getItem("timeslotsLS");
    var timeslots = getTimeslotsLS ? JSON.parse(getTimeslotsLS) : [];
    
    // populate date in header: Day, Month Date
    $("#currentDay").text(moment().format('dddd, MMMM Do'));

    // draw calendar
    const numHoursInDay = 9;
    const calStartTime = 9;
    var divDayCalendar = $("#divDayCalendar");
    var row = "";
    
    // todo: refactor after i figure out how to make this more elegant!
    if (timeslots.length > 0) {
        for (var i = 0; i < numHoursInDay; i++) {
            row += `
            <div class="row" id="${i}">
                <div class="col-1 text-right hour pt-4">${get12HrClockTime(i,calStartTime)}</div>

                <div class="col-10 pt-2 description ${getPastPresentFutureColor(i,calStartTime)}" id="desc${i}"><input type="text" class="form-control-plaintext" id="timeSlot${i}" value="${timeslots[i][1]}"></div>

                <div class="col-1 saveBtn d-flex align-items-center justify-content-center" id="saveBtn"><i class="far fa-save"></i></div>
            </div>`;
        }
    } else {
        for (var i = 0; i < numHoursInDay; i++) {
            row += `
            <div class="row" id="${i}">
                <div class="col-1 text-right hour pt-4">${get12HrClockTime(i,calStartTime)}</div>

                <div class="col-10 pt-2 description ${getPastPresentFutureColor(i,calStartTime)}" id="desc${i}"><input type="text" class="form-control-plaintext" id="timeSlot${i}" value=""></div>

                <div class="col-1 saveBtn d-flex align-items-center justify-content-center" id="saveBtn"><i class="far fa-save"></i></div>
            </div>`;
        }
    }

    // save data to localstorage
    $("#divDayCalendar").on("click", ".saveBtn", function(event) {
        // clear in memory array and localstorage item
        timeslots = [];
        localStorage.removeItem('timeslotsLS')
        // get input field and value for each text form input
        $('input[type="text"]').each(function(){    
            var id = $(this).attr('id');
            var value = $(this).val();
            timeslots.push([id, value]);
            // write to localstorage
            localStorage.setItem('timeslotsLS', JSON.stringify(timeslots));            
        });   
    });

    // TODO: this works, but should probably be refactored
    function get12HrClockTime(x,y) {
        twelveHrClockTime = x+y;
        if (twelveHrClockTime > 12 && twelveHrClockTime < 24) {
            twelveHrClockTime = (twelveHrClockTime-12).toString() + "PM";
        } else if (twelveHrClockTime == 12) {
            twelveHrClockTime = (twelveHrClockTime).toString() + "PM";
        } else if (twelveHrClockTime == 24) {
            twelveHrClockTime = (twelveHrClockTime-12).toString() + "AM";
        } else if (twelveHrClockTime == 0) {
            twelveHrClockTime = (twelveHrClockTime+12).toString() + "AM";
        } else if (twelveHrClockTime > 24) {
            twelveHrClockTime = (twelveHrClockTime-24).toString() + "AM";
        } else {
            twelveHrClockTime = twelveHrClockTime.toString() + "AM";
        }
        return twelveHrClockTime;
    }

    function getPastPresentFutureColor(x,y) {
        var timeCurrentHour = moment().hour();
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
