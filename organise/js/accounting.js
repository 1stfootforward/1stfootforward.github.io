var income;
var purchase;
var group;
var pt;

function userSelected(i) {
 	$(".individual-user").addClass("hide");
 	//breadCrumbsHide[ breadCrumbsRemove.length  ] = "individual-user";
 // 	$(".user-menu").removeClass("hide");
    breadCrumbs[ breadCrumbs.length ] = "user-item";
	breadCrumbsRemove[ breadCrumbsRemove.length ] = "user-menu";
	userMenu(i);
}

function userMenu(x) {
		income = 0;
		purchase = 0;
		group = 0;
		pt = 0;

		var copying = $("#reuseable-user-menu").clone();
		//copying.attr( "id", "user-" +  i );
		copying.attr("userid", i);
		copying.removeClass("hide");
		copying.addClass("user-menu");
		copying.attr("id","paymentZoneActive");

		//copying.attr("onClick", "userSelected(" + i + ")");
		
		copying.children("div").children( ".display-name" ).html(UserMaster[x].display  );
		
		copying.appendTo( "#user-block" ); 

		paymentLabels("Income"); 
		paymentLabels("Purchase"); 
		//paymentLabels("Group");
		paymentLabels("PT");

		for (var i = 0; i < RecordMaster.length; i++) {
			if(RecordMaster[i].displayuser === UserMaster[x].display){
				//paymentBlocks(i);
				paymentRows(i);
			}
		}

		$("#Income").html(incomeWrangler(income));
		$("#Purchase").html(purchaseWrangler(purchase));
		$("#Group").html(groupWrangler(group));
		$("#PT").html(ptWrangler(pt));
}

function paymentBlocks(i) {
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


		var code = RecordMaster[i].code.substring(0,3); 
		var codeEnd = RecordMaster[i].code.substring(7,10);
		
		if(code == "INC"){
			console.log(RecordMaster[i].payamount);
			income = income + RecordMaster[i].payamount;
			copying.insertAfter( "#label-Income" ); 
			return true 
		}
		if(code == "PUR"){
			purchase++;
			copying.insertAfter( "#label-Purchase" ); 
			return true 
		}
		if(codeEnd == "PT0"){
			pt++;
			copying.insertAfter( "#label-PT" ); 
			return true 
		}
		group++;
		copying.insertAfter( "#label-Group" ); 
		//copying.appendTo( "#paymentZoneActive" );  
}

function paymentRows(i) {
		var copying = $("#reuseable-row").clone();
		copying.attr( "id", "record-" +  i );
		copying.attr("recordid", i);
		copying.removeClass("hide");
		copying.addClass( "individual-record" );

		copying.children(".line1").html(RecordMaster[i].code  );
		copying.children(".line2").html(RecordMaster[i].day  );



		var code = RecordMaster[i].code.substring(0,3); 
		var codeEnd = RecordMaster[i].code.substring(7,10);
		
		if(code == "INC"){
			console.log(RecordMaster[i].payamount);
			income = income + RecordMaster[i].payamount;
			copying.insertAfter( "#label-Income" ); 
			return true 
		}
		if(code == "PUR"){
			purchase++;
			copying.insertAfter( "#label-Purchase" ); 
			return true 
		}
		if(codeEnd == "PT0"){
			pt++;
			copying.insertAfter( ".group-body" ); 
			return true 
		}
		group++;
		//copying.insertAfter( "#label-Group" ); 
		$(".group-body").append(copying);
		//copying.appendTo( "#paymentZoneActive" );  
}

function paymentLabels(label) {

		var copying = $("#reuseable-class-block").clone();
		copying.attr( "id", "label-" + label);
		copying.attr( "onClick", "fillClass('" + label + "')");
		copying.removeClass("hide");
		copying.children("div").children( ".display-name" ).html( label );
		copying.children("span").attr( "id", label );
		copying.prependTo( "#paymentZoneActive" );
}


function incomeWrangler(income){
	return income;
}
function purchaseWrangler(purchase){
	return purchase;
}
function groupWrangler(record){
	return (record/2) + " hrs";
}
function ptWrangler(record){
	return (record/2) + " hrs";
}