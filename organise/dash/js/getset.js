var USERS = [];
var RECORDS = [];

		
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
	}
	$(".mdl-data-table").addClass("mdl-js-data-table mdl-data-table--selectable");
	
	componentHandler.upgradeAllRegistered();
}

function recordListInsert(i) {
	
	var copying = $("#reuseable-tr-record").clone();
	
		copying.attr( "id", "record-" +  i );
		copying.attr("recordid", i);
		copying.removeClass("hide");
		copying.find(".label").removeClass("is-upgraded");
		copying.addClass( "individual-record" );
		copying.addClass( "user-"+ rs(RECORDS[i].displayuser) );

		copying.find(".button-toggle").attr("onClick","toggle(" + i + ")");
		copying.find(".tc-1").html(RECORDS[i].displayuser  );
		copying.find(".tc-2").html(RECORDS[i].code  );
		copying.find(".tc-3").html(RECORDS[i].date );
		copying.find(".tc-4").html(RECORDS[i].displaytime  );
		copying.find(".tc-5").html(RECORDS[i].id  );
		copying.find(".tc-6").html(RECORDS[i].payamount  );
		copying.find(".tc-7").html(RECORDS[i].paytype  );
		copying.find(".tc-8").html(RECORDS[i].replaces  );
		copying.find(".tc-9").html(RECORDS[i].status  );
		copying.find(".tc-10").html(RECORDS[i].type  );
		copying.find(".tc-11").html(RECORDS[i].updated  );
		$("#main-table").append(copying);

}

function recordListInputInsert(i) {
	
	var copying = $("#reuseable-tr-input").clone();
	
		copying.attr( "id", "recordi-" +  i );
		copying.attr("recordid", i);
		copying.removeClass("hide");
		copying.find(".label").removeClass("is-upgraded");
		copying.addClass( "individual-record-input");
		
		//copying.addClass( "user-"+ rs(RECORDS[i].displayuser) );

		copying.find(".button-toggle").attr("onClick","toggle(" + i + ")");
		copying.find(".button-change").attr("onClick","change(" + i + ")");
		copying.find(".tc-1").children("input").val(RECORDS[i].displayuser  );
		copying.find(".tc-2").children("input").val(RECORDS[i].code  );
		copying.find(".tc-3").children("input").val(RECORDS[i].date );
		copying.find(".tc-4").children("input").val(RECORDS[i].displaytime  );
		copying.find(".tc-5").children("input").val(RECORDS[i].id  );
		copying.find(".tc-6").children("input").val(RECORDS[i].payamount  );
		copying.find(".tc-7").children("input").val(RECORDS[i].paytype  );
		copying.find(".tc-8").children("input").val(RECORDS[i].replaces  );
		copying.find(".tc-9").children("input").val(RECORDS[i].status  );
		copying.find(".tc-10").children("input").val(RECORDS[i].type  );
		copying.find(".tc-11").children("input").val(RECORDS[i].updated  );
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
	console.log(".user-"+ rs(user));
}

function rs(str) {
	return str.replace(/\s+/g, '');
}

function change(i) {
	alert(i);
}