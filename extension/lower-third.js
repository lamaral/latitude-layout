'use strict';

let timer = null;
const TimeObject = require('./classes/time-object');

module.exports = function (nodecg) {
	const time = nodecg.Replicant('lower-third-timer', {defaultValue: new TimeObject(0), persistent: false});

	nodecg.listenFor('lowerThirdUpdate', start);

	/**
	 * Starts the countdown at the specified startTime.
	 * @returns {undefined}
	 */
	function start(starttime) {
		clearInterval(timer);
		const timeObj = new TimeObject(0);

		time.value = timeObj;
		timer = setInterval(tick, 1000);
	}

	/**
	 * Ticks the countdown timer down by one second, stopping the timer if it hits zero.
	 * @returns {undefined}
	 */
	function tick() {
		TimeObject.increment(time.value);
	}
};
