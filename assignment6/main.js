//1)
// console.log("1");
// setTimeout(() => console.log("2"), 100);
// setTimeout(() => console.log("3"), 0);
// Promise.resolve().then(() => console.log("4"));
// console.log("5");
// //1,5,4,3,2

// //2)
// console.log("1");
// setTimeout(() => console.log("2"), 0);
// Promise.resolve().then(() => {
//   console.log("3");
//   setTimeout(() => console.log("4"), 0);
// });
// console.log("5");
// //1,5,3,2,4

//3
// async function sleep(ms){
//   return new Promise((resolve) => {setTimeout(resolve,ms)})
// }
// await sleep(1000)
// //4
// const number_rand = Math.floor(Math.random() * 20) + 1
// async function guess_number(t){
//   while(true){
//     let num = Math.floor(Math.random() * 20) + 1
//     console.log(num)
//     if(num === t){
//       break;
//     }
//     await sleep(1000)
    
//   }
// }
// guess_number(number_rand)

//5
let current_num = 5
let interval_time = 1000
async function func(c,i){
  let id = setInterval(() => {
    console.log(c)
    if(c === 0){
      clearInterval(id)
      return
    }
    else{
      c--
    }
    },i)
}
func(current_num,interval_time)