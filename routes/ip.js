const { networkInterfaces } = require('os');

const nets = networkInterfaces();
const results = Object.create({});

/**
 * Gets the local ip
 */
module.exports = function ip() {
	for (const name of Object.keys(nets)) {
		for (const net of nets[name]) {
			if (net.family === 'IPv4' && !net.internal) {
				if (!results[name]) {
					results[name] = [];
				}

				results[name].push(net.address);
			}
		}
	}

	return results[Object.keys(results)[0]][0];
}
