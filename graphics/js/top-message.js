'use strict';

$(function () {
  nodecg.listenFor('topMessageHide', hide);
	nodecg.listenFor('topMessageUpdate', update);
  nodecg.listenFor('topMessageUpdateShow', updateShow);

  const textFitProperties = {minFontSize:17, maxFontSize: 30, alignHoriz: true, alignVert: true};

	function hide(data) {
    $('#container').animate({top: "-100%"}, {duration: 800});
	}

	function update(data) {
    $('#topmessagetext').text(data.message);
    textFit($('#topmessagetext'), textFitProperties);
  }

  function updateShow(data) {
    $('#topmessagetext').text(data.message);
    textFit($('#topmessagetext'), textFitProperties);
		$('#container').animate({top: "0%"}, {duration: 800});
  }
});
