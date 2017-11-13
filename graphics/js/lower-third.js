'use strict';

$(function () {
  nodecg.listenFor('lowerThirdHide', hide);
	nodecg.listenFor('lowerThirdUpdate', update);

  this.timer = null;

	function hide(data) {
    clearTimeout(this.timer);
    $('#lowerthirdcontainer').animate({left: "-100%"}, {duration: 800, complete: function() {
      $('#logocontainer').animate({left: "-100%"}, 800);
    }});
	}

	function update(data) {
    $('#lowerthirdtoptext').text(data.top);
		$('#lowerthirdbottomtext').text(data.bottom);
		$('#logocontainer').animate({left: "0%"}, {duration: 800, complete: function() {
      $('#lowerthirdcontainer').animate({left: "0%"}, {duration: 800, complete: function() {
        this.timer = setTimeout(function() {
            $('#lowerthirdcontainer').animate({left: "-100%"}, {duration: 800, complete: function() {
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
