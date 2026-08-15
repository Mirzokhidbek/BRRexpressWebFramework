//worrking with callback function
//event loop
// console.log("Jack Ma maslahatlari");
// const list = [
//   "yahshi talaba boling", // 0-20
//   "togri boshliq tanlang va koproq hato qiling", // 20-30
//   "uzingizga ishlashingizni boshlang", // 30-40
//   "siz kuchli bolgan narsalarni qiling", // 40-50
//   "yoshlarga investitsiya qiling", // 50-60
//   "endi dam oling, foydasi yoq endi", // 60
// ];
// //working with callback function
// function maslahatBering(a, callback) {
// if (typeof a !== "number") callback("insert a number", null);
// else if (a <= 20) callback(null, list[0]);
// else if (a > 20 && a <= 30) callback(null, list[1]);
// else if (a > 30 && a <= 40) callback(null, list[2]);
// else if (a > 40 && a <= 50) callback(null, list[3]);
// else if (a > 50 && a <= 60) callback(null, list[4]);
// else {
//     callback(null, list[5]);
// }
// }

// maslahatBering(30, (err, data) => {
//     if (err) console.log('ERROR:', err);
//     console.log('Answer', data);
// })


// //The core logic of these code snippets is to teach you the fundamental architecture of asynchronous programming, input validation, and error handling—concepts that are widely used when working with real servers, APIs, and databases.

// It breaks down into four main parts:

// 1. Input Validation:
// Checking whether the input provided by the user (a) is in the correct format (e.g., checking if it is a number). If it is invalid, an error is thrown or returned right away to prevent the program from crashing.

// 2. Business Logic:
// Comparing the given age against specific range thresholds (0-20, 20-30, etc.) and matching it to select the single correct piece of advice from the predefined list array.

// 3. Asynchronous Flow Management:
// In programming, operations like fetching data take time. Asynchronous handling ensures that these operations don't block the main execution thread. This explains why "passed here 0" and "passed here 1" execute first while the asynchronous process handles the logic in the background.

// 4. Handling Success or Errors:
// Separating the outcomes: if the process succeeds, it delivers the requested data (data), and if an error occurs, it catches it (err or .catch()) gracefully to prevent the application from breaking.

console.log("Jack Ma maslahatlari");
const list = [
  "yahshi talaba boling", // 0-20
  "togri boshliq tanlang va koproq hato qiling", // 20-30
  "uzingizga ishlashingizni boshlang", // 30-40
  "siz kuchli bolgan narsalarni qiling", // 40-50
  "yoshlarga investitsiya qiling", // 50-60
  "endi dam oling, foydasi yoq endi", // 60
];

async function maslahatBering(a) {
    if (typeof a !== "number") throw new Error("insert a number");
    else if (a <= 20) return list[0];
    else if (a > 20 && a <= 30) return list[1];
    else if (a > 30 && a <= 40) return list[2];
    else if (a > 40 && a <= 50) return list[3];
    else if (a > 50 && a <= 60) return list[4];
    else {
        return list[5];
        //    setTimeout(function () {
        //        return list[5];
        //    }, 5000);
    }
}

// console.log("passed here 0");
// maslahatBering(25)
//     .then((data) => {
//         console.log("javob:", data);
//     })
//     .catch((err) => {
//         console.log("ERROR:", err);
//     });
// console.log("passed here 1");
async function run() {
    let javob = await maslahatBering(20);
    console.log(javob);
    javob = await maslahatBering(31);
    console.log(javob);
    javob = await maslahatBering(41);
    console.log(javob);
}
run();
// Explanation of this approach (async/await):
// Modern and Clean Syntax: This is the cleanest and most popular way to handle asynchronous code in JavaScript. It avoids complex callback functions or long .then().catch() chains.

// The await Keyword: When JavaScript sees await, it pauses the execution of the run() function right on that line and waits for maslahatBering() to finish and return its result. Once the result is ready, it assigns it to the javob variable and moves to the next line.

// Synchronous-like Flow: Even though maslahatBering is an asynchronous operation, await makes the code read sequentially—line by line—just like regular synchronous code, making it much easier to read, write, and debug.















