'use strict';

$(function () {
  nodecg.listenFor('lowerThirdHide', hide);
	nodecg.listenFor('lowerThirdUpdate', update);

	function hide(data) {

	}

	function update(data) {
    $('#lowerthirdtoptext').text(data.top);
		$('#lowerthirdbottomtext').text(data.bottom);
		$('#lowerthirdcontainer').animate({left: "0%"}, 800);
    setInterval(function() {
        $('#lowerthirdcontainer').animate({left: "-100%"}, 800);
    }, 6000)
	}
});
