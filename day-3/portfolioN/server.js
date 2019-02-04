const http = require("http");
const fs = require("fs");
const path = require("path");
const quearystring = require("querystring");

var basDir = path.join(__dirname, "data");
// console.log(basDir)

const hostname = "127.0.0.1";
const port = 4000;
const server = http.createServer((req, res) => {
  if (req.url == "/") {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/html");
    fs.createReadStream(__dirname + "/index.html").pipe(res);
  }
  if (req.url == "/public/css/main.css") {
    res.setHeader("Content-Type", "text/css");
    fs.createReadStream(__dirname + req.url).pipe(res);
  }
  if (
    req.url.indexOf(".png") > -1 ||
    req.url.indexOf(".jpg") > -1 ||
    req.url.indexOf(".jpeg") > -1
  ) {
    var extname = req.url.split(".").pop();
    // console.log(extname);
    res.setHeader("Content-Type", `image/${extname}`);
    fs.createReadStream(__dirname + req.url).pipe(res);
  }
  if (req.url == "/data" && req.method == "POST") {
    var buffer = "";
    req.on("data", (chunk) => {
      buffer += chunk.toString();
    });
    req.on("end", () => {
      var obj = quearystring.parse(buffer);
      // console.log(obj)
      fs.open(basDir + `/${obj.fname}.json`, "w", (err, fileInfo) => {
        if (err) console.log(err);
        console.log(fileInfo);
        fs.write(fileInfo, JSON.stringify(obj), (err, fileInfo) => {
          if (err) console.log(err);
          console.log(fileInfo);
          fs.close(fileInfo ,()=> console.log("done"));
        });
      });
			res.end(JSON.stringify(obj))
		});
  }
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
