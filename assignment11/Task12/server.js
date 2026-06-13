const http = require("http")
const fs = require("fs/promises")
const url = require('url')

const server = http.createServer(async (req,res) => {
    const parsedUrl = url.parse(req.url,true)
    if(req.method === "GET" && parsedUrl.pathname === '/about'){
        res.writeHead(200,{'content-type':'application/json'})
        const myInfo = {
            name: "Nika",
            hobby: "Coding"
        }
        return res.end(JSON.stringify(myInfo))
    }
    if(req.method === "GET" && parsedUrl.pathname === '/players'){
        if (!parsedUrl.query.nation) {
            res.writeHead(200, { 'content-type': 'application/json' })
            return res.end(await read_players())
        }
        const allPlayers = JSON.parse(await read_players())
        const filteredPlayers = allPlayers.filter(p => p.nation.toLowerCase() === parsedUrl.query.nation.toLowerCase())
        return res.end(JSON.stringify(filteredPlayers))
    }
    if(req.method === "POST" && parsedUrl.pathname === "/players"){
        let body = ""
        req.on('data',(chunk) => {body += chunk})
        req.on('end', async () => {
            const parsedBody = JSON.parse(body)
            const data = JSON.parse(await read_players())
            const lastId = Number(data[data.length - 1]?.id||0)
            const newUser = {
                id: String(lastId + 1),
                name: parsedBody.name,
                nation: parsedBody.nation
            }
            data.push(newUser)
            await fs.writeFile('players.json', JSON.stringify(data))
            res.writeHead(201, {"content-type": 'application/json'})
            return res.end(JSON.stringify({message: "user creted successfully"}))

        })
    }
    if(req.method === "DELETE" && parsedUrl.pathname.startsWith('/players')){
        const userId = parsedUrl.pathname.split('/')[2]
        read_players()
                    .then((fileContent) =>{
                        const data = JSON.parse(fileContent)
                        const updatedData = data.filter(p => p.id !== userId)
                        fs.writeFile('players.json', JSON.stringify(updatedData)).then(() => {
                            res.writeHead(200, { "content-type": 'application/json' })
                            return res.end(JSON.stringify({ message: "player deleted successfully" }))
                        })
                    })
    }
})

server.listen(4000, () => {
    console.log('server running on port http://localhost:4000')
})

async function read_players(){
    const data = await fs.readFile("players.json","utf-8")
    return data

}