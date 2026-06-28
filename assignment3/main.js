//საშუალო არითმეტიკული
const arr = [1,2,3,4,5,6,7]
function mean_of_numbers(arr){ 
    return arr.reduce((prev,curr) => {return prev + curr} ,0) / arr.length
}
console.log(mean_of_numbers(arr))

//რიცხვის მასივად ჩაწერა
const num = 25146
function num_like_arr(num){
    return String(num).split("")
}

console.log(num_like_arr(num))

//მასივის გაფილტვრა
const a = [1, 2, 2, 2, 3]
const b = [2]
function filter_number(a,b){
    const arr = []
    for(let i = 0; i <a.length; i++){
        if(!b.find((num) => num === a[i])){
            arr.push(a[i])
        }
    }
    return arr
}
console.log(filter_number(a,b))


//მეორე ყველაზე დიდი რიცხვი
 const array = [10, 40, 20, 5, 30]
 function second_largest(arr){
    let largest = arr[0]
    for(let i = 1;i < arr.length;i++){
        if(arr[i] > largest){
            largest = arr[i]
        }
    }
    let second = -Infinity
    for(let i = 0;i < arr.length;i++){
        if(arr[i] > second && arr[i] < largest){
            second = arr[i]
        }
    }
    return second
 }
 console.log(second_largest(array))
 //პილინორმული სიტყვები

 const words = ["mom", "car", "level", "dog"]

 function check_words(words){
     return words.filter((word) => word === word.split('').reverse().join(''))
 }
 console.log(check_words(words))

//ყველაზე მეტი რიცხვი
let arr_of_nums = [4, 5, 6, 5, 4, 5]
function count_nums(arr_of_nums){
    let current_count = 1
    let max_count = 0
    let sorted_arr = arr_of_nums.sort((a,b) => a - b)
    let most_frequent = sorted_arr[0]
    for(let i = 0;i < sorted_arr.length;i++){
        if(sorted_arr[i] === sorted_arr[i + 1]){
            current_count++

        }else{
            if(current_count > max_count){
                max_count = current_count
                most_frequent = sorted_arr[i]
            }
            current_count = 1
        }
    }
    return most_frequent
}
console.log(count_nums(arr_of_nums))