(function() {
	'use strict';

	window.addEventListener('WebComponentsReady', function(e) {
		var $lowerThirdHide = $('.latitude-third-hide');
		var $lowerThirdUpdate = $('.latitude-third-update');
    var namesReplicant = nodecg.Replicant('assets:names');
    var names;

    namesReplicant.on('change', function(newValue, oldValue) {
			names = newValue;
			console.log(names[0].url);
    });

    $lowerThirdHide.click(function() {
			nodecg.sendMessage('lowerThirdHide', lowerThirdData());
		});

		$lowerThirdUpdate.click(function() {
			nodecg.sendMessage('lowerThirdUpdate', lowerThirdData());
		});

		function lowerThirdData() {
			return {
				'top': $('#latitude-third-top-text').val(),
				'bottom': $('#latitude-third-bottom-text').val()
			}
		}
	});
})();
