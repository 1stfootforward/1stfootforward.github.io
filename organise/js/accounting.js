 function userSelected(i) {
 	$(".individual-user").addClass("hide");
 	//breadCrumbsHide[ breadCrumbsRemove.length  ] = "individual-user";
 // 	$(".user-menu").removeClass("hide");
    breadCrumbs[ breadCrumbs.length ] = "user-item";
	breadCrumbsRemove[ breadCrumbsRemove.length ] = "user-menu";
	userMenu(i);
}

function userMenu(i) {

		var copying = $("#reuseable-user-menu").clone();
		//copying.attr( "id", "user-" +  i );
		copying.attr("userid", i);
		copying.removeClass("hide");
		copying.addClass("user-menu");
		//copying.attr("onClick", "userSelected(" + i + ")");
		
		copying.children("div").children( ".display-name" ).html(UserMaster[i].display  );
		
		copying.appendTo( "#user-block" );  
}