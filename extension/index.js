'use strict';

// Packages
const OBSUtility = require('nodecg-utility-obs');


module.exports = function (nodecg) {
	try {
		require('./lower-third')(nodecg);
	} catch (e) {
		nodecg.log.error('Failed to load "lower-third" lib:', e.stack);
		process.exit(1);
	}
    
    const obs = new OBSUtility(nodecg);
};
