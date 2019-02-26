var Days = [];

var thisYear = (new Date()).getFullYear();    
var start = new Date("1/1/" + thisYear);
var defaultStart = moment();
var currentDay = moment();
var CurrentStartOfWeek = moment().startOf('isoWeek');
var selectedDay;


var myClasses = [];
var classClicked = "";

function initDates() {
	
	$( "#main-day-date" ).html( currentDay.format('dddd, D MMM') );
	$("." + currentDay.format('dddd') + "-block" ).removeClass("hide");
}

function cycleClasses() {

	

	for (var i = 0; i < ClassSchedule.length; i++) {
		$( "." + ClassSchedule[i].place ).html(  '<img class="avatar sm-logo mr-3" src="assets/img/theme/' + ClassSchedule[i].class + '.jpg">' + ClassSchedule[i].class  );
		$( "." + ClassSchedule[i].place ).attr( "id", ClassSchedule[i].code );
		$( "." + ClassSchedule[i].place ).attr( "classScheduleID", ClassSchedule[i].id );
		$( "." + ClassSchedule[i].place ).addClass( "btn-class" );
	}

	var copying = 0;

	for (var i = 0; i < ClassSchedule.length; i++) {
		

		copying = $("#reusable-class-button").clone();
		copying.attr( "id", "mob-" +  ClassSchedule[i].code );
		copying.removeClass("hide");
		copying.attr( "classScheduleID", ClassSchedule[i].id );
		copying.addClass( ClassSchedule[i].class );
		copying.children(".col-4").children( ".btn-time" ).html( "<b>" + ClassSchedule[i].displaytime + "</b> "  );
		copying.children(".col-8").children( ".btn-groupclass" ).html( '<img class="avatar sm-logo mr-3" src="assets/img/theme/' + ClassSchedule[i].class + '.jpg"><b>' + ClassSchedule[i].class + '</b>'  );
		
		copying.appendTo( "." + dayWrangler( ClassSchedule[i].day ) + "-block");  
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
	$( ".card-body-removeable" ).addClass("hide");
	currentDay.subtract(1, 'd');
	$("." + currentDay.format('dddd') + "-block" ).removeClass("hide");
	$( "#main-day-date" ).html( currentDay.format('dddd, D MMM') );

	checkDatesForClasses();
}

function checkDatesForClasses() {

	clearClasses();

	for (var i = 0; i < myClasses.length; i++) {
		

		$( "#joiner" + myClasses[i].code + myClasses[i].day.dayOfYear()  ).addClass("joint");
		

		
	}

	
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

var blankBooking = {code: "", type: "" , time: "", day: moment(currentDay)};

function join(number) {

	var dayOfJoining = moment(selectedDay);

	dayOfJoining.add(number -1, 'w');

	for (var i = 0; i < myClasses.length; i++) {
		console.log(myClasses[i].day.dayOfYear());
		if(myClasses[i].code === ClassSchedule[classClicked].code && myClasses[i].day.dayOfYear() === moment(dayOfJoining).dayOfYear()){
			myClasses[i] = blankBooking;
			checkDatesForClasses();
			return false;
		}
	}

	//currentDay = moment(selectedDay);

	var session = {code: ClassSchedule[classClicked].code, type: ClassSchedule[classClicked].class , time: ClassSchedule[classClicked].displaytime, day: moment(dayOfJoining)};
	myClasses[myClasses.length] = session;
	
	clearClasses();
	
	myClasses.sort();

	checkDatesForClasses();

	console.log(myClasses);
}






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

	// $(".class-notification").remove();

	// var copying;
	// for (var i = 0; i < myClasses.length; i++) {
		
	// 	copying = $("#reusable-class-notification").clone();
	// 	copying.attr( "id", "not-" + myClasses[i].code );
	// 	copying.removeClass("hide");
	// 	copying.addClass("class-notification");
	// 	copying.children( ".notification-text" ).html( "<strong>" + myClasses[i].day.calendar() + "</strong> " + myClasses[i].type  );
	// 	copying.appendTo( "#notification-area" );  
	// }
}



$( ".btn-class" ).click(function() {

  defaultStart = moment();

  checkDatesForClasses();

  classClicked = parseInt($(this).attr( "classScheduleID")) - 1;

  var nextSession = moment().day( ClassSchedule[classClicked].day );



  if ( defaultStart.day() >= ClassSchedule[classClicked].day ) {
  		nextSession.add(1, 'w');
  } 

  if( currentDay.dayOfYear() >= nextSession.dayOfYear()  ) { 
  	
  	nextSession = moment(currentDay); 
  }

  selectedDay = moment(nextSession);
  
  $(".join-class-1").html(nextSession.format('dddd, D MMM'));
  $(".join-class-1").attr("id", "joiner" + ClassSchedule[classClicked].code + nextSession.dayOfYear());
  $(".join-class-2").html(nextSession.add(1, 'w').format('dddd, D MMM'));
  $(".join-class-2").attr("id", "joiner" + ClassSchedule[classClicked].code + nextSession.dayOfYear());
  $(".join-class-3").html(nextSession.add(1, 'w').format('dddd, D MMM'));
  $(".join-class-3").attr("id", "joiner" + ClassSchedule[classClicked].code + nextSession.dayOfYear());
  $(".join-class-4").html(nextSession.add(1, 'w').format('dddd, D MMM'));
  $(".join-class-4").attr("id", "joiner" + ClassSchedule[classClicked].code + nextSession.dayOfYear());
  

  $("#joinBigClassHeader").html( '<img  src="assets/img/theme/big/' + ClassSchedule[classClicked].class + '.png">' );
  $("#joinBigClassModal").modal()

  checkDatesForClasses();

});

function eightweek() {
	window.location.href = "https://1stfootforward.co.nz/8week/indexone.html?u=Oli&t=" + "12%200d%2038%20b4%20a2%200f%20cb%20d2";
}

function navigation(link) {

	console.log(link);

	$(".dashboard").addClass("hide");
	$(".timetable").addClass("hide");

	$("#" + link).removeClass("hide");
	$("." + link).removeClass("hide");
}

function dayWrangler(dayNumber) {
	var day = "Sunday"

	switch (dayNumber) {
	  case 0:
	    day = "Sunday";
	    break;
	  case 1:
	    day = "Monday";
	    break;
	  case 2:
	     day = "Tuesday";
	    break;
	  case 3:
	    day = "Wednesday";
	    break;
	  case 4:
	    day = "Thursday";
	    break;
	  case 5:
	    day = "Friday";
	    break;
	  case 6:
	    day = "Saturday";
	}

	return day;
}
