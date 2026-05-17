let arr1 = ["one","two","three"]
console.log(arr1.map((element) => element.slice(0,-1)))


let arr2 = [19,5,42,2,77]
let new_arr2 = arr2.sort((a,b) => a - b)
console.log(new_arr2[0] + new_arr2[1])


let arr3 = [10,12,4,2]
let sum = 0

let new_arr = arr3.forEach((element) => {sum += element})

console.log(sum)


let arr4 = ["cat","parrot","dog","elephant"]
let new_arr4 = arr4.filter((element) => element.length > 5)
console.log(new_arr4.join("#"))


let arr5 = [
  { name: "Ann",  cls: "A", grade: 90 },
  { name: "Ben",  cls: "B", grade: 75 },
  { name: "Cara", cls: "A", grade: 80 }
]

arr5.reduce((element) => {},{})
//მეხუთე დავალებაზე გავჭედე :D