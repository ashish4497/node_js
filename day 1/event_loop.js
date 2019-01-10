// 1. stack / call stack
	// -- calling a function, variables or params pushes it on stack.



// 2. task queue/ event queue / message queue / callback queue


// -- WebApis for asynchronous tasks in browser
// -- c++ apis(libuv library) of node for async tasks in node which handles thread-pool.


function main () {
    const hypotenuse = getLengthOfHypotenuse(3, 4);
  	console.log(hypotenuse)
  }


function getLengthOfHypotenuse(a, b) {
  const squareA = square(a)
  const squareB = square(b)
  const sumOfSquares = squareA + squareB
     return Math.sqrt(sumOfSquares)
}


// setTimeout(() => {
// 	console.log('Execute it later');
// }, 100);
 
// setTimeout(() => {
// 	console.log('Execute after 50 ms');
// }, 50);



 function square(number) {
   return number * number
 }
 
 main()