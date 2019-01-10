const http = require('http');
const url = require('url');

const port = process.env.PORT || 4000;

// Create Server

// http.createServer((req, res) => {
// 	console.log(req.headers);
// 	res.end(req.method);
// }).listen(port);

// Instantiate Server

// const server = http.createServer();

// server.on('request', (req, res) => {
// 	// Parse request url and query string optional params is set to true
// 	var parsedUrl = url.parse(req.url, true);
// 	console.log(parsedUrl)
// 	var requestObject = {
// 		method: req.method,
// 		headers: req.headers, 
// 		path: parsedUrl.pathname,
// 		queryString: parsedUrl.query
// 	};
// 	var convertedToString = JSON.stringify(requestObject);
// 	res.setHeader('Content-Type', 'application/json');
// 	res.writeHead(200);
// 	// res.statusCode = 200;
// 	res.end(convertedToString);
// });

// Listen on specific port
server.listen(port, () => {
	console.log('Server listening on port:'+port);
});


