//1
const fs = require('fs/promises')

async function info(){
    const resp = await fetch("https://jsonplaceholder.typicode.com/users")
    const data = await resp.json()
    const arr = []
    
    data.forEach(elem => {
        const obj = {}
        obj.id = elem.id
        obj.name = elem.name
        obj.username = elem.username
        obj.email = elem.email
        arr.push(obj)
    })
    await fs.writeFile("users.json",JSON.stringify(arr))
}
info()


//4
async function count(){
    try{
        const data = await fs.readFile("random.txt","utf-8")
        const words_count = data.split(" ").length
        const chars_count = data.split(" ").join("").split("").length
        const vowels = "aeiou"
        let vowels_count = 0
        for(let char of data){
            if(vowels.includes(char.toLowerCase())){
                vowels_count++
            }
        }
        const result = {
                word: words_count,
                vowel: vowels_count,
                chars: chars_count
            }
        await fs.writeFile("result.json",JSON.stringify(result))
    }catch(e){
        console.log("მოხდა შეცდომა (შეამოწმე, არსებობს თუ არა random.txt)")
    }
    
}

