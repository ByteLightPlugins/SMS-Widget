$(function() {
  
  // the click handler for the button
  $('button').on('click', function() {
    
    // do input validation
    var pattern = /[0-9]{10}/;
    var input = $('#fromNumber');
    var errors = BL.validateInput(input, pattern);
    
    // do input validation
    var input = $('#toNumber');
    errors = BL.validateInput(input, pattern) || errors;
    
    // do input validation
    errors = BL.validateInput($('#widgetLabel')) || errors;
    
    // do input validation
    errors = BL.validateInput($('#message')) || errors;
    
    if (errors) {
      return true;
    }
    
    // set up the configuration for the sms widget
    var content = {
      widget_label: $('#widgetLabel').val(),
      from_number: '+1' + $('#fromNumber').val(),
      to_number: '+1' + $('#toNumber').val(),
      message: $('#message').val()
    };
          
    // store the content          
    BL.createContent(JSON.stringify(content));
  })
})