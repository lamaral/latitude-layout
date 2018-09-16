$(function() {
	'use strict';

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
                    var element = '<a href="#" class="list-group-item list-group-item-action flex-column align-items-start load-button" data-id="' + idx + '"><div class="d-flex w-100 justify-content-between"><h5 class="mb-1">' + message.message + '</h5></div><p class="mb-1">' + message.description + '</p></a>'
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
