$(function() {
	'use strict';

    var assetKeysReplicant = nodecg.Replicant('assets:keys');
    var obsWebsocketReplicant = nodecg.Replicant('obs:websocket');
    var obsStreamStatusReplicant = nodecg.Replicant('obs:streamStatus');
    
    var connect = $('#connect');
    var disconnect = $('#disconnect');
    var startStream = $('#start-stream');
    var stopStream = $('#stop-stream');
    var updateKey = $('#update-key');
    var password = $('#password');
    var files;
    var keys;
    
    assetKeysReplicant.on('change', function(newValue, oldValue) {
        files = newValue;
        if (files.length > 0) {
            $.getJSON(files[0].url, function(json) {
                keys = json;
                $('#keys').empty();
                keys.forEach(function(key, idx) {
                    var element = '<a href="#" class="list-group-item list-group-item-action flex-column align-items-start load-button" data-id="' + idx + '"><div class="d-flex w-100 justify-content-between"><h5 class="mb-1">' + key.description + '</h5></div><p class="mb-1">' + key.key + '</p></a>'
                    $('#keys').append(element);
                });
                $('.load-button').click(function() {
                    loadData($(this).data('id'));
                });
            });
        }
    });
    
    obsWebsocketReplicant.on('change', function(newValue, oldValue) {
        switch(newValue.status) {
            case "disconnected":
            case "error":
                connect.prop('disabled', false);
                disconnect.prop('disabled', true);
                break;
            case "connecting":
                connect.prop('disabled', true);
                disconnect.prop('disabled', true);
                break;
            case "connected":
                connect.prop('disabled', true);
                disconnect.prop('disabled', false);
                break;
            default:
                console.log(newValue.status);
        }
        password.val(newValue.password);
    });
    
    obsStreamStatusReplicant.on('change', function(newValue, oldValue) {
       if (newValue) {
           startStream.prop('disabled', true);
           stopStream.prop('disabled', false);
           updateKey.prop('disabled', true);
       } else {
           startStream.prop('disabled', false);
           stopStream.prop('disabled', true);
           updateKey.prop('disabled', false);
       }
    });

    connect.click(function() {
        nodecg.sendMessage('obs:connect', {
            ip: $('#hostname').val(),
            port: $('#port').val(),
            password: $('#password').val()
        }).then(() => {
            console.log('successfully connected to obs');
            connect.prop('disabled', true);
        }).catch(err => {
            console.error('failed to connect to obs:', err);
            disconnect.prop('disabled', true);
        });
    });
    
    disconnect.click(function() {
        nodecg.sendMessage('obs:disconnect'
        ).then(() => {
            console.log('successfully disconnected from obs');
        }).catch(err => {
            console.error('failed to disconnect from obs:', err);
        });
    });
    
    startStream.click(function() {
        nodecg.sendMessage('obs:startStreaming'
        ).then(() => {
            console.log('successfully started streaming');
        }).catch(err => {
            console.error('failed to start streaming:', err);
        });
    });
    
    stopStream.click(function() {
        nodecg.sendMessage('obs:stopStreaming'
        ).then(() => {
            console.log('successfully stopped streaming');
        }).catch(err => {
            console.error('failed to stop streaming:', err);
        });
    });
    
    updateKey.click(function() {
        nodecg.sendMessage('obs:setStreamingKey', $('#streaming-key').val()
        ).then(() => {
            console.log('successfully set stream key');
        }).catch(err => {
            console.error('failed to set stream key:', err);
        });
    });

    function loadData(id) {
        $('#streaming-key').val(keys[id].key);
    }

});
