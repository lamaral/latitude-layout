(function() {
	'use strict';

	window.addEventListener('WebComponentsReady', function(e) {
		var $lowerThirdHide = $('.latitude-third-hide');
		var $lowerThirdUpdate = $('.latitude-third-update');
		var assetNamesReplicant = nodecg.Replicant('assets:names');
		var files;
		var names;

		assetNamesReplicant.on('change', function(newValue, oldValue) {
			files = newValue;
			if (files.length > 0) {
				$.getJSON(files[0].url, function(json) {
					names = json;
					$('#nomes').empty();
					names.forEach(function(name, idx) {
						var element = '<paper-item class="nome"><paper-item-body two-line><div>' + name.topline + '</div><div secondary>' + name.bottomline + '</div></paper-item-body><paper-button raised class="green load-button" style="margin-left: auto; margin-right: 0;" data-id="' + idx + '">Load&nbsp;<iron-icon icon="av:play-arrow" title="Load"></iron-icon></paper-button></paper-item>';
						$('#nomes').append(element);
					});
					$('.load-button').click(function() {
						loadData($(this).data('id'));
					});
				});
			}
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

		function loadData(id) {
			$('#latitude-third-top-text').val(names[id].topline);
			$('#latitude-third-bottom-text').val(names[id].bottomline);
		}
	});
})();
