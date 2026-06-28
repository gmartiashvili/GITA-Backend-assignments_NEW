//1
class Todo{
    constructor(id,title,isDone,createdAt){
        this.id = id
        this.title = title
        this.isDone = isDone
        this.createdAt = createdAt
    }
}

class TodoList{
    constructor(){
        this.todos = []
    }
    addTodo(id,title){
        const newTodo = new Todo(id, title)
        this.todos.push(newTodo)
    }
    removeTodo(id){
        this.todos = this.todos.filter(todo => todo.id !== id)
    }
    checkActiveTodo(id,filter){
        const todo = this.todos.find(todo => todo.id === id)
        if(todo){
            todo.isDone = true
            console.log(`Todo ID: ${id} მონიშნულია როგორც შესრულებული.`)
        }else{
            console.log(`Todo ID: ${id} ვერ მოიძებნა.`)
        }
        if (filter === "active") {
        return this.todos.filter(item => item.isDone === false)
        }
        if (filter === "done") {
            return this.todos.filter(item => item.isDone === true)
        }
        return this.todos
    }
    getAlltodos(filterObj){
        if (!filterObj) {
            return this.todos
        }
        if(filterObj.active === true){
            return this.todos.filter(todo => todo.isDone === false)
        }
        if(filterObj.active === false){
            return this.todos.filter(todo => todo.isDone === true)
        }
    }
    
    


}
//2
class ShoppingCart{
    constructor(){
        this.items = []
    }
    addToCart(product){
        const exists = this.items.find(item => item.id === product.id)
        if(!exists){
            this.items.push(product)
        }
    }
    removeFromCart(productId){
        const exists = this.items.find(item => item.id === productId)
        if(exists){
            this.items = this.items.filter(item => item.id !== productId)
        }
    }
    calculateTotalPrice(){
        return this.items.reduce((tot,curr) => tot + (curr.price * curr.quantity),0)
        
    }
    updateItem(productId, newQuantity){
        const item = this.items.find(item => item.id === productId)
        if(item){
            item.quantity = newQuantity
        }
    }
}
//3
class Library{
    constuctor(){
        this.books = []
    }
    addBook(book){
        const exists = this.books.find(item => item.id === book)
        if(!exists){
            this.books.push(book)
        }
    }
    removeBook(book){
        const exists = this.books.find(item => item.id === book)
        if(exists){
            this.books = this.books.filter(item => item.id !== book)
        }

    }
    listBooks(sortBy){
        if(sortBy === 'year'){
            return [...this.books].sort ((a,b) => a.year - b.year)
        }
        return this.books
    }
}
//4
class ContactManager{
    constructor(){
        this.contacts = []
    }
    addNewContact(name,phone,email){
        const phoneExist = this.contacts.find(c => c.phone === phone)
        const emailExist = this.contacts.find(c => c.email === email)
        if(phoneExist || emailExist){
            return console.log("დუპლიკატი")
        }
        const obj = {}
        obj.name = name
        obj.phone = phone
        obj.email = email
        this.contacts.push(obj)
    }
    vievContacts(){
        return this.contacts
    }
    UpdatePhone(email,newPhone){
        const contact = this.contacts.find(c => c.email === email)
        if(contact){
            contact.phone = newPhone

        }else{
            console.log("კონტაქტი არ არსებობს")
        }
    }
}