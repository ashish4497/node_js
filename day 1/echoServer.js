const http = require('http');
const { StringDecoder } = require('string_decoder');

// http.createServer((request, response) => {
//   if (request.method === 'POST' && request.url === '/echo') {
//     let body = [];
//     request.on('data', (chunk) => {
//       body.push(chunk);
//     }).on('end', () => {
//       body = Buffer.concat(body).toString();
//       response.end(body);
//     });
//   } else {
//     response.statusCode = 404;
//     response.end();
//   }
// }).listen(8000);

// http.createServer((req, res) => {
// 	if (req.method === 'POST' && req.url === '/echo') {
// 	  var decoder = new StringDecoder('utf-8');
// 		var buffer = '';
// 		req.on('data', (chunk) => {
// 			buffer += decoder.write(chunk);
// 		});

// 		req.on('end', () => {
// 			buffer += decoder.end();
// 			res.writeHead(200)
// 			res.end(buffer);
//   	}); 
// 	} else {
//     res.statusCode = 404;
//     res.end();
//   }
// }).listen(8000);

http.createServer((req, res) => {
	if (req.method === 'POST' && req.url === '/echo') {
		var buffer = '';
		req.on('data', (chunk) => {
			buffer += chunk.toString();
		});

		req.on('end', () => {
			// console.log(buffer);
			res.writeHead(200)
			res.end(buffer);
  	}); 
	} else {
    res.statusCode = 404;
    res.end();
  }
}).listen(8000);

// Buffer details
// https://medium.freecodecamp.org/do-you-want-a-better-understanding-of-buffer-in-node-js-check-this-out-2e29de2968e8