var USERS = [];
var RECORDS = [];
var NEWRECORDS = [];

		
function getusers() {
		$.get( "https://sore-old-morpho.gigalixirapp.com/api/users").done(function( data ) { 
		             //RecordMaster = data.data; 
		             console.log(data.data );
		             USERS = data.data;
		             fillUserLists();
            });
	}

	getusers();

function fillUserLists() {
		
	for (var i = 0; i < USERS.length; i++) {
		userListInsert( i);
	}

}

function userListInsert(i) {
		var copying = $("#reuseable-menu-link").clone();
		copying.attr( "id", "user-" +  i );
		copying.attr("userid", i);
		copying.removeClass("hide");
		copying.addClass( "individual-user" );

		copying.attr("onClick","selectUser('" + rs( USERS[i].display ) + "')" );
		copying.html(USERS[i].display  );

		$(".demo-navigation").append(copying);
}

getrecords();
function getrecords() {
		$.get( "https://sore-old-morpho.gigalixirapp.com/api/aprilrecord").done(function( data ) { 
		             //RecordMaster = data.data; 
		             console.log(data.data );
		             RECORDS = data.data;
		             fillRecordLists();
            });
	}

function fillRecordLists() {
		
	for (var i = 0; i < RECORDS.length; i++) {
		recordListInsert( i);
		recordListInputInsert(i);
		calculateRecord(i);
	}
	
	
	
	updateAll("data");
	calculate();
}

function recordListInsert(i) {
	
	var copying = $("#reuseable-tr-record").clone();
	
		copying.attr( "id", "record-" +  RECORDS[i].id );
		copying.attr("recordid", RECORDS[i].id);
		copying.addClass("hide");
		copying.find(".label").removeClass("is-upgraded");
		copying.addClass( "individual-record" );
		copying.addClass( "user-"+ rs(RECORDS[i].displayuser) );

		copying.find(".button-toggle").attr("onClick","toggle(" + RECORDS[i].id + ")");
		copying.find(".tc-1").html(RECORDS[i].displayuser  );
		copying.find(".tc-2").html(RECORDS[i].code  );
		copying.find(".tc-3").html(RECORDS[i].date );
		copying.find(".tc-4").html(RECORDS[i].displaytime  );
		//copying.find(".tc-5").html(RECORDS[i].id  );
		copying.find(".tc-6").html(RECORDS[i].payamount  );
		copying.find(".tc-7").html(RECORDS[i].paytype  ); 
		copying.find(".tc-9").html(RECORDS[i].status  );
		copying.find(".tc-10").html(RECORDS[i].type  );
		copying.find(".tc-11").html(RECORDS[i].updated_at  );
		$("#main-table").append(copying);

}

function recordListInputInsert(i) {
	
	var copying = $("#reuseable-tr-input").clone();
	
		copying.attr( "id", "recordi-" +  RECORDS[i].id );
		copying.attr("recordid", RECORDS[i].id);
		//copying.removeClass("hide");
		copying.find(".label").removeClass("is-upgraded");
		copying.addClass( "individual-record-input");
		//copying.addClass( "individual-input-");
		//copying.addClass( "user-"+ rs(RECORDS[i].displayuser) );

		copying.find(".button-toggle").attr("onClick","toggle(" + RECORDS[i].id + ")");
		copying.find(".button-change").attr("onClick","change(" + RECORDS[i].id + ")");
		copying.find(".tc-1").children("input").val(RECORDS[i].displayuser  );
		copying.find(".tc-2").children("input").val(RECORDS[i].code  );
		copying.find(".tc-3").children("input").val(RECORDS[i].date );
		copying.find(".tc-4").children("input").val(RECORDS[i].displaytime  );
		//copying.find(".tc-5").children("input").val(RECORDS[i].id  );
		copying.find(".tc-6").children("input").val(RECORDS[i].payamount  );
		copying.find(".tc-7").children("input").val(RECORDS[i].paytype  ); 
		copying.find(".tc-9").children("input").val(RECORDS[i].status  );
		copying.find(".tc-10").children("input").val(RECORDS[i].type  );
		copying.find(".tc-11").children("input").val(  );
		$("#main-table").append(copying);

}

function toggle(i) {
	                                           
	$("#record-" + i).toggleClass( "hide" );
	$("#recordi-" + i).toggleClass( "hide" );

}

function selectUser(user) {
	$(".individual-record").addClass("hide");
	$(".individual-record-input").addClass("hide");
	$(".user-"+rs(user)).removeClass("hide");

	calculateUser(user);
	console.log(".user-"+ rs(user));
}

function selectUsers(user, users) {
	$(".individual-record").addClass("hide");
	$(".individual-record-input").addClass("hide");
	$(".user-"+rs(user)).removeClass("hide");
	$(".user-"+rs(users)).removeClass("hide");

	calculateUsers(user, users);
	console.log(".user-"+ rs(user));
}

function selectUserss(user, users, userss) {
	$(".individual-record").addClass("hide");
	$(".individual-record-input").addClass("hide");
	$(".user-"+rs(user)).removeClass("hide");
	$(".user-"+rs(users)).removeClass("hide");
	$(".user-"+rs(userss)).removeClass("hide");

	calculateUsers(user, users);
	calculateUserss(user, users, userss);
	console.log(".user-"+ rs(user));
}

function calculate() {
	
	var account = 0;
	var coupon = 0;
	for (var i = 0; i < RECORDS.length; i++) {
		//console.log(RECORDS[i].displayuser);
		account = account + parseInt( RECORDS[i].income);
		coupon = coupon + parseInt( RECORDS[i].coupon);		
	}
	$("#account").html( account );
	$("#coupon").html( coupon );
	console.log(account);
}

function calculateUser(user) {
	console.log(user);
	var account = 0;
	var coupon = 0;
	for (var i = 0; i < RECORDS.length; i++) {
		//console.log(RECORDS[i].displayuser);
		if( rs(RECORDS[i].displayuser) == user ) {
			console.log(RECORDS[i].income);
			console.log(RECORDS[i].coupon);
			account = account + parseInt( RECORDS[i].income);
			coupon = coupon + parseInt( RECORDS[i].coupon);
		}
	}
	$("#account").html( account );
	$("#coupon").html( coupon );
	console.log(account);
}

function calculateUsers(user, users) {
	console.log(user);
	var account = 0;
	var coupon = 0;
	for (var i = 0; i < RECORDS.length; i++) {
		//console.log(RECORDS[i].displayuser);
		if( rs(RECORDS[i].displayuser) == user || rs(RECORDS[i].displayuser) == users ) {
			
			account = account + parseInt( RECORDS[i].income);
			coupon = coupon + parseInt( RECORDS[i].coupon);
		}
	}
	$("#account").html( account );
	$("#coupon").html( coupon );
	console.log(account);
}

function calculateUserss(user, users, userss) {
	console.log(user);
	var account = 0;
	var coupon = 0;
	for (var i = 0; i < RECORDS.length; i++) {
		//console.log(RECORDS[i].displayuser);
		if( rs(RECORDS[i].displayuser) == user || rs(RECORDS[i].displayuser) == users || rs(RECORDS[i].displayuser) == userss ) {
			
			account = account + parseInt( RECORDS[i].income);
			coupon = coupon + parseInt( RECORDS[i].coupon);
		}
	}
	$("#account").html( account );
	$("#coupon").html( coupon );
	console.log(account);
}

function calculateRecord(i) {
	var code = RECORDS[i].code.substring(0,3); 
	var codeEnd = RECORDS[i].code.substring(7,10);

	RECORDS[i].income = 0;
	RECORDS[i].coupon = 0;

	if(code == "INC"){
		RECORDS[i].income = RECORDS[i].payamount;
		
	} 
	if(code == "PUR"){
		RECORDS[i].income = -(RECORDS[i].payamount);

		if(codeEnd == "COC"){
			RECORDS[i].coupon = 10;
		}
	}
	if(codeEnd == "PT0"){
		RECORDS[i].income = -(RECORDS[i].payamount);
	}

	

	if(code != "INC" && code != "PUR" && codeEnd != "PT0"){
		if(RECORDS[i].paytype == "Coupon" ) {
			RECORDS[i].coupon = -1;
		} else {
			RECORDS[i].income = -(RECORDS[i].payamount);
		}
	}
	if(RECORDS[i].paytype == "Free" ) {
			RECORDS[i].coupon = 0;
			RECORDS[i].income = 0;
	}
}

function rs(str) {
	str = str.replace('\'','');
	return str.replace(/\s+/g, '');
}

function change(i) {
	post(i);
}

function post(i) {

	var copying = $("#recordi-"+i).clone();
	console.log( $("#reuseable-tr-input").clone());
	console.log(copying.find(".input-1").val());
		$.post( "https://sore-old-morpho.gigalixirapp.com/api/julyrecord" , 
					{"july_record": {
						"status":copying.find(".input-9").val(), 
						"user":999, 
						"displayuser":copying.find(".input-1").val(), 
						"classId": 999, 
						"code": copying.find(".input-2").val(), 
						"type":copying.find(".input-10").val(), 
						"time": 999, 
						"displaytime": copying.find(".input-4").val(), 
						"day": 999, 
						"date": copying.find(".input-3").val(), 
						"paytype": copying.find(".input-7").val(),
						"payamount":copying.find(".input-6").val(),
						"replaces":i}
					}
				).done(function( data ) { 
		            updateAll(data);
		            toggle(i);
            	}).fail(function(xhr, status, error) {
			        console.log(xhr);
			        console.log(status);
			        console.log(error);
			    });
}

function updateAll(data) {
	console.log(data);
	regetrecords();
	calculate();
}

function regetrecords() {
		$.get( "https://sore-old-morpho.gigalixirapp.com/api/julyrecord").done(function( data ) { 
		             NEWRECORDS = data.data; 
		             
		             refillRecordLists();
            });
	}

function findRecordById(x) {
	for (var i = RECORDS.length - 1; i >= 0; i--) {
		if(RECORDS[i].id == x) { return i;}
	}
}

function refillRecordLists() {
	var x = 0;
	for (var i = 0; i < NEWRECORDS.length; i++) {
		

		x = findRecordById(NEWRECORDS[i].replaces);

		console.log(NEWRECORDS[i].displayuser);
		console.log(RECORDS[x].displayuser);

		rerecordListInsert( i);
		rerecordListInputInsert(i);
				
		RECORDS[x].status = NEWRECORDS[i].status;
		RECORDS[x].displayuser = NEWRECORDS[i].displayuser;
		RECORDS[x].code = NEWRECORDS[i].code;
		RECORDS[x].type = NEWRECORDS[i].type;
		RECORDS[x].displaytime = NEWRECORDS[i].displaytime;
		RECORDS[x].date = NEWRECORDS[i].date;
		RECORDS[x].paytype = NEWRECORDS[i].paytype;
		RECORDS[x].payamount = NEWRECORDS[i].payamount;

		calculateRecord(x);	
	}

	
	componentHandler.upgradeAllRegistered();
	calculate( );
}

function rerecordListInsert(i) {
	var copying = $("#record-"+ NEWRECORDS[i].replaces);

		copying.find(".tc-1").addClass("updated");

		copying.find(".tc-1").html(NEWRECORDS[i].displayuser  );
		copying.find(".tc-2").html(NEWRECORDS[i].code  );
		copying.find(".tc-3").html(NEWRECORDS[i].date );
		copying.find(".tc-4").html(NEWRECORDS[i].displaytime  );
		//copying.find(".tc-5").html(RECORDS[i].id  );
		copying.find(".tc-6").html(NEWRECORDS[i].payamount  );
		copying.find(".tc-7").html(NEWRECORDS[i].paytype  ); 
		copying.find(".tc-9").html(NEWRECORDS[i].status  );
		copying.find(".tc-10").html(NEWRECORDS[i].type  );
		copying.find(".tc-11").html(NEWRECORDS[i].updated_at  );
		

}

function rerecordListInputInsert(i) {
	
	var copying = $("#recordi-"+ NEWRECORDS[i].replaces);
	
		
		copying.find(".tc-1").addClass("updated");

		copying.find(".tc-1").children("input").val(NEWRECORDS[i].displayuser  );
		copying.find(".tc-2").children("input").val(NEWRECORDS[i].code  );
		copying.find(".tc-3").children("input").val(NEWRECORDS[i].date );
		copying.find(".tc-4").children("input").val(NEWRECORDS[i].displaytime  );
		//copying.find(".tc-5").children("input").val(RECORDS[i].id  );
		copying.find(".tc-6").children("input").val(NEWRECORDS[i].payamount  );
		copying.find(".tc-7").children("input").val(NEWRECORDS[i].paytype  ); 
		copying.find(".tc-9").children("input").val(NEWRECORDS[i].status  );
		copying.find(".tc-10").children("input").val(NEWRECORDS[i].type  );
		copying.find(".tc-11").children("input").val(  );
		

}