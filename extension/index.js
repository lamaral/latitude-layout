'use strict';

//const OBSUtility = require('./obs');
//const OBSUtility = require('nodecg-utility-obs');

module.exports = function (nodecg) {
	try {
		require('./lower-third')(nodecg);
	} catch (e) {
		nodecg.log.error('Failed to load "lower-third" lib:', e.stack);
		process.exit(1);
	}
    
    try {
		const OBSUtility = require('./obs');
        const obs = new OBSUtility(nodecg);
	} catch (e) {
		nodecg.log.error('Failed to load "obs" lib:', e.stack);
		process.exit(1);
	}
    
    
};
