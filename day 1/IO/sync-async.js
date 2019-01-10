/**
 * CodeBlock 1
 * Blocking NodeJS method - Notice Sync at the end of the method, that means its blocking code.
 */
// const fs = require('fs');
// const data = fs.readFileSync('./file.txt'); // blocks here until file is read

// console.log(data);

// // moreWork(); will run after console.log
// console.log("additional data");

/**
 * CodeBlock 2
 * Non-Blocking NodeJS method - Notice there is no Sync at the end of the method
 * but has a callback to execute when file reading is actually complete.
 */
 
// const fs = require('fs');
// fs.readFile('./file.txt', (err, data) => {
//   if (err) throw err;
//   else console.log(data);
// });

// // moreWork(); will run before console.log
// console.log("additional data");




/**
 * Advantages ?
 * - First eg will block the execution of any additional JavaScript until the entire file is read.
 *   Second one is async. Higher throughput.
 * - Error handling in second case, first will crash the program if error occurs.
 * - Predictable, easier to debug and understand. first one
 */

 // Mixing Sync and async code

 // Mixing Blocking and Non-blocking - Oops code!

// const fs = require('fs');
// fs.readFile('/file2.txt', (err, data) => {
//   if (err) throw err;
//   console.log(data);
// });
// // findout what fs.unlinkSync and fs.unlink does?
// fs.unlinkSync('/file2.txt');

// const syncdata = fs.readFileSync('./file3.md');
// console.log(syncdata);
// fs.unlinkSync('./file3.md');

// Entirely Non-blocking - Good code!

// const fs = require('fs');
// fs.readFile('./file2.md', (readFileErr, data) => {
//   if (readFileErr) throw readFileErr;
//   console.log(data);
//   fs.unlink('./file2.md', (unlinkErr) => {
//     if (unlinkErr) throw unlinkErr;
//   });
// });

// Read more about Blocking-Non blocking code

// https://nodejs.org/en/docs/guides/blocking-vs-non-blocking/
// https://www.youtube.com/watch?v=8aGhZQkoFbQ&vl=en
// https://medium.com/front-end-hacking/javascript-event-loop-explained-4cd26af121d4
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/EventLoop