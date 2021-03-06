var net = require('net');

var client = new net.Socket();
client.connect(10000, '127.0.0.1', function() {
	console.log('Connected');
	client.write(JSON.stringify(
		{
			jsonrpc: '2.0',
			id: 123,
			method: 'balance',
			params: {}
		}) + '\n');
});

client.on('data', function(data) {
	console.log('Received: ' + data);

	var res = JSON.parse(data);

	console.log("available:", res.result.available);
	console.log("in_progress:", res.result.in_progress);
	console.log("locked:", res.result.locked);

	client.destroy(); // kill client after server's response
});

client.on('close', function() {
	console.log('Connection closed');
});
