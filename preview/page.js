$(function() {
  
  var offset = 10;
  
  // refresh function gets all of the sms messages and displays them
  refresh = function(firstTime) {
    BL.getSmsForLightGroup(json.from_number, function(data) {    
      $('ul>li').remove();
      for (var i = 0; i < data.length; i++) { 
        var received = data[i].received;
        toOrFromString = received ? "Received " : "Sent ";
        fromString = received ? "" : " By " + data[i].from_name;
        $('ul').append("<li>" + 
                          toOrFromString + data[i].date + fromString +
                        "</li>");
        $('ul').append("<li class='bl-spaced'>" + data[i].message + "</li>");
        $('ul').append("<li class='rule'><hr /></li>");
      }
      if (firstTime || data.length > 0) {
        BL.previewReady(offset);
      }
      offset = 20;
      setTimeout('refresh()', 2000);
    })
  }
  
  json = JSON.parse(BL.getContentForPreview().content[0].data);
  
  refresh(true);
  
  $('h2').text(json.widget_label);
  
  $('button').on('click', function() {
    
    // first do input validation
    var errors = false;
    var text = $('textarea');
    if (!text.val()) {
      text.addClass('error');
      errors = true
    }
    else {
      text.removeClass('error');
    }
  
    var from = $('input');
    if (!from.val() || from.val().trim() == '') {
      from.addClass('error');
      errors = true
    }
    else {
      from.removeClass('error')
    }
    
    // now if there are no errors simply call the BL.sendSms function
    if (!errors) {
      // generate the message to send
      var message = text.val();
      if (json.message) {
        message = message.trim() + " - " + json.message
      }
      
      BL.sendSms(
        message, 
        json.to_number, 
        json.from_number, 
        from.val(), 
        function() {
          $('textarea').val('');
          $('input').val('');
          window.location.reload();
        });
      text.val('');
    }
  })
  
})