(function () {
	'use strict';

	const countdown = document.getElementById('countdown');
	const countdownMinutes = document.getElementById('countdownMinutes');
	const countdownSeconds = document.getElementById('countdownSeconds');
	const countdownColon = document.getElementById('countdownColon');
	const countdownTime = nodecg.Replicant('countdown');
	const countdownRunning = nodecg.Replicant('countdownRunning');

	const colonFlashAnim = new TimelineMax({repeatDelay: 0.5});
	colonFlashAnim.set(countdownColon, {visibility: 'visible'});
	colonFlashAnim.set(countdownColon, {visibility: 'hidden'}, 0.5);

	const zeroFlashAnim = new TimelineMax({repeat: -1});
	zeroFlashAnim.set(countdown, {visibility: 'visible'});
	zeroFlashAnim.set(countdown, {visibility: 'hidden'}, 1);
	zeroFlashAnim.set(countdown, {visibility: 'visible'}, 2);

	countdownTime.on('change', newVal => {
		countdownMinutes.innerText = newVal.minutes < 10 ? `0${newVal.minutes}` : newVal.minutes;
		countdownSeconds.innerText = newVal.seconds < 10 ? `0${newVal.seconds}` : newVal.seconds;
		colonFlashAnim.play(0);

		if (newVal.raw <= 10) {
			countdown.style.color = '#ffffff';
		} else {
			countdown.style.color = '#ffffff';
		}

		if (newVal.raw === 0) {
			colonFlashAnim.play(0);
			colonFlashAnim.stop();
			zeroFlashAnim.play(0);
		} else {
			zeroFlashAnim.stop();
			countdown.style.visibility = 'visible';
		}
	});

	countdownRunning.on('change', newVal => {
		if (newVal) {
			colonFlashAnim.repeat(0);
		} else {
			colonFlashAnim.play(0);
			colonFlashAnim.repeat(-1);
		}
	});
})();
