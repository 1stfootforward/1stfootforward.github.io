var income;
var purchase;
var group;
var pt;

var ACTIVEUSER = 999;

var activePT;
var activeGroup;
var activeIncome;
var activePurchase;

var modified = [];

var deductGroup = [];
var deductPT = [];
var deductPurchase = [];
var deductIncome = [];

var RecordActive = [];
const Month = ["april","may","june"];

getActingRecords();

function getActingRecords() {
	
		RecordActive = [];
//console.log(Month[i]);		
		$.get( "https://sore-old-morpho.gigalixirapp.com/api/" + "april" + "record").done(function( data ) { 
		             //RecordMaster = data.data; 
		             fillActingRecords(data.data , "april");
		             
            });

	setTimeout(function(){
  

		$.get( "https://sore-old-morpho.gigalixirapp.com/api/" + "may" + "record").done(function( data ) { 
		             //RecordMaster = data.data; 
		             fillActingRecords(data.data , "may");
		             
            });
	}, 1000);
	setTimeout(function(){
		$.get( "https://sore-old-morpho.gigalixirapp.com/api/" + "june" + "record").done(function( data ) { 
		             //RecordMaster = data.data; 
		             fillActingRecords(data.data , "june");
		             
            });
	}, 2000);
	
	
}

function fillActingRecords(data, month) {
	for (var i = 0; i < data.length; i++) {
		data[i].month = month;
	}
	RecordActive = RecordActive.concat(data);
	console.log(data);
}

function refresh() {
	back();
	userSelected(ACTIVEUSER);
	setTimeout(function(){
		doneFiller();
	}, 3000);

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
		ACTIVEUSER = x;
		income = 0;
		purchase = 0;
		group = 0;
		pt = 0;
		activePT = [];
		activeGroup = [];
		activeIncome = [];
		activePurchase = [];
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


		fillAccountingDropDowns();

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
			activeIncome[activeIncome.length] = i;
			copying.children(".line3").html(RecordActive[i].payamount  );
			copying.children(".line4").html( RecordActive[i].type  );
			copying.find(".uncancel").attr("onClick","uncancel(" + i + ");");
			copying.find(".cancel").attr("onClick","cancel(" + i + ");");
			$(".income-body").append(copying);
			return true 
		}
		if(code == "PUR"){
			purchase++;
			activePurchase[activePurchase.length] = i;
			deductPurchase[deductPurchase.length] = i;
			copying.children(".line3").html( RecordActive[i].payamount  );
			copying.children(".line4").html( "Deduct"  );
			copying.find(".uncancel").attr("onClick","uncancel(" + i + ");");
			copying.find(".cancel").attr("onClick","cancel(" + i + ");");
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
			copying.find(".groupUnlimited").attr("onClick","ptUnlimited(" + i + ");");
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
		copying.find(".groupUnlimited").attr("onClick","groupUnlimited(" + i + ");");
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


function fillAccountingDropDowns() {
 	$(".removeable-dropdown").remove();
 	$(".removeable-dropdown-item").remove();
 	insertedUserNumber = 0;

 	for (var i = 0; i < UserMaster.length; i++) {
 		if(UserAccount[i].Active == 0 ) {
 			$( "<option class='removeable-dropdown-item' value='" + i + "'>" + UserMaster[i].display + "</option>" ).appendTo( ".user-dropdown" );
 			
 		}
 	}

 	var copy = $("#reuseable-user-accounting-dropdown").clone();
	console.log(copy);
	copy.attr("id","transfer-user-input");
	copy.removeClass("hide");
	$("#insert-user-accounting-dropdown").append(copy);

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
	$("#record-"+i).addClass("edited");
	$("#record-"+i).removeClass("process error holding");
	$("#record-"+i).children(".line3").html( RecordActive[i].paytype + " " + RecordActive[i].payamount   );
}

function doneTotal() {
	$(".old").removeClass("old");

	for (var i = 0; i < RecordActive.length; i++) {
			if(RecordActive[i].displayuser === UserMaster[ACTIVEUSER].display){
				if(RecordActive[i].status > 9){
					$("#record-"+i).addClass("old");
					$("#record-"+i).children(".line3").html( RecordActive[i].paytype + " " + RecordActive[i].payamount   );
				}
			}
		}
	for (var i = 0; i < modified.length; i++) {
			
					$("#record-"+ modified[i]).addClass("edited");			
		}
}

function doneEdited(i) {
	$("#record-"+i).removeClass("process error holding");
	$("#record-"+i).addClass("edited");
}

function doneFillRow(i) {

	$("#record-"+i).addClass("old");
	//$("#record-"+i).addClass("edited");
	$("#record-"+i).removeClass("process error holding");
	$("#record-"+i).children(".line3").html( RecordActive[i].paytype + " " + RecordActive[i].payamount   );
}

function doneFiller() {
	var accountMoney = 0;
	var accountSpent = 0;
	var accountComped = 0;
	var accountCoupons = 0;
	var accountUnlimited = 0;
	var unlimitedNumber = 0;
	for (var i = 0; i < activeGroup.length; i++) {
		if( RecordActive[activeGroup[i]].status > 9) {
			

			if(RecordActive[activeGroup[i]].paytype === "Deduct") {
				accountMoney = accountMoney - RecordActive[activeGroup[i]].payamount;
			}
			if(RecordActive[activeGroup[i]].paytype === "Free") {
				accountComped++;
			}
			if(RecordActive[activeGroup[i]].paytype === "Coupon") {
				accountCoupons--;
			}
			if(RecordActive[activeGroup[i]].paytype === "Unlimited") {
				accountUnlimited--;
			}
		}
	}
	for (var i = 0; i < activePT.length; i++) {
		if( RecordActive[activePT[i]].status > 9) {
			

			if(RecordActive[activePT[i]].paytype === "Deduct") {
				accountMoney = accountMoney - RecordActive[activePT[i]].payamount;
			}
			if(RecordActive[activePT[i]].paytype === "Free") {
				accountComped++;
			}
			if(RecordActive[activePT[i]].paytype === "Coupon") {
				accountCoupons--;
			}
			if(RecordActive[activePT[i]].paytype === "Coupon") {
				accountUnlimited--;
			}
		}
	}
	for (var i = 0; i < deductPurchase.length; i++) {
		if(RecordActive[deductPurchase[i]].status > 9){
			accountSpent = accountSpent - RecordActive[deductPurchase[i]].payamount;
			if(RecordActive[deductPurchase[i]].type == "COC"){
				accountCoupons = accountCoupons + 10;
			}
			if(RecordActive[deductPurchase[i]].type == "UNL"){
				unlimitedNumber++;
			}
		}
	}
	for (var i = 0; i < activeIncome.length; i++) {
		if( RecordActive[activeIncome[i]].status > 9) {
			
			accountMoney = accountMoney + RecordActive[activeIncome[i]].payamount;
			
		}
	}

	accountMoney = accountMoney + income;

	doneTotal();

	$("#accountMoney").html(accountMoney + "");
	$("#accountComped").html(accountComped + "");
	$("#accountCoupons").html(accountCoupons + "");
	$("#accountUnlimited").html(accountUnlimited + " / " + unlimitedNumber);
}


function groupCoup(i) {
	processing(i);
	accountingPatcher(i, 10, "Coupon", 1);
}

function groupFree(i) {
	processing(i);
	accountingPatcher(i, 10, "Free", 0);
	
}

function groupUnlimited(i) {
	processing(i);
	accountingPatcher(i, 10, "Unlimited", 0);
	
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

function ptUnlimited(i) {
	processing(i);
	accountingPatcher(i, 10, "Unlimited", 0);
	
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

	var tMonth = RecordActive[i].month;


	if( tMonth == "april") {
		var data = {"april_record": {
						"status": status,
						"paytype": paytype,
						"payamount": payamount
					}
				}
	}

	if( tMonth == "may") {
		var data = {"may_record": {
						"status": status,
						"paytype": paytype,
						"payamount": payamount
					}
				}
	}

	if( tMonth == "june") {
		var data = {"june_record": {
						"status": status,
						"paytype": paytype,
						"payamount": payamount
					}
				}
	}

	console.log( tMonth );

		$.ajax( "https://sore-old-morpho.gigalixirapp.com/api/" + tMonth + "record/" + RecordActive[i].id, {
		    method: 'PATCH',
		    data: data,
			dataType: 'json'
		}).done(function() {
		  
		  console.log( data ); 
		  done(i, data);
		  modified[modified.length] = i;
		  doneTotal();
		  getActingRecords();
			        
		}).fail(function() {
		    alert( "Something Saved Wrong, Check for errors" );
			error(i);
		    console.log( data );
		});

}

function transferMoney() {
	var other = $("#transfer-user-input").val();
	console.log( UserMaster[other].display   );
	var amount = $("#transfer-number-input").val();
	console.log( amount  );
	

	accountingTransfer(ACTIVEUSER, -(amount), other, 0);
	accountingTransfer(other, amount, ACTIVEUSER, 1);
}

function accountingTransfer(i, amount, other, last) {

	var joiner = Month + "_record";

	var data = {"june_record": {
						"classId": 0,
			            "code":  "INC" + UserMaster[i].id + "TRANS" + UserMaster[other].id ,
			            "date": moment( ).format("YYYY-MM-DD"),
			            "day": moment( ).format("YYYY-MM-DD"),
			            "displaytime": "null",
			            "displayuser": UserMaster[i].display,
			            "payamount": amount,
			            "paytype": "Transfer",
			            "replaces": 0,
			            "status": 10,
			            "time": 0,
			            "type": "Transfer",
			            "user": UserMaster[i].id
					}
				}

		$.ajax( "https://sore-old-morpho.gigalixirapp.com/api/" + "june" + "record" , {
		    method: 'POST',
		    data: data,
			dataType: 'json'
		}).done(function() {
		  
		  console.log( data ); 
		  if(last == 0) {
		  	getActingRecords();
		  } else {
		  	back();
		  	userSelected(ACTIVEUSER);
		  }
		 
		  
			        
		}).fail(function() {
		    alert( "Something Saved Wrong, Check for errors" );
			error(i);
		    console.log( data );
		});

}


function cancel(i) {
	processing(i);
	accountingStatus(i, 0);
}

function uncancel(i) {
	processing(i);
	accountingStatus(i, 11);
}

function accountingStatus(i, status) {

	var tMonth = RecordActive[i].month;


	if( tMonth == "april") {
		var data = {"april_record": {
						"status": status,

					}
				}
	}

	if( tMonth == "may") {
		var data = {"may_record": {
						"status": status,
						
					}
				}
	}

	if( tMonth == "june") {
		var data = {"june_record": {
						"status": status,
						
					}
				}
	}

	console.log( tMonth );

		$.ajax( "https://sore-old-morpho.gigalixirapp.com/api/" + tMonth + "record/" + RecordActive[i].id, {
		    method: 'PATCH',
		    data: data,
			dataType: 'json'
		}).done(function() {
		  
		  console.log( data ); 
		  doneEdited(i)
		  doneTotal();
		  modified[modified.length] = i;
		  getActingRecords();
			        
		}).fail(function() {
		    alert( "Something Saved Wrong, Check for errors" );
			error(i);
		    console.log( data );
		});

}