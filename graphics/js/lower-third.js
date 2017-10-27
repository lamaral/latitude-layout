'use strict';

$(function () {
  nodecg.listenFor('lowerThirdHide', hide);
	nodecg.listenFor('lowerThirdUpdate', update);

	function hide(data) {

	}

	function update(data) {
    $('#lowerthirdtoptext').text(data.top);
		$('#lowerthirdbottomtext').text(data.bottom);
		$('#logocontainer').animate({left: "0%"}, {duration: 800, complete: function() {
      console.log('open lower container');
      $('#lowerthirdcontainer').animate({left: "0%"}, {duration: 800, complete: function() {
        console.log('interval')
        setTimeout(function() {
            console.log('close third container')
            $('#lowerthirdcontainer').animate({left: "-100%"}, {duration: 800, complete: function() {
              console.log('close logo container')
              $('#logocontainer').animate({left: "-100%"}, 800);
            }});
        }, 5000);
      }});
    }});
    // setInterval(function() {
    //     $('#lowerthirdcontainer').animate({left: "-100%"}, 800);
    // }, 5000);
	}
});
