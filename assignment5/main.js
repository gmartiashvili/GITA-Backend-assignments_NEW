//1) ფროფერთის წაშლა
let object = {
    a:5,
    b:7,
    c:9
}
let property = 'a'
function remove_property(obj,prop){
    delete obj[prop]
    return obj
}
console.log(remove_property(object,property))
//2) მასივის სორტირება კლებადობით 

const arr_before = [
  { name: "Ana", score: 50 },
  { name: "Nika", score: 80 },
  { name: "Luka", score: 70 }
] 

function sort_arr(arr){
    return arr.sort((a,b) => b['score']  - a['score'])
}
console.log(sort_arr(arr_before))
//3)სორტირება სათაურით
const movie_arr =  [
  { title: "Up", year: 2009 },
  { title: "The Lord of the Rings", year: 2001 }
]

function sort_movie(arr){
    return arr.sort((a,b) => b["title"].length - a["title"].length)
}
console.log(sort_movie(movie_arr))
//4) საშუალო ასაკი დეპარტამენტის მიხედვით
const arr_departament =[
  { name: "Ana", dept: "HR", age: 25 },
  { name: "Nika", dept: "IT", age: 30 },
  { name: "Luka", dept: "IT", age: 22 }
]
function mean_age(arr){
    let new_obj = arr.reduce((prev,curr) => {
        if(!prev[curr['dept']]){
            prev[curr['dept']] = curr['age']
        }else{
            prev[curr['dept']] += curr['age']
        }
        return prev
    },{})
    
    
    let counter = arr.reduce((prev,curr) => {
        if(!prev[curr['dept']]){
            prev[curr['dept']] = 1
        }else{
            prev[curr['dept']] += 1
        }
        return prev
    },{})

    for (let dept in new_obj) {
        new_obj[dept] = new_obj[dept] / counter[dept];
    }
    return new_obj;
}
console.log(mean_age(arr_departament))

//5) კომენტარების სიტყვების რაოდენობა
const comments = [
  { id:1, comment:"Hello world" }, 
  { id:2, comment:"This is great!" },
  { id:3, comment:"" }
] 
function count_comments_words(arr){
    const count = arr.reduce((tot,curr) => {
        if(curr['comment'] !== ""){
            return tot + curr['comment'].split(" ").length
        }else{
            return tot
        }
    }, 0)
    return count
}
console.log(count_comments_words(comments))

//6) დეპარტამენტები

const department = [
  { name: "Ana", department: "HR", salary: 2000 },
  { name: "Nika", department: "IT", salary: 5000 },
  { name: "Luka", department: "IT", salary: 3500 },
  { name: "Mariam", department: "HR", salary: 3000 }
]

function  sort_dep(arr){
    let sort_by_dep = arr.reduce((prev,curr) => {
        if(!prev[curr['department']]){
            prev[curr['department']] = []
        }
        prev[curr['department']].push(curr)
        return prev;
    },{})
    for (let dept in sort_by_dep){
        sort_by_dep[dept].sort((a,b) => b['salary'] - a['salary'])
    }
    return sort_by_dep
}
console.log(sort_dep(department))




//7) საბოლოო ფასი

let cart = [
  { title: "Laptop", price: 2000, quantity: 1, discountPercent: 10 },
  { title: "Mouse", price: 50, quantity: 2, discountPercent: 0 },
  { title: "Keyboard", price: 100, quantity: 1, discountPercent: 20 }
]

function full_price(arr){
    let count = arr.reduce((tot,curr) => {
        return tot + (curr['price'] * curr['quantity'] / 100 * (100 - curr['discountPercent']))
    },0)
    return count
}
console.log(full_price(cart))




//8) მასივი ობიექტად

let arr_users = [
  { id: 1, name: "Ana", age: 25 },
  { id: 2, name: "Nika", age: 30 },
  { id: 3, name: "Luka", age: 22 }
]
function arr_to_obj(arr){
    const obj = {}
    for(let i = 0; i < arr.length; i++){
        obj[i+1] = arr[i]
    }
    return obj
}
console.log(arr_to_obj(arr_users))