let full_name = "giorgi martiashvili"
function get_abbr(fn){
    arr = fn.split(" ")
    let saxeli = arr[0]
    let gvari = arr[1]
    let abbr = `${saxeli[0].toUpperCase()}.${gvari[0].toUpperCase()}`
    return abbr
}
console.log(get_abbr(full_name))

let num = 123
function get_sum_of_digit(n){
    let sum = 0
    n = String(n)
    for(let i = 0; i < n.length; i++){
        sum += Number(n[i])
    }
    return sum

}
console.log(get_sum_of_digit(num))

let sityva ="banana"
function remove_dublicates(s){
    let clear_word = ""
    for(let i = 0;i < s.length;i++){
        if(clear_word.includes(s[i]) !== true){
            clear_word += s[i]
        }
    }   
    return clear_word
}
console.log(remove_dublicates(sityva))


let str_with_spaces = "1 2 aab:"
function remove_spaces(str){
    let new_str = ""
    arr = str.split(" ")
    for(let i = 0; i < arr.length;i++){
        new_str += arr[i]
    }
    return new_str
}
console.log(remove_spaces(str_with_spaces))

let winadadeba = "Hello World"
function reverse_each_word(w){
    let words = w.split(" ")
    let final = ""
    for(let i = 0; i < words.length; i++){
        let current_word = words[i]
        let reverse_word = ""
        for(let j = current_word.length - 1;j >= 0;j--){
            reverse_word += current_word[j];
        }
        final += reverse_word
        if(i === words.length - 1){
            final += ""
        }
        else{
            final += " "
        }

    }
    return final
}
console.log(reverse_each_word(winadadeba))