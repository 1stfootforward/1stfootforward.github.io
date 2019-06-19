var income;
var purchase;
var group;
var pt;

var activePT;
var activeGroup;

var deductGroup = [];
var deductPT = [];
var deductPurchase = [];
var deductIncome = [];

var RecordActive = []
const Month = "april"

getActingRecords();

function getActingRecords() {
	$.get( "https://sore-old-morpho.gigalixirapp.com/api/" + Month + "record").done(function( data ) { 
		             //RecordMaster = data.data; 
		             RecordActive = data.data;
            });
}

function userSelected(i) {
 	$(".individual-user").addClass("hide");
 	//breadCrumbsHide[ breadCrumbsRemove.length  ] = "individual-user";
 // 	$(".user-menu").removeClass("hide");
    breadCrumbs[ breadCrumbs.length ] = "user-item";
	breadCrumbsRemove[ breadCrumbsRemove.length ] = "user-menu";
	userMenu(i);
}

function userMenu(x) {
		$(".individual-record").remove();
		income = 0;
		purchase = 0;
		group = 0;
		pt = 0;
		activePT = [];
		activeGroup = [];
		deductGroup = [];
		deductPT = [];
		deductPurchase = [];
		deductIncome = [];


		var copying = $("#reuseable-user-menu").clone();
		//copying.attr( "id", "user-" +  i );
		copying.attr("userid", i);
		copying.removeClass("hide");
		copying.addClass("user-menu");
		copying.attr("id","paymentZoneActive");

		//copying.attr("onClick", "userSelected(" + i + ")");
		
		copying.children("div").children( ".display-name" ).html(UserMaster[x].display  );
		
		copying.appendTo( "#user-block" ); 

		$("#accountMoney").html("0");
		$("#accountComped").html("0");
		$("#accountCoupons").html("0");
		$("#accountUnlimited").html("0");

		for (var i = 0; i < RecordActive.length; i++) {
			if(RecordActive[i].displayuser === UserMaster[x].display){
				//paymentBlocks(i);
				paymentRows(i);
			}
		}

		$("#Income").html(incomeWrangler(income));
		$("#Purchase").html(purchaseWrangler(purchase));
		$("#Group").html(groupWrangler(group));
		$("#PT").html(ptWrangler(pt));

		doneFiller();
}

function paymentBlocks(i) {
		var copying = $("#reuseable-record-block").clone();
		copying.attr( "id", "record-" +  i );
		copying.attr("recordid", i);
		copying.removeClass("hide");
		copying.addClass( classtocssWrangler(RecordActive[i].type) );
		copying.addClass( "individual-record" );
		copying.addClass( statusCSSWrangler( RecordActive[i].status ) );

		copying.children("div").children("div").children("div").children( ".display-name" ).html(RecordActive[i].displayuser  );
		copying.children("div").children("div").children( ".display-code" ).html(RecordActive[i].type  );
		copying.children("div").children("div").children( ".display-date" ).html( dayTimeRecordWrangler(i) );
		
		copying.children("div").children("div").children("img").attr("src", "img/" + RecordActive[i].type + ".jpg");
		copying.children("div").children("div").children("button").html(initialsWrangler(RecordActive[i].displayuser));
		copying.children("div").children("div").children("button").addClass(RecordActive[i].displayuser[0] + "u");


		var code = RecordActive[i].code.substring(0,3); 
		var codeEnd = RecordActive[i].code.substring(7,10);
		
		if(code == "INC"){
			
			income = income + RecordActive[i].payamount;
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

		var code = RecordActive[i].code.substring(0,3); 
		var codeEnd = RecordActive[i].code.substring(7,10);




		var copying = $("#reuseable-row").clone();
		copying.attr( "id", "record-" +  i );
		copying.attr("recordid", i);
		copying.removeClass("hide");
		copying.addClass( "individual-record" );

		copying.children(".line1").html(RecordActive[i].code  );
		copying.children(".line2").html(RecordActive[i].day  );
		
		
		if(code == "INC"){
			
			income = income + RecordActive[i].payamount;
			copying.children(".line3").html(RecordActive[i].payamount  );
			copying.children(".line4").html( RecordActive[i].type  );
			$(".income-body").append(copying);
			return true 
		}
		if(code == "PUR"){
			purchase++;
			deductPurchase[deductPurchase.length] = i;
			copying.children(".line3").html( RecordActive[i].payamount  );
			copying.children(".line4").html( "Deduct"  );
			$(".purchase-body").append(copying);
			return true 
		}
		if(codeEnd == "PT0"){
			pt++;
			activePT[activePT.length] = i;			
			copying = $("#reuseable-row-group").clone();
			copying.attr( "id", "record-" +  i );
			copying.attr("recordid", i);
			copying.removeClass("hide");
			copying.addClass( "individual-record" );

			copying.children(".line1").html(RecordActive[i].code  );
			copying.children(".line2").html(dateWrangler(RecordActive[i].day)  );
			copying.children(".line3").html( "Waiting"  );
			copying.find(".groupFree").attr("onClick","ptFree(" + i + ");");
			copying.find(".groupCoup").attr("onClick","ptCoup(" + i + ");");
			copying.find(".groupDeduct").attr("onClick","ptDeduct(" + i + ");");
			$(".pt-body").append(copying);
			return true 
		}
		group++;
		//copying.insertAfter( "#label-Group" ); 

		activeGroup[ activeGroup.length ] = i;
		copying = $("#reuseable-row-group").clone();
		copying.attr( "id", "record-" +  i );
		copying.attr("recordid", i);
		copying.removeClass("hide");
		copying.addClass( "individual-record" );

		copying.children(".line1").html(RecordActive[i].code  );
		copying.children(".line2").html(dateWrangler(RecordActive[i].day)  );
		copying.children(".line3").html( "Waiting"  );
		copying.find(".groupFree").attr("onClick","groupFree(" + i + ");");
		copying.find(".groupCoup").attr("onClick","groupCoup(" + i + ");");
		copying.find(".groupDeduct").attr("onClick","groupDeduct(" + i + ");");
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







function processing(i) {
	$("#record-"+i).addClass("process");
}

function error(i) {
	$("#record-"+i).addClass("error");
}

function holding(i) {
	$("#record-"+i).addClass("holding");
}

function done(i,data) {

	$("#record-"+i).addClass("old");
	$("#record-"+i).removeClass("process error holding");
	$("#record-"+i).children(".line3").html( data.april_record.paytype + " " + data.april_record.payamount   );
}

function doneFillRow(i) {

	$("#record-"+i).addClass("old");
	$("#record-"+i).removeClass("process error holding");
	$("#record-"+i).children(".line3").html( RecordActive[i].paytype + " " + RecordActive[i].payamount   );
}

function doneFiller() {
	var accountMoney = 0;
	var accountComped = 0;
	var accountCoupons = 0;
	for (var i = 0; i < activeGroup.length; i++) {
		if( RecordActive[activeGroup[i]].status > 9) {
			doneFillRow(activeGroup[i]);

			if(RecordActive[activeGroup[i]].paytype === "Deduct") {
				accountMoney = accountMoney - RecordActive[activeGroup[i]].payamount;
			}
			if(RecordActive[activeGroup[i]].paytype === "Free") {
				accountComped++;
			}
			if(RecordActive[activeGroup[i]].paytype === "Coupon") {
				accountCoupons--;
			}
		}
	}
	for (var i = 0; i < activePT.length; i++) {
		if( RecordActive[activePT[i]].status > 9) {
			doneFillRow(activePT[i]);

			if(RecordActive[activePT[i]].paytype === "Deduct") {
				accountMoney = accountMoney - RecordActive[activePT[i]].payamount;
			}
			if(RecordActive[activePT[i]].paytype === "Free") {
				accountComped++;
			}
			if(RecordActive[activePT[i]].paytype === "Coupon") {
				accountCoupons--;
			}
		}
	}
	for (var i = 0; i < deductPurchase.length; i++) {
		
		accountMoney = accountMoney - RecordActive[deductPurchase[i]].payamount;
	}

	accountMoney = accountMoney + income;

	$("#accountMoney").html(accountMoney + "");
	$("#accountComped").html(accountComped + "");
	$("#accountCoupons").html(accountCoupons + "");
}


function groupCoup(i) {
	processing(i);
	accountingPatcher(i, 10, "Coupon", 1);
}

function groupFree(i) {
	processing(i);
	accountingPatcher(i, 10, "Free", 0);
	
}

function groupDeduct(i) {
	holding(i);
	deductGroup[ deductGroup.length ] = i;
}

function groupDeductAct() {
	console.log(deductGroup.length);
	var amount = $("#group-deduct-number-input").val();
	for (var i = 0; i < deductGroup.length; i++) {
		console.log(deductGroup[i]);
		
		accountingPatcher(deductGroup[i], 11, "Deduct", amount);
	}
}

function ptCoup(i) {
	processing(i);
	accountingPatcher(i, 10, "Coupon", 1);
}

function ptFree(i) {
	processing(i);
	accountingPatcher(i, 10, "Free", 0);
	
}

function ptDeduct(i) {
	holding(i);
	deductPT[ deductPT.length ] = i;
}

function ptDeductAct() {
	console.log(deductPT.length);
	var amount = $("#pt-deduct-number-input").val();
	for (var i = 0; i < deductPT.length; i++) {
		console.log(deductPT[i]);
		
		accountingPatcher(deductPT[i], 11, "Deduct", amount);
	}
}

function accountingPatcher(i, status, paytype, payamount) {

	var joiner = Month + "_record";

	var data = {"april_record": {
						"status": status,
						"paytype": paytype,
						"payamount": payamount
					}
				}

		$.ajax( "https://sore-old-morpho.gigalixirapp.com/api/" + Month + "record/" + RecordActive[i].id, {
		    method: 'PATCH',
		    data: data,
			dataType: 'json'
		}).done(function() {
		  
		  console.log( data ); 
		  done(i, data);
		  getActingRecords();
			        
		}).fail(function() {
		    alert( "Something Saved Wrong, Check for errors" );
			error(i);
		    console.log( data );
		});

}