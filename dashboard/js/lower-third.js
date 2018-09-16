$(function() {
	'use strict';

    var lowerThirdHide = $('.latitude-third-hide');
    var lowerThirdUpdate = $('.latitude-third-update-show');
    var stopwatch = $('#stopwatch');
    var assetNamesReplicant = nodecg.Replicant('assets:names');
    var lowerThirdTimer = nodecg.Replicant('lower-third-timer');
    var files;
    var names;

    lowerThirdTimer.on('change', function(newValue, oldValue) {
        var m = newValue.minutes;
        var s = newValue.seconds;
        stopwatch.html((m < 10 ? `0${m}` : m)+":"+(s < 10 ? `0${s}` : s));
    });

    assetNamesReplicant.on('change', function(newValue, oldValue) {
        files = newValue;
        if (files.length > 0) {
            $.getJSON(files[0].url, function(json) {
                names = json;
                $('#nomes').empty();
                names.forEach(function(name, idx) {
                    var element = '<a href="#" class="list-group-item list-group-item-action flex-column align-items-start load-button" data-id="' + idx + '"><div class="d-flex w-100 justify-content-between"><h5 class="mb-1">' + name.topline + '</h5></div><p class="mb-1">' + name.bottomline + '</p></a>'
                    $('#nomes').append(element);
                });
                $('.load-button').click(function() {
                    loadData($(this).data('id'));
                });
            });
        }
    });

    lowerThirdHide.click(function() {
        nodecg.sendMessage('lowerThirdHide', lowerThirdData());
    });

    lowerThirdUpdate.click(function() {
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
