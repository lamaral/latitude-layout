(function() {
	'use strict';

	window.addEventListener('WebComponentsReady', function(e) {
		const start = document.getElementById('start');
		const stop = document.getElementById('stop');
		const inputContainer = document.getElementById('countdownContainer');
		const timeInput = document.querySelector('time-input');
		var countdownRunning = nodecg.Replicant('countdownRunning');
		var countdown = nodecg.Replicant('countdown');

		timeInput.addEventListener('invalid-changed', e => {
			if (e.detail.value) {
				start.setAttribute('disabled-invalid', 'true');
			} else {
				start.removeAttribute('disabled-invalid');
			}

			checkStartButton();
		});

		start.addEventListener('click', () => {
			nodecg.sendMessage('startCountdown', timeInput.value);
		});

		stop.addEventListener('click', () => {
			nodecg.sendMessage('stopCountdown');
		});

		countdown.on('change', function(newValue, oldValue) {
			timeInput.setMS(newValue.minutes, newValue.seconds);
		});

		countdownRunning.on('change', function(newVal, oldVal) {
			if (newVal) {
				inputContainer.setAttribute('disabled', 'true');
				start.setAttribute('disabled-running', 'true');
				stop.removeAttribute('disabled');
			} else {
				inputContainer.removeAttribute('disabled');
				start.removeAttribute('disabled-running');
				stop.setAttribute('disabled', 'true');
			}

			checkStartButton();
		});

		/**
		 * Enables or disables the timer start button based on some criteria.
		 * @returns {undefined}
		 */
		function checkStartButton() {
			if (start.hasAttribute('disabled-invalid') || start.hasAttribute('disabled-running')) {
				start.setAttribute('disabled', 'true');
			} else {
				start.removeAttribute('disabled');
			}
		}
	});
})();
