const conf = require('./jsons/conf.json');
const fetch = require('node-fetch');

/**
 * Sends logs to loki
 */
module.exports = function logLoki(log) {
	var myHeaders = {
		'Content-Type': "application/json"
	}

	var json = JSON.stringify({
		"streams": [
			{
				"stream": {
					"job": "song"
				},
				"values": [
					[
						(Date.now() * 1000000).toString(),
						log
					]
				]
			}
		]
	});

	const requestOptions = {
		method: 'POST',
		headers: myHeaders,
		body: json,
		redirect: 'follow'
	};

	fetch(conf.lokiUrl +  "loki/api/v1/push", requestOptions)
		.then(response => response.text())
		.then(result => console.log(result))
		.catch(error => console.log('error', error));

}
