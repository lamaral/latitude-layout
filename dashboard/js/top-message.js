(function() {
	'use strict';

	window.addEventListener('WebComponentsReady', function(e) {
		var messageHide = $('.latitude-message-hide');
		var messageUpdate = $('.latitude-message-update');
		var messageUpdateShow = $('.latitude-message-update-show');
		var assetMessagesReplicant = nodecg.Replicant('assets:messages');
		var files;
		var messages;

		assetMessagesReplicant.on('change', function(newValue, oldValue) {
			files = newValue;
			if (files.length > 0) {
				$.getJSON(files[0].url, function(json) {
					messages = json;
					$('#messages').empty();
					messages.forEach(function(message, idx) {
						var element = '<paper-item class="nome"><paper-item-body two-line><div>' + message.message + '</div><div secondary>' + message.description + '</div></paper-item-body><paper-button raised class="green load-button" style="margin-left: auto; margin-right: 0;" data-id="' + idx + '">Load&nbsp;<iron-icon icon="av:play-arrow" title="Load"></iron-icon></paper-button></paper-item>';
						$('#messages').append(element);
					});
					$('.load-button').click(function() {
						loadData($(this).data('id'));
					});
				});
			}
		});

		messageHide.click(function() {
			nodecg.sendMessage('topMessageHide', messageData());
		});

		messageUpdate.click(function() {
			nodecg.sendMessage('topMessageUpdate', messageData());
		});

		messageUpdateShow.click(function() {
			nodecg.sendMessage('topMessageUpdateShow', messageData());
		});

		function messageData() {
			return {
				'message': $('#top-message-text').val()
			}
		}

		function loadData(id) {
			$('#top-message-text').val(messages[id].message);
		}
	});
})();
