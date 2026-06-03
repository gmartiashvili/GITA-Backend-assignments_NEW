
//1)
async function fail_data(){
    for(let i = 0; i <= 5;i++){
        try{
            const resp = await fetch("https://jsonplaceholde.typicode.com")
            const data = await resp.json()
            return data
        } 
        catch(e){
            console.log(`მცდელობა ${i} დაფეილდა `)
        }

    }
    throw new Error("5-ვე მცდელობა დაფეილდა") //AI ს რჩევა
}
//2)
async function faster(){
    const resolve = await Promise.race([fetch("https://dummyjson.com/users"),fetch("https://jsonplaceholder.typicode.com/users")])
    const data = await resolve.json()
    return data
}
//3
async function more_than_ten(){
    const response  = await fetch("https://dummyjson.com/products")
    const data = await response.json()
    const filtered = data['products'].filter((elem) => elem['price'] > 10)
    return filtered

}
//4
async function developer(){
    const final = {}
    const resp = await fetch('https://dummyjson.com/users')
    const data = await resp.json()
    const filtered = data.users.filter(elem => elem.company['title'] === "Web Developer").map(elem => {return {
        firstName: elem.firstName,
        lastName: elem.lastName,
        email: elem.email,
        phone: elem.phone,
        city: elem.address.city
    } })
    return filtered
}

//5
async function fetch_all(){
    const [resp1, resp2, resp3, resp4] = await Promise.all([fetch('https://dummyjson.com/recipes'),fetch('https://dummyjson.com/comments'),fetch('https://dummyjson.com/todos'),fetch('https://dummyjson.com/quotes')])
    const [data1, data2, data3, data4] = await Promise.all([resp1.json(), resp2.json(), resp3.json(), resp4.json()])
    return {
        recipes: recipes,
        comments: comments,
        todos: todos,
        quotes: quotes
    };
}