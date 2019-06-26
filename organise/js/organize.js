/* ------------------------------------------

	Setup

---------------------------------------------*/

var BookingsMaster = [];
var RecordMaster = [];
var recordURL = "junerecord";
getBookings();
getRecords();
getUsers();



/* ------------------------------------------

	Navigation

---------------------------------------------*/
var breadCrumbs = [];
var breadCrumbsRemove = [];
var breadCrumbsHide = [];

var selectClass = "";
var selectDate = "";
var selectUser = "";
var dates = [];
var selectedBookings = [];

var saveReady = 0;
var insertedUserNumber = 0;

var editingBooking = 0;
var editingRecord = 0;


function forward(num) {
	$("#navSection").addClass("hide");
	$("#liveSection").addClass("hide");
	$("#classSection").addClass("hide");
	$("#userSection").addClass("hide");
	$("#bookingSection").addClass("hide");
	$("#recordSection").addClass("hide");
	$("#purchaseSection").addClass("hide");

	if(num == 0) {
		$("#navSection").removeClass("hide");
		$("#backButton").addClass("hide");
	}

	if(num == 1) {
		$("#liveSection").removeClass("hide");
		$("#backButton").removeClass("hide");
		live();
	}

	if(num == 2) {

		$("#userSection").removeClass("hide");
		$("#backButton").removeClass("hide");
		$(".user-item").remove();
		userlist();
	}

	if(num == 3) {
		$("#classSection").removeClass("hide");
		$("#backButton").removeClass("hide");
	}

	if(num == 4) {
		$("#bookingSection").removeClass("hide");
		$(".individual-booking-item").remove();

		bookinglist();
		$("#backButton").removeClass("hide");
	}

	if(num == 5) {
		$("#recordSection").removeClass("hide");
		$("#backButton").removeClass("hide");
	
		$(".individual-record").remove();
		recordlist();
	}

	if(num == 6) {
		$("#purchaseSection").removeClass("hide");
		purchaseMenu();
		$("#backButton").removeClass("hide");
	}
}

function back() {
	ACTIVEUSER = 78;

	$("#classBooking2Record").addClass("hide");
	$(".pay-block").addClass("hide");

	if(breadCrumbs.length === 0) {
		forward(0);
	}
	else {
		console.log( breadCrumbs[ breadCrumbs.length - 1 ] );
		console.log( breadCrumbsHide[ breadCrumbsHide.length - 1 ] );
		console.log( breadCrumbsRemove[ breadCrumbsRemove.length - 1 ] );

		$( "." + breadCrumbs[ breadCrumbs.length - 1 ] ).removeClass("hide");
		$( "." + breadCrumbsHide[ breadCrumbsHide.length - 1 ] ).addClass("hide");
		$( "." + breadCrumbsRemove[ breadCrumbsRemove.length - 1 ] ).remove();
		breadCrumbs.splice( breadCrumbs.length - 1, 1);
		breadCrumbsHide.splice( breadCrumbsHide.length - 1, 1);
		breadCrumbsRemove.splice( breadCrumbsRemove.length - 1, 1);
	}
}



/* ------------------------------------------

	Lists and Blocks

---------------------------------------------*/
/* ------------------------------------------

	Live

---------------------------------------------*/

function live() {
	var date = moment( $(".live-date-input").val() , "DD-MM-YYYY").format("YYYY-MM-DD");
  	

  	for (var i = BookingsMaster.length - 1; i >= 0; i--) {
  		if(BookingsMaster[i].day == date) {
  			liveBookingBlocks(i);
  		}
  	}

  	for (var i = RecordMaster.length - 1; i >= 0; i--) {
  		if(RecordMaster[i].day == date){
  			liveRecordBlocks(i)
  		}
  	}


}

$( "#live-date" ).change(function() {
  	
  	var date = moment( $(".live-date-input").val() , "DD-MM-YYYY").format("YYYY-MM-DD");
  	

  	for (var i = BookingsMaster.length - 1; i >= 0; i--) {
  		if(BookingsMaster[i].day == date) {
  			liveBookingBlocks(i);
  		}
  	}

  	for (var i = RecordMaster.length - 1; i >= 0; i--) {
  		if(RecordMaster[i].day == date){
  			liveRecordBlocks(i)
  		}
  	}
});

function liveBookingBlocks(i) {

		var copying = $("#reuseable-booking-block").clone();
		copying.attr( "id", "booking-" +  i );
		copying.attr("bookingid", i);
		copying.attr("onClick", "editBooking(" + i + ")");
		copying.removeClass("hide");
		copying.addClass( classtocssWrangler(BookingsMaster[i].type) );
		copying.addClass( "individual-booking-item" );
		// copying.attr( "classScheduleID", ClassSchedule[i].id );
		// copying.addClass( ClassSchedule[i].class );
		copying.children("div").children("div").children("div").children( ".display-name" ).html(BookingsMaster[i].displayuser  );
		copying.children("div").children("div").children( ".display-code" ).html(BookingsMaster[i].code  );
		copying.children("div").children("div").children("div").children( ".display-date" ).html( dateWrangler(BookingsMaster[i].day)  );
		copying.children("div").children("div").children( ".display-time" ).html(BookingsMaster[i].displaytime  );
		// copying.children(".col-8").children( ".btn-groupclass" ).html( '<img class="avatar sm-logo mr-3" src="assets/img/theme/' + ClassSchedule[i].class + '.jpg"><b>' + ClassSchedule[i].class + '</b>'  );
		
		copying.appendTo( "#live-booking-block" );  

}

function liveRecordBlocks(i) {
		var copying = $("#reuseable-record-block").clone();
		copying.attr( "id", "record-" +  i );
		copying.attr("recordid", i);
		copying.removeClass("hide");
		copying.addClass( classtocssWrangler(RecordMaster[i].type) );
		// copying.attr( "classScheduleID", ClassSchedule[i].id );
		copying.addClass( "individual-record" );
		copying.attr("onClick", "editRecord(" + i + ")");
		copying.children("div").children("div").children("div").children( ".display-name" ).html(RecordMaster[i].displayuser  );
		copying.children("div").children("div").children( ".display-code" ).html(RecordMaster[i].code  );
		copying.children("div").children("div").children("div").children( ".display-date" ).html( dateWrangler(RecordMaster[i].day)  );
		copying.children("div").children("div").children( ".display-time" ).html(RecordMaster[i].displaytime  );
		// copying.children(".col-8").children( ".btn-groupclass" ).html( '<img class="avatar sm-logo mr-3" src="assets/img/theme/' + ClassSchedule[i].class + '.jpg"><b>' + ClassSchedule[i].class + '</b>'  );
		
		copying.appendTo( "#live-record-block" );  
}


/* ------------------------------------------

	Click Class

---------------------------------------------*/

function userlist() {
	$("#usernumber").html(  UserMaster.length);
	for (var i = 0; i < UserMaster.length; i++) {
		if(UserAccount[i].Active == 0 ) {
			userBlocks( i );
		}
	}
}

//RecordMaster = RecordMaster.sort();

//setTimeout(function(){

	classlist();
//}, 1000);




function userBlocks(i) {

		var copying = $("#reuseable-user-block").clone();
		copying.attr( "id", "user-" +  i );
		copying.attr("userid", i);
		copying.removeClass("hide");
		copying.addClass("user-item");
		copying.attr("onClick", "userSelected(" + i + ")");
		// copying.attr( "classScheduleID", ClassSchedule[i].id );
		// copying.addClass( ClassSchedule[i].class );
		copying.children("div").children( ".display-name" ).html(UserMaster[i].display  );
		// copying.children(".col-8").children( ".btn-groupclass" ).html( '<img class="avatar sm-logo mr-3" src="assets/img/theme/' + ClassSchedule[i].class + '.jpg"><b>' + ClassSchedule[i].class + '</b>'  );
		
		copying.appendTo( "#user-block" );  
}







/* ------------------------------------------

	Click Class

---------------------------------------------*/


function classlist() {
	$("#classnumber").html(  ClassSchedule.length);
	for (var i = 0; i < ClassSchedule.length; i++) {
		classBlocks( i );
	}
}

function classBlocks(i) {

		var copying = $("#reuseable-class-block").clone();
		copying.attr( "id", "class-" +  i );
		copying.attr("classid", i);
		copying.removeClass("hide");
		copying.addClass("individual-class");
		// copying.attr( "classScheduleID", ClassSchedule[i].id );
		// copying.addClass( ClassSchedule[i].class );
		copying.children("div").children( ".display-name" ).html(ClassSchedule[i].code  );
		// copying.children(".col-8").children( ".btn-groupclass" ).html( '<img class="avatar sm-logo mr-3" src="assets/img/theme/' + ClassSchedule[i].class + '.jpg"><b>' + ClassSchedule[i].class + '</b>'  );
		
		copying.appendTo( "#class-block" );  

}

$( ".individual-class" ).click(function() {
	selectedBookings = [];
	selectClass =  parseInt( $(this).attr("classid") );
  	classMenu(ClassSchedule[ parseInt( $(this).attr("classid") ) ]);
  
});

function classMenu(pickedClass) {
	$(".individual-class").addClass("hide");
	breadCrumbs[ breadCrumbs.length ] = "individual-class";
	breadCrumbsRemove[ breadCrumbsRemove.length ] = "class-booking";

	classSortedBookings(pickedClass.code)
}

function classSortedBookings(code) {

	// if we haven't yet passed the day of the week that I need:
	if (moment().isoWeekday() <= ClassSchedule[selectClass].day) { 
	  // then just give me this week's instance of that day
	   var nextDate = moment().isoWeekday( ClassSchedule[selectClass].day );
	} else {
	  // otherwise, give me *next week's* instance of that same day
	   var nextDate = moment().add(1, 'weeks').isoWeekday( ClassSchedule[selectClass].day );
	}

	classBookingDate(  nextDate.format("YYYY-MM-DD") );
	classBookingDate(  nextDate.add(1, 'w').format("YYYY-MM-DD") );
	classBookingDate(  nextDate.add(1, 'w').format("YYYY-MM-DD") );
	classBookingDate(  nextDate.add(1, 'w').format("YYYY-MM-DD") );
	classBookingDate(  nextDate.add(1, 'w').format("YYYY-MM-DD") );

	
	if(BookingsMaster.length == 0){return false;}

	
	for (var i = 0; i < BookingsMaster.length; i++) {
		if(BookingsMaster[i].code === code) {
			selectedBookings[selectedBookings.length] = i;
			classBookingBlocks(i);
		}
	}
}

function classBookingBlocks(i) {

		var copying = $("#reuseable-booking-block").clone();
		copying.attr( "id", "booking-" +  i );
		copying.attr("bookingid", i);
		copying.removeClass("hide");
		copying.addClass( classtocssWrangler(BookingsMaster[i].type) );
		copying.addClass( "class-booking" );
		copying.children("div").children("div").children("div").children( ".display-name" ).html(BookingsMaster[i].displayuser  );
		copying.children("div").children("div").children( ".display-code" ).html(BookingsMaster[i].code  );
		copying.children("div").children("div").children("div").children( ".display-date" ).html( dateWrangler(BookingsMaster[i].day)  );
		copying.children("div").children("div").children( ".display-time" ).html(BookingsMaster[i].displaytime  );

		copying.insertAfter( "#date-" + BookingsMaster[i].day );
}

function selectedClassBookingBlocks(i) {

		var copying = $("#reuseable-selected-booking-block").clone();
		copying.attr( "id", "booking-" +  i );
		copying.addClass( "booking-" +  i );
		copying.attr("bookingid", i);
		copying.removeClass("hide");
		copying.addClass( classtocssWrangler(BookingsMaster[i].type) );
		copying.addClass( "mini-user-list" );
		copying.children("div").children("div").children( ".display-name" ).html(BookingsMaster[i].displayuser  );
		copying.children("div").children("div").children( ".display-date" ).html( dateWrangler(BookingsMaster[i].day)  );
		copying.find(".account").attr("onClick", "recordBooking(" + i + ",'account')" );
		copying.find(".card").attr("onClick", "recordBooking(" + i + ",'card')" );
		copying.find(".deal").attr("onClick", "recordBooking(" + i + ",'deal')" );
		
		copying.appendTo( "#class-block" );  
}

function classBookingDate(date) {

	var copying = $("#reuseable-class-block").clone();
	copying.attr( "id", "date-" + date);
	copying.attr( "onClick", "fillClass('" + date + "')");
	copying.removeClass("hide");
	copying.addClass("class-booking");
	copying.children("div").children( ".display-name" ).html( dateWrangler(date) );
	copying.appendTo( "#class-block" );
}

function fillClass(date) {
	selectDate = date;
	$("#classBooking2Record").removeClass("hide");
	$(".class-booking").addClass("hide");
	breadCrumbs[ breadCrumbs.length ] = "class-booking";
	breadCrumbsRemove[ breadCrumbsRemove.length ] = "mini-user-list";

	var alreadyBooked = false;

	for (var i = 0; i < UserMaster.length; i++) {
		for (var a = 0; a < selectedBookings.length; a++) {
			if(UserMaster[i].display == BookingsMaster[ selectedBookings[a]].displayuser && BookingsMaster[ selectedBookings[a]].day == date) {

				selectedClassBookingBlocks(selectedBookings[a])
				alreadyBooked = true;
			}
		}
		if(alreadyBooked === false) {
			classBookingUserBlocks(i);
		}
		alreadyBooked = false;
	}
}

$( "#classBooking2Record" ).click(function() {
	console.log("fire");
  	$(".pay-block").removeClass("hide");
});

function classBookingUserBlocks(i) {
		
		var copying = $("#reuseable-mini-user-block").clone();
		copying.attr( "id", "user-" +  i );
		copying.attr("userid", i);
		copying.attr( "onClick", "addUser2Class('" + i + "')");
		copying.removeClass("hide");
		copying.addClass("mini-user-list");
		copying.children("div").children( ".display-name" ).html(UserMaster[i].display  );
		copying.appendTo( "#class-user-block" );  
}

function addUser2Class(i) {
	BookingsMaster[BookingsMaster.length] = {displayuser: UserMaster[i].display, code: ClassSchedule[selectClass].code, type: ClassSchedule[selectClass].class, 	time: ClassSchedule[selectClass].time, 	displaytime: ClassSchedule[selectClass].displaytime, day: selectDate}
	
	$(".mini-user-list").remove();
	$(".class-booking").remove();
	
	selectedBookings = [];
	breadCrumbs = [];
	breadCrumbsRemove = [];
	classMenu(ClassSchedule[selectClass]);
	fillClass(selectDate);
}

function recordBooking(i , type) {
	$(".booking-" +  i).remove();
	console.log("#booking-" + i);
	RecordMaster[RecordMaster.length] = {displayuser: UserMaster[i].display, code: ClassSchedule[selectClass].code, type: ClassSchedule[selectClass].class, 		time: ClassSchedule[selectClass].time, 	displaytime:ClassSchedule[selectClass].displaytime, day:selectDate, paytype: type,	payamount: 12};
	
}


/* ------------------------------------------

	Click Booking

---------------------------------------------*/


function bookinglist() {
	$("#bookingnumber").html(  BookingsMaster.length);
	
	for (var i = BookingsMaster.length - 1; i >= 0; i--) {
		bookingBlocks( i );
	}

}

function bookingBlocks(i) {

		var copying = $("#reuseable-booking-block").clone();
		copying.attr( "id", "booking-" +  i );
		copying.attr("bookingid", i);
		

		if(BookingsMaster[i].type == "PT Session"){
			copying.attr("onClick", "editPTBooking(" + i + ")");
		} else {
			copying.attr("onClick", "editBooking(" + i + ")");
		}

		copying.removeClass("hide");
		copying.addClass( classtocssWrangler(BookingsMaster[i].type) );
		copying.addClass( "individual-booking-item" );
		copying.addClass( statusCSSWrangler( BookingsMaster[i].status ) );

		copying.children("div").children("div").children("div").children( ".display-name" ).html(BookingsMaster[i].displayuser  );
		copying.children("div").children("div").children( ".display-code" ).html(BookingsMaster[i].type  );
		copying.children("div").children("div").children( ".display-date" ).html( dayTimeWrangler(i) );
		
		copying.children("div").children("div").children("img").attr("src", "img/" + BookingsMaster[i].type + ".jpg");
		copying.children("div").children("div").children("button").html(initialsWrangler(BookingsMaster[i].displayuser));
		copying.children("div").children("div").children("button").addClass(BookingsMaster[i].displayuser[0] + "u");

		copying.appendTo( "#booking-block" );  

}

function bookingBlocksByDate(i) {

		var copying = $("#reuseable-booking-block").clone();
		copying.attr( "id", "booking-" +  i );
		copying.attr("bookingid", i);
		

		if(BookingsMaster[i].type == "PT Session"){
			copying.attr("onClick", "editPTBooking(" + i + ")");
		} else {
			copying.attr("onClick", "editBooking(" + i + ")");
		}

		copying.removeClass("hide");
		copying.addClass( classtocssWrangler(BookingsMaster[i].type) );
		copying.addClass( "individual-booking-item" );
		copying.addClass( statusCSSWrangler( BookingsMaster[i].status ) );

		copying.children("div").children("div").children("div").children( ".display-name" ).html(BookingsMaster[i].displayuser  );
		copying.children("div").children("div").children( ".display-code" ).html(BookingsMaster[i].type  );
		copying.children("div").children("div").children( ".display-date" ).html( dayTimeWrangler(i) );
		
		copying.children("div").children("div").children("img").attr("src", "img/" + BookingsMaster[i].type + ".jpg");
		copying.children("div").children("div").children("button").html(initialsWrangler(BookingsMaster[i].displayuser));
		copying.children("div").children("div").children("button").addClass(BookingsMaster[i].displayuser[0] + "u");

		copying.insertAfter( "#date-" +  BookingsMaster[i].date );  

}

function bookingRearrangeByDay() {
	$( ".individual-booking-item" ).remove();

	dates[0] = BookingsMaster[0].day;
	var used = false;

	for (var i = BookingsMaster.length - 1; i >= 0; i--) {
		used = false;
		for (var x = 0; x < dates.length; x++) {
			if(dates[x] == BookingsMaster[i].day) {
				used = true;
			}
		}
		if(!used) {
			dates[dates.length] = BookingsMaster[i].day;
		}
	}
	
	dates.sort();
	
	for (var i = 0; i < dates.length; i++) {
		insertBookingDates(dates[i]);
	}

	for (var i = 0; i < BookingsMaster.length; i++) {
		bookingBlocksByDate(i);
	}
}

function insertBookingDates(date) {
	
	if( checkDateWrangler(date) ) {

		var copying = $("#reuseable-class-block").clone();
		copying.attr( "id", "date-" + date);
		copying.attr( "onClick", "fillClass('" + date + "')");
		copying.removeClass("hide");
		copying.addClass("individual-booking-item");
		copying.children("div").children( ".display-name" ).html( dateWrangler(date) );
		copying.appendTo( "#booking-block" );
	}
}

function bookingRearrangeOld() {
	$( ".individual-booking-item" ).remove();
	
	for (var i = BookingsMaster.length - 1; i >= 0; i--) {
		
		if( !checkDateWrangler( BookingsMaster[i].day ) ) {
			bookingBlocks( i );
		}
	}
}

function bookingRearrangeModified() {
	back(); forward(4);
	
}


$( ".individual-booking-item" ).click(function() {

 // bookinglist();
  editBooking(BookingsMaster[ parseInt( $(this).attr("bookingid") ) ]);
});

function addBooking() {
	$(".individual-booking-item").addClass("hide");
 	$(".booking-add").removeClass("hide");
 	breadCrumbs[ breadCrumbs.length ] = "individual-booking-item";
 	breadCrumbsRemove[ breadCrumbsRemove.length ] = "removeable-form";

	fillDropDowns();

 	$(".removeable-form").remove();
 	copy = $("#bookingGroup").clone();
 	copy.addClass("removeable-form");
	copy.attr( "id", "form" );
	copy.removeClass("hide");
	copy.appendTo(".booking-add");
}

function addPTBooking() {
	$(".individual-booking-item").addClass("hide");
 	$(".booking-add").removeClass("hide");
 	breadCrumbs[ breadCrumbs.length ] = "individual-booking-item";
 	breadCrumbsRemove[ breadCrumbsRemove.length ] = "removeable-form";

	fillDropDowns();

 	$(".removeable-form").remove();
 	copy = $("#bookingPTGroup").clone();
 	copy.addClass("removeable-form");
	copy.attr( "id", "form" );
	copy.removeClass("hide");
	copy.appendTo(".booking-add");
}

function addBookingAnotherUser() {
	insertedUserNumber++;
	var copy = $("#reuseable-user-dropdown").clone();
	copy.attr( "id", "du-" + insertedUserNumber );
	copy.addClass("removeable-dropdown");
	copy.removeClass("hide");
	copy.insertBefore(".insert-another-user");
}

function editBooking(booking) {
	editingBooking = booking;

	$(".individual-booking-item").addClass("hide");
 	$(".booking-add").removeClass("hide");
 	breadCrumbs[ breadCrumbs.length ] = "individual-booking-item";
 	breadCrumbsRemove[ breadCrumbsRemove.length ] = "removeable-form";

 	fillDropDowns();

	$("#form").remove();
 	copy = $("#bookingGroupEdit").clone();
	copy.attr( "id", "form" );
	copy.addClass("removeable-form");
	copy.removeClass("hide");

	copy.appendTo(".booking-add");
	$(".unchanged-user").html(statusWrangler(BookingsMaster[booking].displayuser));
	$(".unchanged-status").html(statusWrangler(BookingsMaster[booking].status));
	$(".unchanged-created").html( moment( BookingsMaster[booking].inserted_at).add(13,  "hours").calendar() );
	$(".unchanged-changed").html( moment( BookingsMaster[booking].updated_at).add(13,  "hours").calendar() );
	$(".unchanged-date").html(moment(BookingsMaster[booking].day).calendar());
	$(".unchanged-type").html( classCodeDisplayWrangler(BookingsMaster[booking].classId) );
	$(".unchanged-user").html(BookingsMaster[booking].displayuser);
}

function editPTBooking(booking) {
	editingBooking = booking;

	$(".individual-booking-item").addClass("hide");
 	$(".booking-add").removeClass("hide");
 	breadCrumbs[ breadCrumbs.length ] = "individual-booking-item";
 	breadCrumbsRemove[ breadCrumbsRemove.length ] = "removeable-form";

 	fillDropDowns();

	$("#form").remove();
 	copy = $("#bookingPTEdit").clone();
	copy.attr( "id", "form" );
	copy.addClass("removeable-form");
	copy.removeClass("hide");

	copy.appendTo(".booking-add");
	$(".PTunchanged-user").html(statusWrangler(BookingsMaster[booking].displayuser));
	$(".PTunchanged-status").html(statusWrangler(BookingsMaster[booking].status));
	$(".PTunchanged-created").html( moment( BookingsMaster[booking].inserted_at).add(13,  "hours").calendar() );
	$(".PTunchanged-changed").html( moment( BookingsMaster[booking].updated_at).add(13,  "hours").calendar() );
	$(".PTunchanged-date").html( moment(BookingsMaster[booking].day).calendar());
	$(".PTunchanged-time").html( BookingsMaster[booking].time );
}

function saveBooking() {
	var pClass = ClassSchedule[ $(".booking-class-input").val() ];
	var date = moment( $(".booking-date-input").val() , "DD-MM-YYYY").format("YYYY-MM-DD");
	var user = UserMaster[ $(".user-dropdown").val() ] ;

	$( ".user-dropdown" ).each(function( index ) {
	  if( $( this ).val() != "" ){
	  	user =  UserMaster[ $( this ).val() ];
	  	BookingsMaster[BookingsMaster.length] = {status: 0, user: parseInt($(".user-dropdown").val()), displayuser: user.display,	classId: parseInt( $(".booking-class-input").val()), 	code: pClass.code, type: pClass.class, 		time: pClass.time, 	displaytime: pClass.displaytime, day: date, created_at: ""};
	  	postBooking(BookingsMaster.length - 1);
	  }

	});
	
	back();back();
	forward(4);
	
}

function saveBookingEdit() {
	var pClass = ClassSchedule[ $(".booking-class-input").val() ];
	var changed = false;
	
	if( $(".booking-date-input-edit").val() != "") {
		var date = moment( $(".booking-date-input-edit").val() , "DD-MM-YYYY").format("YYYY-MM-DD");
		BookingsMaster[editingBooking].day = date;
		changed = true;
	}

	if( $(".booking-class-input-edit").val() != "") {
		var clas = ClassSchedule[ $(".booking-class-input-edit").val() ];
		BookingsMaster[editingBooking].classId = parseInt( $(".booking-class-input-edit").val());
		BookingsMaster[editingBooking].code = clas.code; 
		BookingsMaster[editingBooking].type = clas.class; 		
		BookingsMaster[editingBooking].time = clas.time; 
		BookingsMaster[editingBooking].displaytime = clas.displaytime;
		changed = true;
	}


	if(changed) {
	 	patchBooking(BookingsMaster.length - 1);
	 	back();back();
		forward(4);
	} else {
		back();
	}	
}

function savePTBooking() {
	
	var date = moment( $(".bookingpt-date-input").val() , "DD-MM-YYYY").format("YYYY-MM-DD");
	var day = moment( $(".bookingpt-date-input").val() , "DD-MM-YYYY").format("d");
	var dayCode = moment( $(".bookingpt-date-input").val() , "DD-MM-YYYY").format("ddd");
	
	var time =  $(".bookingpt-time-input").val().replace(':', '');
	
	var code = dayCode + time + "PT0";
	var user = UserMaster[ $(".user-dropdown").val() ] ;

	$( ".user-dropdown" ).each(function( index ) {
	  if( $( this ).val() != "" ){
	  	user =  UserMaster[ $( this ).val() ];

	  	BookingsMaster[BookingsMaster.length] = {status: 0, user: parseInt($(".user-dropdown").val()), displayuser: user.display,	classId: 0, 	code: code, type: "PT Session", 		time: time, 	displaytime: time, day: date, date: date, created_at: ""};
	  	postBooking(BookingsMaster.length - 1);
	  }

	});
	
	back();back();
	forward(4);
	
}

function savePTBookingEdit() {
	var pClass = ClassSchedule[ $(".booking-class-input").val() ];
	var changed = false;
	
	if( $(".bookingpt-date-input-edit").val() != "") {
		var date = moment( $(".bookingpt-date-input-edit").val() , "DD-MM-YYYY").format("YYYY-MM-DD");
		BookingsMaster[editingBooking].day = date;
		changed = true;
	}

	if( $(".bookingpt-time-input-edit").val() != "") {
		var time =  $(".bookingpt-time-input-edit").val();
		console.log(time);
		BookingsMaster[editingBooking].displaytime = time;
		BookingsMaster[editingBooking].time = time.replace(':', ''); 	
		
		changed = true;
	}


	if(changed) {
	 	patchBooking(BookingsMaster.length - 1);
	 	back();back();
		forward(4);
	} else {
		back();
	}	
}


/* ------------------------------------------

	Click Record

---------------------------------------------*/


function recordlist() {
	$("#recordnumber").html( RecordMaster.length);

	for (var i = RecordMaster.length - 1; i >= 0; i--) {
		recordBlocks( i );
	}

}

function recordBlocks(i) {
		var copying = $("#reuseable-record-block").clone();
		copying.attr( "id", "record-" +  i );
		copying.attr("recordid", i);
		copying.removeClass("hide");
		copying.addClass( classtocssWrangler(RecordMaster[i].type) );
		copying.addClass( "individual-record" );
		copying.addClass( statusCSSWrangler( RecordMaster[i].status ) );

		copying.children("div").children("div").children("div").children( ".display-name" ).html(RecordMaster[i].displayuser  );
		copying.children("div").children("div").children( ".display-code" ).html(RecordMaster[i].type  );
		copying.children("div").children("div").children( ".display-date" ).html( dayTimeRecordWrangler(i) );
		
		copying.children("div").children("div").children("img").attr("src", "img/" + RecordMaster[i].type + ".jpg");
		copying.children("div").children("div").children("button").html(initialsWrangler(RecordMaster[i].displayuser));
		copying.children("div").children("div").children("button").addClass(RecordMaster[i].displayuser[0] + "u");

		copying.appendTo( "#record-block" );  
}

function recordBlocksByDate(i) {

		var copying = $("#reuseable-record-block").clone();
		copying.attr( "id", "record-" +  i );
		copying.attr("recordid", i);
		

		copying.removeClass("hide");
		copying.addClass( classtocssWrangler(RecordMaster[i].type) );
		copying.addClass( "individual-record" );
		copying.addClass( statusCSSWrangler( RecordMaster[i].status ) );

		copying.children("div").children("div").children("div").children( ".display-name" ).html(RecordMaster[i].displayuser  );
		copying.children("div").children("div").children( ".display-code" ).html(RecordMaster[i].type  );
		copying.children("div").children("div").children( ".display-date" ).html( dayTimeRecordWrangler(i) );
		
		copying.children("div").children("div").children("img").attr("src", "img/" + RecordMaster[i].type + ".jpg");
		copying.children("div").children("div").children("button").html(initialsWrangler(RecordMaster[i].displayuser));
		copying.children("div").children("div").children("button").addClass(RecordMaster[i].displayuser[0] + "u");

		copying.insertAfter( "#date-" +  RecordMaster[i].date );  

}

function insertRecordDates(date) {

		var copying = $("#reuseable-class-block").clone();
		copying.attr( "id", "date-" + date);
		copying.attr( "onClick", "fillClass('" + date + "')");
		copying.removeClass("hide");
		copying.addClass("individual-record");
		copying.children("div").children( ".display-name" ).html( dateWrangler(date) );
		copying.prependTo( "#record-block" );
		console.log("fire");
}

$( ".individual-record" ).click(function() {

  var pickedrecord = RecordMaster[ parseInt( $(this).attr("recordid") ) ]
  console.log(pickedrecord.id);

});


function recordRearrangeModified() {
	back(); forward(5);
}

function recordRearrangeByDay() {
	$( ".individual-record" ).remove();

	dates[0] = RecordMaster[0].day;
	var used = false;

	for (var i = RecordMaster.length - 1; i >= 0; i--) {
		used = false;
		for (var x = 0; x < dates.length; x++) {
			if(dates[x] == RecordMaster[i].day) {
				used = true;
			}
		}
		if(!used) {
			dates[dates.length] = RecordMaster[i].day;
		}
	}
	
	dates.sort();
	
	for (var i = 0; i < dates.length; i++) {
		insertRecordDates(dates[i]);
	}

	for (var i = 0; i < RecordMaster.length; i++) {
		recordBlocksByDate(i);
	}
}

function addRecord() {
	$(".individual-record").addClass("hide");
 	$(".record-add").removeClass("hide");
 	breadCrumbs[ breadCrumbs.length ] = "individual-record";
 	breadCrumbsRemove[ breadCrumbsRemove.length ] = "form";
	breadCrumbsHide[ breadCrumbsHide.length ] = "record-add";	

 	
}

function addRecordIncome() {
	$("#form").remove();
 	var copy = $("#recordIncome").clone();
	copy.attr( "id", "form" );
	copy.removeClass("hide");
	copy.appendTo(".record-add");
	fillDropDowns();

	
}

function addRecordPT() {
	$("#form").remove();
 	var copy = $("#recordPT").clone();
	copy.attr( "id", "form" );
	copy.removeClass("hide");
	copy.appendTo(".record-add");
	fillDropDowns();

	
}

function addRecordGroup() {

	$("#form").remove();
 	var copy = $("#recordGroup").clone();
	copy.attr( "id", "form" );
	copy.removeClass("hide");
	copy.appendTo(".record-add");
	fillDropDowns();
}

function addRecordAnotherUser() {
	insertedUserNumber++;
	var copy = $("#reuseable-user-dropdown").clone();
	copy.attr( "id", "du-" + insertedUserNumber );
	copy.addClass("removeable-dropdown");
	copy.removeClass("hide");
	copy.insertBefore(".insert-another-user-record");

}

function editRecord(record) {
	editingRecord = record;
	console.log(record);
	$(".individual-record").addClass("hide");
 	$(".record-edit").removeClass("hide");
 	breadCrumbs[ breadCrumbs.length ] = "individual-record";
 	breadCrumbsRemove[ breadCrumbsRemove.length ] = "form";
	breadCrumbsHide[ breadCrumbsHide.length ] = "record-edit";	

	if( RecordMaster[record].type == "BNK" || RecordMaster[record].type == "PT Session" ) {
		if( RecordMaster[record].type == "BNK") {
			editRecordIncome(record);
		} else {editRecordPT(record);}
	} else {editRecordGroup(record); }

 	
}

function editRecordPT(id) {

	$("#form").remove();
 	var copy = $("#recordPTEdit").clone();
	copy.attr( "id", "form" );
	copy.removeClass("hide");
	copy.appendTo(".record-edit");

	$(".unchanged-user").html(statusWrangler(RecordMaster[id].displayuser));
	$(".unchanged-status").html(statusWrangler(RecordMaster[id].status));
	$(".unchanged-created").html( moment( RecordMaster[id].inserted_at).add(13,  "hours").calendar() );
	$(".unchanged-changed").html( moment( RecordMaster[id].updated_at).add(13,  "hours").calendar() );
	$(".unchanged-date").html( moment(RecordMaster[id].day).calendar());
	$(".unchanged-time").html( RecordMaster[id].time );
}

function editRecordIncome(id) {

	$("#form").remove();
 	var copy = $("#recordIncomeEdit").clone();
	copy.attr( "id", "form" );
	copy.removeClass("hide");
	copy.appendTo(".record-edit");
	fillDropDowns();
}

function editRecordGroup(id) {

	$("#form").remove();
 	var copy = $("#recordGroupEdit").clone();
	copy.attr( "id", "form" );
	copy.removeClass("hide");
	copy.appendTo(".record-edit");
	fillDropDowns();
}



function saveRecordGroup() {
	var type = $("#recordGroupType").val();
	var cost = 12;
	var date = moment( $("#recordGroupDate").val() , "DD-MM-YYYY").format("YYYY-MM-DD");
	

	$( ".user-dropdown" ).each(function( index ) {
	  if( $( this ).val() != "" ){
	  	user =  UserMaster[ $( this ).val() ];
	  	RecordMaster[RecordMaster.length] = {status: 0, user: $( this ).val(), displayuser: user.display,	classId: type, code: ClassSchedule[type].code, type: ClassSchedule[type].class, 	time: ClassSchedule[type].time, 	displaytime: ClassSchedule[type].displaytime, day: date, created_at: "",  paytype: "deduct", payamount: 12};	
	  	postRecord(RecordMaster.length - 1);
	  }
	});
	$( "input" ).val("");
	back();back();
	forward(5);
}

function saveRecordGroupNoShow() {
	var type = $("#recordGroupType").val();
	var cost = 12;
	var date = moment( $("#recordGroupDate").val() , "DD-MM-YYYY").format("YYYY-MM-DD");
	

	$( ".user-dropdown" ).each(function( index ) {
	  if( $( this ).val() != "" ){
	  	user =  UserMaster[ $( this ).val() ];
	  	RecordMaster[RecordMaster.length] = {status: 1, user: $( this ).val(), displayuser: user.display,	classId: type, code: ClassSchedule[type].code, type: "NO-SHOW", 	time: ClassSchedule[type].time, 	displaytime: ClassSchedule[type].displaytime, day: date, created_at: "",  paytype: "deduct", payamount: 12};	
	  	postRecord(RecordMaster.length - 1);
	  }
	});
	$( "input" ).val("");
	back();back();
	forward(5);
}

function saveRecordIncome() {
	var type = $("#recordIncomeType").val();
	var cost = $("#recordIncomeAmount").val();
	var date = moment( $("#recordIncomeDate").val() , "DD-MM-YYYY").format("YYYY-MM-DD");

	$( ".user-dropdown" ).each(function( index ) {
	  if( $( this ).val() != "" ){
	  	user =  UserMaster[ $( this ).val() ];
	  	RecordMaster[RecordMaster.length] = {status: 0, user: $( this ).val(), displayuser: user.display,	classId: 0, code: "INC" + (parseInt( cost )*100) + type, type: type, 	time: 0, 	displaytime: "null", day: date, created_at: "", paytype: type, payamount: cost};	
	  	postRecord(RecordMaster.length - 1);
	  }
	});
	$( "input" ).val("");
	back();back();
	forward(5);
}

function saveRecordPT() {
	var cost = $("#recordPTAmount").val();
	var time = $("#recordPTTime").val().replace(':','');;
	var date = moment( $("#recordPTDate").val() , "DD-MM-YYYY").format("YYYY-MM-DD");
	var day = moment( $("#recordPTDate").val() , "DD-MM-YYYY").format("ddd");

	$( ".user-dropdown" ).each(function( index ) {
	  if( $( this ).val() != "" ){
	  	user =  UserMaster[ $( this ).val() ];
	  	RecordMaster[RecordMaster.length] = {status: 0, user: $( this ).val(), displayuser: user.display,	classId: 0, code:   day + time + "PT0", type: "PT Session", 	time: time, 	displaytime: time, day: date, created_at: "", paytype: "deduct", payamount: cost};	
	  	postRecord(RecordMaster.length - 1);
	  }
	});
	$( "input" ).val("");
	back();back();
	forward(5);
}

function saveRecordPTNoShow() {
	var cost = $("#recordPTAmount").val();
	var time = $("#recordPTTime").val().replace(':','');;
	var date = moment( $("#recordPTDate").val() , "DD-MM-YYYY").format("YYYY-MM-DD");
	var day = moment( $("#recordPTDate").val() , "DD-MM-YYYY").format("ddd");

	$( ".user-dropdown" ).each(function( index ) {
	  if( $( this ).val() != "" ){
	  	user =  UserMaster[ $( this ).val() ];
	  	RecordMaster[RecordMaster.length] = {status: 1, user: $( this ).val(), displayuser: user.display,	classId: 0, code: day + time + "PT0", type: "NO-SHOW", 	time: time, 	displaytime: time, day: date, created_at: "", paytype: "deduct", payamount: cost};	
	  	postRecord(RecordMaster.length - 1);
	  }
	});
	$( "input" ).val("");
	back();back();
	forward(5);
}



/* ------------------------------------------

	Click Purchase

---------------------------------------------*/


function purchaseMenu() {
	$("#purchaseType").val("");
	$("#purchaseUser").val("");
	$("#purchaseCost").val("");
	$("#purchaseDate").val("");

	for (var i = 0; i < UserMaster.length; i++) {
 		$( "<option class='removeable-dropdown-item' value='" + i + "'>" + UserMaster[i].display + "</option>" ).appendTo( "#purchaseUser" );
 	}
}

function savePurchase() {
	var type = $("#purchaseType").val();
	var typeDesc = $("#purchaseType").attr("desc");
	var user = $("#purchaseUser").val();
	var cost = $("#purchaseCost").val();
	var date = moment( $("#purchaseDate").val() , "DD-MM-YYYY").format("YYYY-MM-DD");

	RecordMaster[RecordMaster.length] = {status: 0, user: user, displayuser: UserMaster[user].display,	classId: 0, 	code: "PUR"+ (parseInt( cost )*100) + type, type: type, 	time: 0, 	displaytime: "null", day: date, created_at: "", paytype: "deduct", payamount: parseInt(cost)};	
	postRecord(RecordMaster.length - 1);
	back();
	forward(5);
}



/* ------------------------------------------

	Info Boxes

---------------------------------------------*/

$( ".user-dropdown" ).change(function() {
  console.log("fire");
});

function userPicked() {

	var copy = $("#user-account-info").clone();
	copy.attr("id","");
	copy.removeClass("hide");
	$( ".user-dropdown" ).each(function( index ) {
	  if( $( this ).val() != "" ){
	  	copy.children(".col-8").children("div").children(".display-name").html(UserAccount[$( this ).val()].display  );
	  	copy.children(".col-8").children(".display-account").html("<b>Account:</b> $" + UserAccount[$( this ).val()].Account  );
	  	copy.children(".col-8").children(".display-card").html("<b>Concession:</b> " + UserAccount[$( this ).val()].Card  );
	  	copy.children(".col-8").children(".display-unlimited").html("<b>Unlimited:</b> " + UserAccount[$( this ).val()].UnlimitedEnd  );
	  	console.log(copy);
	  	user =  UserMaster[ $( this ).val() ];
	  	$(this).attr("id","userdrop-" + user.phone );
	  	copy.insertBefore("#userdrop-" + user.phone  );
	  }
	});
}


/* ------------------------------------------

	Wranglers

---------------------------------------------*/

 $(document).ready(function()
 {
 	 $("#dBox").DateTimePicker();
   
 });

 function fillDropDowns() {
 	$(".removeable-dropdown").remove();
 	$(".removeable-dropdown-item").remove();
 	insertedUserNumber = 0;
 	for (var i = 0; i < ClassSchedule.length; i++) {
 		$( "<option class='removeable-dropdown-item' value='" + i + "'>" + classCodeDisplayWrangler(i) + "</option>" ).appendTo( ".class-dropdown" );
 	}

 	for (var i = 0; i < UserMaster.length; i++) {
 		if(UserAccount[i].Active == 0 ) {
 			$( "<option class='removeable-dropdown-item' value='" + i + "'>" + UserMaster[i].display + "</option>" ).appendTo( ".user-dropdown" );
 		}
 	}

 	var copy = $("#reuseable-user-dropdown").clone();
	copy.attr( "id", "" );
	copy.addClass("removeable-dropdown");
	copy.removeClass("hide");
	copy.insertAfter(".insert-user-dropdown");

 }

function classtocssWrangler(messy) {

	var css = messy;

	switch (messy) {
	  case "S.E.T":
	    css = "SET";
	    break;
	  case "NO-SHOW":
	    css = "SHOW";
	    break;
	  case "HIIT Camp":
	    css = "HIIT";
	    break;
	  case "Just Stretch":
	     css = "STRETCH";
	   
	}

	return css;
}

function statusWrangler(status) {

	var css = status;

	switch (status) {
	  case 0:
	    css = "Normal";
	    break;
	  case 1:
	    css = "Flagged";
	    break;
	  case 2:
	    css = "Replaced";
	    break;
	  case 3:
	    css = "Cancelled by Heather";
	    break;
	  case 4:
	    css = "Cancelled by User";
	    break;
	  case 5:
	    css = "Edited in Place";
	    break;
	  case 6:
	    css = "Done";
	  case 10:
	    css = "old Normal";
	    break;
	  case 11:
	    css = "old Flagged";
	    break;
	  case 12:
	    css = "old Replaced";
	    break;
	  case 13:
	    css = "old Cancelled by Heather";
	    break;
	  case 14:
	    css = "old Cancelled by User";
	    break;
	  case 15:
	    css = "old Edited in Place";
	    break;
	  case 16:
	    css = "old Done";
	}

	return css;
}

function statusCSSWrangler(status) {

	var css = status;

	switch (status) {
	  case 0:
	    css = "Normal";
	    break;
	  case 1:
	    css = "Flagged";
	    break;
	  case 2:
	    css = "Replaced";
	    break;
	  case 3:
	    css = "Cancelled";
	    break;
	  case 4:
	    css = "Cancelled";
	    break;
	  case 5:
	    css = "Edited";
	    break;
	  case 6:
	    css = "Done";
	  case 10:
	    css = "old Normal";
	    break;
	  case 11:
	    css = "old Flagged";
	    break;
	  case 12:
	    css = "old Replaced";
	    break;
	  case 13:
	    css = "old Cancelled";
	    break;
	  case 14:
	    css = "old Cancelled";
	    break;
	  case 15:
	    css = "old Edited";
	    break;
	  case 16:
	    css = "old Done";
	}
	
	return css;
}

function classCodeDisplayWrangler(messy) {
	return moment().day(ClassSchedule[messy].day).format("dddd") + " - " + ClassSchedule[messy].displaytime + " - " + ClassSchedule[messy].class;
}

function dateWrangler(dateString) {

	return moment(dateString).format('dddd, D MMM');

}

function initialsWrangler(string) {
	var names = string.split(' '),
        initials = names[0].substring(0, 1).toUpperCase();
    
    if (names.length > 1) {
        initials += names[names.length - 1].substring(0, 1).toUpperCase();
    }
    return initials;
}

function dayTimeWrangler(i) {
	var time = "" + BookingsMaster[i].time;

	return moment(BookingsMaster[i].date).set({'hour': time.substring(0, time.length - 2), 'minute':  time.slice(-2)}).calendar();
}

function dayTimeRecordWrangler(i) {
	var time = "" + RecordMaster[i].time;

	return moment(RecordMaster[i].date).set({'hour': time.substring(0, time.length - 2), 'minute':  time.slice(-2)}).calendar();
}

RecordMaster.sort( function(a, b) {
	return moment(a.day).diff(moment(b.day), 'days');
});

dates.sort(function(a, b){
    if(a < b) { return -1; }
    if(a > b) { return 1; }
    return 0;
})

function checkDateWrangler(date) {
	var today = moment().hour(23);
	today.subtract(1,'d');
	
	var date = moment( date );

	if(date.isSameOrAfter( today )){
		return true;
	} else {
		return false;
	}
}


/* ------------------------------------------

	Get's and Sets

---------------------------------------------*/



function postBooking(i) {
		$(".spinner-border").removeClass("hide");
		$(".modal-body").removeClass("green-background");
		$("#sendModal").modal();

		$.post( "https://organise.1stfootforward.co.nz/api/aprilbooking", 
					{"april_booking": {
						"status":0, 
						"user":BookingsMaster[i].user, 
						"displayuser":BookingsMaster[i].displayuser, 
						"classId":BookingsMaster[i].classId, 
						"code":BookingsMaster[i].code, 
						"type":BookingsMaster[i].type, 
						"time":BookingsMaster[i].time, 
						"displaytime":BookingsMaster[i].displaytime, 
						"day":BookingsMaster[i].day, 
						"date":BookingsMaster[i].day, 
						"replaces":0}
					}
				).done(function( data ) { 
		            console.log( data );  
		            if(data.data.code == BookingsMaster[i].code || data.data.displayuser == BookingsMaster[i].displayuser ) {
			            $(".modal-body").addClass("green-background");
			            $(".spinner-border").addClass("hide");
			        } else {
			        	alert( "Saving Failed" );
			        }
            	}).fail(function(xhr, status, error) {
			        console.log(xhr);
			        console.log(status);
			        console.log(error);
			    });
}

function cancelBooking() {		

		// $.put( "https://organise.1stfootforward.co.nz/api/aprilbooking/" + editingBooking, 
		// 			{"april_booking": {
		// 				"status":3 }
		// 			}
		// 		).done(function( data ) { 
		//             console.log( data );  
		//             if(data.data.code == BookingsMaster[i].code || data.data.displayuser == BookingsMaster[i].displayuser ) {
		// 	            $(".modal-body").addClass("green-background");
		// 	            $(".spinner-border").addClass("hide");
		// 	        } else {
		// 	        	alert( "Saving Failed" );
		// 	        }
  //           	}).fail(function(xhr, status, error) {
		// 	        console.log(xhr);
		// 	        console.log(status);
		// 	        console.log(error);
		// 	    });

		$(".spinner-border").removeClass("hide");
		$(".modal-body").removeClass("green-background");
		$("#sendModal").modal();

		var data = {"april_booking": {
						"status":3 }
					};

		$.ajax('https://organise.1stfootforward.co.nz/api/aprilbooking/' + BookingsMaster[ editingBooking ].id, {
		    method: 'PATCH',
		    data: data,
			dataType: 'json'
		}).done(function() {
		  console.log( data );  
		            if(data.april_booking.status == 3  ) {
		            	BookingsMaster[ editingBooking ].status = 3;
			            $(".modal-body").addClass("green-background");
			            $(".spinner-border").addClass("hide");
			            back();back();
						forward(4);
			        } else {
			        	alert( "Something Saved Wrong, Check for errors" );
			        	getBookings();
			        	back();back();
						forward(4);
			        }
		}).fail(function() {
		    alert( "error" );
		    getBookings();
			back();back();
			forward(4);
		});
}

function patchBooking() {		

		// $.put( "https://organise.1stfootforward.co.nz/api/aprilbooking/" + editingBooking, 
		// 			{"april_booking": {
		// 				"status":3 }
		// 			}
		// 		).done(function( data ) { 
		//             console.log( data );  
		//             if(data.data.code == BookingsMaster[i].code || data.data.displayuser == BookingsMaster[i].displayuser ) {
		// 	            $(".modal-body").addClass("green-background");
		// 	            $(".spinner-border").addClass("hide");
		// 	        } else {
		// 	        	alert( "Saving Failed" );
		// 	        }
  //           	}).fail(function(xhr, status, error) {
		// 	        console.log(xhr);
		// 	        console.log(status);
		// 	        console.log(error);
		// 	    });

		$(".spinner-border").removeClass("hide");
		$(".modal-body").removeClass("green-background");
		$("#sendModal").modal();

		var data = {"april_booking": {
						"classId":BookingsMaster[editingBooking].classId, 
						"code":BookingsMaster[editingBooking].code, 
						"type":BookingsMaster[editingBooking].type, 
						"time":BookingsMaster[editingBooking].time, 
						"displaytime":BookingsMaster[editingBooking].displaytime, 
						"day":BookingsMaster[editingBooking].day, 
						"date":BookingsMaster[editingBooking].day}
					}

		$.ajax('https://organise.1stfootforward.co.nz/api/aprilbooking/' + BookingsMaster[ editingBooking ].id, {
		    method: 'PATCH',
		    data: data,
			dataType: 'json'
		}).done(function() {
		  console.log( data ); 
		  			if(data.april_booking.code == BookingsMaster[editingBooking].code || data.data.displayuser == BookingsMaster[editingBooking].displayuser ) { 
		            	getBookings();
			            $(".modal-body").addClass("green-background");
			            $(".spinner-border").addClass("hide");
			            back();back();
						forward(4);
			        } else {
			        	alert( "Something Saved Wrong, Check for errors" );
			        	getBookings();
			        	back();back();
						forward(4);
			        }
		}).fail(function() {
		    alert( "error" );
		    getBookings();
			back();back();
			forward(4);
		});
}

function postRecord(i) {
		$(".spinner-border").removeClass("hide");
		$(".modal-body").removeClass("green-background");
		$("#sendModal").modal();

		if(RecordMaster[ i ].status > 9) {
			alert( "error" );
		    getRecords();
			back();back();
			forward(5);
			return false;
		}

		$.post( "https://organise.1stfootforward.co.nz/api/" + recordURL , 
					{"june_record": {
						"status":0, 
						"user":RecordMaster[i].user, 
						"displayuser":RecordMaster[i].displayuser, 
						"classId":RecordMaster[i].classId, 
						"code":RecordMaster[i].code, 
						"type":RecordMaster[i].type, 
						"time":RecordMaster[i].time, 
						"displaytime":RecordMaster[i].displaytime, 
						"day":RecordMaster[i].day, 
						"date":RecordMaster[i].day, 
						"paytype":RecordMaster[i].paytype,
						"payamount":RecordMaster[i].payamount,
						"replaces":0}
					}
				).done(function( data ) { 
		            console.log( data );  
		            if(data.data.code == RecordMaster[i].code || data.data.displayuser == RecordMaster[i].displayuser ) {
			            $(".modal-body").addClass("green-background");
			            $(".spinner-border").addClass("hide");
			        } else {
			        	alert( "Saving Failed" );
			        }
            	}).fail(function(xhr, status, error) {
			        console.log(xhr);
			        console.log(status);
			        console.log(error);
			    });
}

function cancelRecord() {
		$(".spinner-border").removeClass("hide");
		$(".modal-body").removeClass("green-background");
		$("#sendModal").modal();

		if(RecordMaster[ editingRecord ].status > 9) {
			alert( "error" );
		    getRecords();
			back();back();
			forward(5);
			return false;
		}

		var data = {"june_record": {
						"status":3 }
					};

		$.ajax('https://organise.1stfootforward.co.nz/api/' + recordURL + '/' + RecordMaster[ editingRecord ].id, {
		    method: 'PATCH',
		    data: data,
			dataType: 'json'
		}).done(function() {
		  console.log( data );  
		            if(data.june_record.status == 3  ) {
		            	RecordMaster[ editingRecord ].status = 3;
			            $(".modal-body").addClass("green-background");
			            $(".spinner-border").addClass("hide");
			            back();back();
						forward(5);
			        } else {
			        	alert( "Something Saved Wrong, Check for errors" );
			        	getRecords();
			        	back();back();
						forward(5);
			        }
		}).fail(function() {
		    alert( "error" );
		    getRecords();
			back();back();
			forward(5);
		});
}

function getBookings() {
	$.get( "https://organise.1stfootforward.co.nz/api/aprilbooking").done(function( data ) { 		           
		            BookingsMaster = data.data;  
		            $("#steptwo").removeClass("loading");
            });
}

function getRecords() {
	$.get( "https://organise.1stfootforward.co.nz/api/" + recordURL).done(function( data ) { 
		             //RecordMaster = data.data; 
		             RecordMaster = RecordOld.concat(data.data);
		             $("#stepone").removeClass("loading");
            });
}

function getUsers() {
	$.get( "https://sore-old-morpho.gigalixirapp.com/api/users").done(function( data ) { 
		             //RecordMaster = data.data; 
		            UserMaster = data.data;
		            console.log(UserMaster);
		             //$("#stepone").removeClass("loading");
            });
}

