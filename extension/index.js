'use strict';

module.exports = function (nodecg) {
	try {
		require('./countdown')(nodecg);
	} catch (e) {
		nodecg.log.error('Failed to load "countdown" lib:', e.stack);
		process.exit(1);
	}

	try {
		require('./lower-third')(nodecg);
	} catch (e) {
		nodecg.log.error('Failed to load "lower-third" lib:', e.stack);
		process.exit(1);
	}
};
