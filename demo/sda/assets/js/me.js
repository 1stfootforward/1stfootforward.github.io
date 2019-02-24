var Days = [];

var thisYear = (new Date()).getFullYear();    
var start = new Date("1/1/" + thisYear);
var defaultStart = moment(start.valueOf());
var currentDay = moment();
var CurrentStartOfWeek = moment().startOf('isoWeek');


var myClasses = [];
var activeType = "";
var activeTime = "";
var activeDay = "";
var activeCode = "";

function initDates() {
	
	$( "#main-day-date" ).html( currentDay.format('dddd, D MMM') );
	$("." + currentDay.format('dddd') + "-block" ).removeClass("hide");
}

function cycleClasses() {

	console.log(CurrentStartOfWeek.format('Do, MMM') );
	console.log(CurrentStartOfWeek.add(7, 'days').format('Do, MMM') );

	for (var i = 0; i < ClassSchedule.length; i++) {
		$( "." + ClassSchedule[i].place ).html(  '<img class="avatar sm-logo mr-3" src="assets/img/theme/' + ClassSchedule[i].class + '.jpg">' + ClassSchedule[i].class  );
		$( "." + ClassSchedule[i].place ).attr( "id", ClassSchedule[i].code );
		$( "." + ClassSchedule[i].place ).attr( "classScheduleID", ClassSchedule[i].id );
		$( "." + ClassSchedule[i].place ).addClass( "btn-class" );
	}
}


initDates();
cycleClasses();

function forwardDates() {
	$( ".card-body-removeable" ).addClass("hide");
	currentDay.add(1, 'd');
	$("." + currentDay.format('dddd') + "-block" ).removeClass("hide");
	$( "#main-day-date" ).html( currentDay.format('dddd, D MMM') );

	checkDatesForClasses();
}

function backDates() {
	$( ".ccard-body-removeable" ).addClass("hide");
	currentDay.subtract(1, 'd');
	$("." + currentDay.format('dddd') + "-block" ).removeClass("hide");
	$( "#main-day-date" ).html( currentDay.format('dddd, D MMM') );

	checkDatesForClasses();
}

function checkDatesForClasses() {

	for (var i = 0; i < myClasses.length; i++) {
		if(myClasses[i] != []) {
			if(currentDay.format('dddd, D MMM') == myClasses[i].day.format('dddd, D MMM')) {
				$("#" + myClasses[i].code ).addClass("joint");
			}
		}
	}
	fillNotifications();
}

function clearClasses() {
	$(".joint").removeClass("joint");
	

}


function selectClass(code, type, time, day) {
	
	clearClasses();
	
	var canceling = 0;

	activeCode = code;
	activeType = type;
	activeTime = time;
	activeDay = moment(currentDay);

	for (var i = 0; i < myClasses.length; i++) {
		if( activeCode == myClasses[i].code && myClasses[i].day.format('dddd, D MMM') == activeDay.format('dddd, D MMM')) {
			$("#cancelClassModal").modal();
			canceling = 1;
		}
	}

	if(canceling == 0) {
		$("#joinClassModal").modal()
	}
}

function join() {
	var session = {code: activeCode, type: activeType , time: activeTime, day: activeDay};
	myClasses[myClasses.length] = session;
	
	clearClasses();
	checkDatesForClasses();
	myClasses.sort();
}

function signUp() {

	for (var i = 0; i < 4; i++) {
		myClasses[myClasses.length] = {code: activeCode, type: activeType , time: activeTime, day: moment(activeDay)};
		activeDay = activeDay.add(7, 'd');
	}

	clearClasses();
	checkDatesForClasses();
	myClasses.sort();
}


var blankBooking = {code: "", type: "" , time: "", day: moment(currentDay)};

function cancel() {
	for (var i = 0; i < myClasses.length; i++) {
		if( activeCode == myClasses[i].code && myClasses[i].day.format('dddd, D MMM') == activeDay.format('dddd, D MMM')) {
			myClasses[i] = blankBooking;
		}
	}
	checkDatesForClasses();
}

myClasses.sort(function(a, b) {
    return parseFloat(a.day) - parseFloat(b.day);
});

function fillNotifications() {

	$(".class-notification").remove();

	var copying;
	for (var i = 0; i < myClasses.length; i++) {
		
		copying = $("#reusable-class-notification").clone();
		copying.attr( "id", "not-" + myClasses[i].code );
		copying.removeClass("hide");
		copying.addClass("class-notification");
		copying.children( ".notification-text" ).html( "<strong>" + myClasses[i].day.calendar() + "</strong> " + myClasses[i].type  );
		copying.appendTo( "#notification-area" );  
	}
}



$( ".btn-class" ).click(function() {

  var classClicked = parseInt($(this).attr( "classScheduleID")) - 1;

   var nextSession = moment().day( ClassSchedule[classClicked].day );

  if( currentDay.day() >= ClassSchedule[classClicked].day ) {
  	console.log(nextSession.add(1, 'w').format('dddd, D MMM'));

  }

  

  

  $("#joinBigClassHeader").html( '<img  src="assets/img/theme/big/' + ClassSchedule[classClicked].class + '.png">' );
  $("#joinBigClassBody").html( nextSession.format('dddd, D MMM') + " - " + nextSession.add(1, 'w').format('dddd, D MMM') + " - " + nextSession.add(1, 'w').format('dddd, D MMM') + " - " + nextSession.add(1, 'w').format('dddd, D MMM'));
  $("#joinBigClassModal").modal()
});

function eightweek() {
	window.location.href = "https://1stfootforward.co.nz/8week/indexone.html?u=Oli&t=" + "12%200d%2038%20b4%20a2%200f%20cb%20d2";
}

function navigation(link) {

	console.log(link);

	$("#dashboard").addClass("hide");
	$("#timetable").addClass("hide");

	$("#" + link).removeClass("hide");
}
