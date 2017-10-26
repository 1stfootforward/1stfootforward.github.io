  var token;

  $('#details').validator()
  
  $('#tickets').change(function(){

    var price = $('#tickets').val();

    price = price * 10;

    $('#price').html("$" + price);
  });

  start();

  function loader() {
    $("#details").addClass("hide");
    $("#payment").addClass("hide");
    $(".loader").removeClass("hide");

  }

  function details() {



      event.preventDefault();

      $('#details').validator('validate');

      console.log($('#details').validator('validate'));
       if( $("#Email").val().length < 1 ||  $("#Phone").val().length < 1 ||  $("#Name").val().length < 1 ||  $("#Street").val().length < 1 ||  $("#City").val().length < 1 ||  $("#Suburb").val().length < 1) {
        
          console.log("fail");
          $("#error-message").removeClass("hide");
      } else {
          senddetails();
          
      }

      
  }

  function senddetails() {

      event.preventDefault();
      loader();

      email = $("#Email").val();
      name =  $("#Name").val();

      address = $("#Street").val()+ " " +$("#Suburb").val() + " " + $("#City").val();

      $.post( "https://mighty-shelf-11601.herokuapp.com/recorddetails.json", {"fname": $("#Name").val() , "lname": " ", "email": $("#Email").val(), "street": $("#Street").val(), "suburb": $("#Suburb").val(), "city": $("#City").val(), "postcode": " ", "note": $("#Phone").val(), "note2": $("#goals").val() + " " + $("#classes").val(), "token" : token } )
                  .done(function( data ) {
                      
                      $(".loader").addClass("hide");
                       $("#payment").removeClass("hide");

                  })
                    .fail(function(response) {

                        $("#errormessage").html( 'Error: ' + "We're experiencing some technical difficulties, please try again later" );

                        $(".loader").addClass("hide");
                        $(".error-section").removeClass("hide");
                  
              });
    }

  function start() {
      $.post( "https://mighty-shelf-11601.herokuapp.com/beginsale.json", {"ip": "concession" , "location":"nz" } )
                    .done(function( data ) {
                      
                      token = data.token;
                      console.log(token);

                    })
                    .fail(function(response) {

                        $("#errormessage").html( 'Error: ' + "We're experiencing some technical difficulties. please try again later" );
                        $("#details").addClass("hide");
                        $("#payment").addClass("hide");
                        $(".error-section").removeClass("hide");
                  
              });
    }

    function stripesend( stripetoken ) {
 
      console.log("fire");
      $.post( "https://mighty-shelf-11601.herokuapp.com/stripe/charge.json", {"stripetoken": stripetoken , "name": name, "purchase": "1", "delivery": "", "address": address, "token":token, "email":email} )
                    .done(function( data ) { console.log( data ); pass(); })
                    .fail(function(data) {
                        console.log(data)
                        $("#errormessage").html( 'Please check your order and try again.\nError: <span>' + data + "</span>");

                        $("#details").addClass("hide");
                        $("#payment").addClass("hide");
                        $(".error-section").removeClass("hide");
                 
              });
    }

    var stripe = Stripe('pk_live_coJBhsdjz92nz62wn6hivrOc');
    var elements = stripe.elements();

    // Custom styling can be passed to options when creating an Element.
    var style = {
      base: {
        // Add your base input styles here. For example:
        fontSize: '16px',
        lineHeight: '24px'
      }
    };

    // Create an instance of the card Element
    var card = elements.create('card', {style: style});

    // Add an instance of the card Element into the `card-element` <div>
    card.mount('#card-element');

    var form = document.getElementById('payment-form');
    form.addEventListener('submit', function(event) {
      event.preventDefault();

      stripe.createToken(card).then(function(result) {
        if (result.error) {
          // Inform the user if there was an error
          var errorElement = document.getElementById('card-errors');
          errorElement.textContent = result.error.message;
        } else {
          // Send the token to your server
          stripesend(result.token.id);
        }
      });
    });

    function pass() {
      $("#tokenmessage").html( '#: ' + token.substring(0, 6) );
      $("#payment").addClass("hide");
      $(".pass-section").removeClass("hide");
    }
