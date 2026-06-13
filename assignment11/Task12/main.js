const fs = require('fs/promises')
const path = require('path')
const totalResult = {
    words: 0,
    vowels: 0
}

async function check(filePath){
    const dirs = await fs.readdir(filePath)
    for( let dir of dirs){
        const fullDirPath = path.join(filePath, dir)
        const stat = await fs.stat(fullDirPath)
        if(stat.isDirectory()){
            await check(fullDirPath)
        }
        const ext = path.extname(fullDirPath)
        if(ext === '.txt'){
            const fileWords = await count_words(fullDirPath)
            const fileVowels = await count_vowels(fullDirPath)

            totalResult.words += fileWords
            totalResult.vowels += fileVowels
        }
    }
}

async function count_words(fdp){
    const data = await fs.readFile(fdp , "utf-8")
    const words = data.split(" ").length
    return words
    
}
async function count_vowels(fdp){
    const data = await fs.readFile(fdp,"utf-8")
    const vowels = "aeiou"
    let vowels_count = 0
    for(let char of data){
        if(vowels.includes(char.toLowerCase())){
            vowels_count++
        }
    }
    return vowels_count
}

check(__dirname)