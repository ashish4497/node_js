const fs = require("fs");
const path = require("path");

var baseDir = path.join(__dirname, "data");
// console.log(baseDir);

// fs.open(baseDir+ '/ashish.txt', 'wx', (err, fd) => {
//   // console.log(err, fd);
//   if(err) console.log(err);
//   fs.writeFile(fd, 'this is ashish kumar', (err) => {
//     if(err) console.log(err, 'could not file to write');
//     console.log('success');
//   })
// });

// fs.readFile(baseDir +'/ashish.txt',(err,data) => {
//   if (err) throw err;
//   console.log(data.toString());
// });

// fs.open(baseDir + "/ashish.txt", "w", (err, fd) => {
//   fs.ftruncate(fd, (err) => {
//     if (err) {
//       console.log(err);
//     } else {
//       fs.write(fd, 'changes in file', (err) => {
//         if (err) console.log(err, 'error in write');
//         console.log(fd.toString());
//       });
//     }
//   });
// });

// const port = process.env.PORT|| 4000;
// const http = require("http");

// http.createServer((req, res) => {
//   if (req.method === "POST" && req.url === "/user") {

//     var buffer = '';
//     req.on("data",(chunk) => {
//       buffer += chunk.toString();
//       // console.log(buffer,"buffer data");

//     });
//     req.on('end', ()=> {
//       var obj =JSON.parse(buffer)
//       fs.open(baseDir +'/'+ obj.name +'.json', 'wx', (err,fd) =>{
//         if(err) console.log(err);
//         fs.write(fd,buffer, (err) => {
//           if(err) console.log("data not found");
//           console.log('data founded')
//         })
//       })
//       res.writeHead(200);
//       res.end(buffer);
//     });
//   }
//     else {
//       res.statusCode=404;
//       res.end();
//     }
//   }).listen(4000);

const http = require("http");

http.createServer((req, res) => {
  if(req.method === "PUT" && req.url === "/user") {
    var buffer = "";
    req.on("data", (chunk) => {
      buffer += chunk.toString();
      // console.log(buffer,"buffer data");
    });
    req.on('end', ()=> {
        var obj =JSON.parse(buffer);
      fs.open(__dirname + '/' + obj.name + 'json', 'w', (err ,fd)=> {
        fs.ftruncate(fd,(err)=> {
          if(err) {
            console.log(err);
          } else {
            fs.write(fd,buffer, (err) => {
              if(err) console.log("data not found");
              console.log("data founded")
            })
          }console.log("1",buffer);
        });console.log("2",buffer);
      });console.log("3",buffer);
      res.writeHead(200);
      res.end(buffer.toString());
    });
  } else {
    res.statusCode = 404;
    res.end();
  }
}).listen(4000);
