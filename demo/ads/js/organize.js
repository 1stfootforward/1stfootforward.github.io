/* ------------------------------------------

	Navigation

---------------------------------------------*/



function forward(num) {
	$("#navSection").addClass("hide");
	$("#classSection").addClass("hide");
	$("#userSection").addClass("hide");
	$("#bookingSection").addClass("hide");
	$("#recordSection").addClass("hide");

	if(num == 0) {
		$("#navSection").removeClass("hide");
		$("#backButton").addClass("hide");
	}

	if(num == 2) {
		$("#userSection").removeClass("hide");
		$("#backButton").removeClass("hide");
	}

	if(num == 3) {
		$("#classSection").removeClass("hide");
		$("#backButton").removeClass("hide");
	}

	if(num == 4) {
		$("#bookingSection").removeClass("hide");
		$("#backButton").removeClass("hide");
	}

	if(num == 5) {
		$("#recordSection").removeClass("hide");
		$("#backButton").removeClass("hide");
	}
}



/* ------------------------------------------

	Lists and Blocks

---------------------------------------------*/



function userlist() {

	$("#usernumber").html(  UserMaster.length);

	for (var i = 0; i < UserMaster.length; i++) {
		
		userBlocks( i );
	}

}

userlist();
classlist();
bookinglist();
recordlist();

function userBlocks(i) {

		var copying = $("#reuseable-user-block").clone();
		copying.attr( "id", "user-" +  i );
		copying.attr("userid", i);
		copying.removeClass("hide");
		// copying.attr( "classScheduleID", ClassSchedule[i].id );
		// copying.addClass( ClassSchedule[i].class );
		copying.children("div").children( ".display-name" ).html(UserMaster[i].display  );
		// copying.children(".col-8").children( ".btn-groupclass" ).html( '<img class="avatar sm-logo mr-3" src="assets/img/theme/' + ClassSchedule[i].class + '.jpg"><b>' + ClassSchedule[i].class + '</b>'  );
		
		copying.appendTo( "#user-block" );  
}

$( ".individual-user" ).click(function() {

  var user = UserMaster[ parseInt( $(this).attr("userid") ) ]
  console.log( moment(user.joindate).format() );

});



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
		// copying.attr( "classScheduleID", ClassSchedule[i].id );
		// copying.addClass( ClassSchedule[i].class );
		copying.children("div").children( ".display-name" ).html(ClassSchedule[i].code  );
		// copying.children(".col-8").children( ".btn-groupclass" ).html( '<img class="avatar sm-logo mr-3" src="assets/img/theme/' + ClassSchedule[i].class + '.jpg"><b>' + ClassSchedule[i].class + '</b>'  );
		
		copying.appendTo( "#class-block" );  
}

$( ".individual-class" ).click(function() {

  var pickedclass = ClassSchedule[ parseInt( $(this).attr("classid") ) ]
  console.log( pickedclass.code );

});


function bookinglist() {
	$("#bookingnumber").html(  BookingsMaster.length);
	for (var i = 0; i < BookingsMaster.length; i++) {
		bookingBlocks( i );
	}
}

function bookingBlocks(i) {

		var copying = $("#reuseable-booking-block").clone();
		copying.attr( "id", "booking-" +  i );
		copying.attr("bookingid", i);
		copying.removeClass("hide");
		copying.addClass( classtocssWrangler(BookingsMaster[i].type) );
		// copying.attr( "classScheduleID", ClassSchedule[i].id );
		// copying.addClass( ClassSchedule[i].class );
		copying.children("div").children("div").children("div").children( ".display-name" ).html(BookingsMaster[i].displayuser  );
		copying.children("div").children("div").children( ".display-code" ).html(BookingsMaster[i].code  );
		copying.children("div").children("div").children("div").children( ".display-date" ).html( dateWrangler(BookingsMaster[i].day)  );
		copying.children("div").children("div").children( ".display-time" ).html(BookingsMaster[i].displaytime  );
		// copying.children(".col-8").children( ".btn-groupclass" ).html( '<img class="avatar sm-logo mr-3" src="assets/img/theme/' + ClassSchedule[i].class + '.jpg"><b>' + ClassSchedule[i].class + '</b>'  );
		
		copying.appendTo( "#booking-block" );  
}

$( ".individual-booking" ).click(function() {

  var pickedbooking = BookingsMaster[ parseInt( $(this).attr("bookingid") ) ]
  console.log( pickedbooking.code );

});


function recordlist() {
	$("#recordnumber").html( RecordMaster.length);
	RecordMaster.sort();
	for (var i = 0; i < RecordMaster.length; i++) {
		recordBlocks( i );
	}
}

function recordBlocks(i) {

		var copying = $("#reuseable-record-block").clone();
		copying.attr( "id", "record-" +  i );
		copying.attr("recordid", i);
		copying.removeClass("hide");
		copying.addClass( classtocssWrangler(RecordMaster[i].type) );
		// copying.attr( "classScheduleID", ClassSchedule[i].id );
		// copying.addClass( ClassSchedule[i].class );
		copying.children("div").children("div").children("div").children( ".display-name" ).html(RecordMaster[i].displayuser  );
		copying.children("div").children("div").children( ".display-code" ).html(RecordMaster[i].code  );
		copying.children("div").children("div").children("div").children( ".display-date" ).html( dateWrangler(RecordMaster[i].day)  );
		copying.children("div").children("div").children( ".display-time" ).html(RecordMaster[i].displaytime  );
		// copying.children(".col-8").children( ".btn-groupclass" ).html( '<img class="avatar sm-logo mr-3" src="assets/img/theme/' + ClassSchedule[i].class + '.jpg"><b>' + ClassSchedule[i].class + '</b>'  );
		
		copying.appendTo( "#record-block" );  
}

$( ".individual-record" ).click(function() {

  var pickedrecord = RecordMaster[ parseInt( $(this).attr("recordid") ) ]
  console.log( pickedrecord.code );

});















/* ------------------------------------------

	Wranglers

---------------------------------------------*/

function classtocssWrangler(messy) {

	var css = messy;

	switch (messy) {
	  case "S.E.T":
	    css = "SET";
	    break;
	  case "HIIT Camp":
	    css = "HIIT";
	    break;
	  case "Just Stretch":
	     css = "STRETCH";
	   
	}

	return css;

}

function dateWrangler(dateString) {

	return moment(dateString).format('dddd, D MMM');

}

RecordMaster.sort(function(a, b) {
	console.log(moment(a.day).diff(moment(b.day), 'days'));
    return moment(a.day).diff(moment(b.day), 'days');
});

