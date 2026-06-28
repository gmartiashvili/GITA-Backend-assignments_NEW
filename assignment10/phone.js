const fs = require('fs/promises')
const [,,operation,phone,name] = process.argv
async function phone_list(operation,phone,name){
    let list = []
    try{
        const data = await fs.readFile("contacts.json", "utf-8")
        list = JSON.parse(data)

    }catch(e){
    }
    if(operation === "add"){
        const exists = list.find(c => c.phone === phone)
        if(exists){
            console.log("ეს ნომერი უკვე არსებობს და მისი პატრონია:", exists.name)
            return
        }
        else{
            list.push({ name, phone });
            await fs.writeFile("contacts.json",JSON.stringify(list))
        }
    }
    if(operation === "delete"){
        const exists = list.find(c => c.phone === phone)
        if(exists){
            const index = list.findIndex(c => c.phone === phone)
            if(index !== -1){
                list.splice(index,1)
                await fs.writeFile("contacts.json",JSON.stringify(list))
            }
        }else{
            console.log("ეს ნომერი არ არსებობს")
            return
        }
    }

    if(operation === "show"){
        if (list.length === 0) {
            console.log("კონტაქტების სია ცარიელია!")
        }
        else{
            console.table(list)
        }

    }
}
phone_list(operation,phone,name)