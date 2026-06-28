import express from 'express';
import { readFile, writeFile } from './utils/utils.js';
const app = express()
const port = 3000
app.use(express.json())
app.get('/expenses', async (req, res) => {
    try{
        let expenses = await readFile('expense.json', true) || []
        if (!expenses || expenses.length === 0) {
                return res.status(200).json([])
        }
        
        if (req.query.category) {
            expenses = expenses.filter(exp => exp.category === req.query.category.toLowerCase())
        }
        
        if (req.query.asc) {
            expenses.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
        } else if (req.query.desc) {
            expenses.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        }
        let page =  Number(req.query.page) || 1
        let take = Number(req.query.take) || 30
        if (take > 50) take = 50
        const startIndex = (page - 1) * take
        const endIndex = page * take
        const paginatedExpenses = expenses.slice(startIndex,endIndex)
        res.status(200).json(paginatedExpenses)
    }catch(e){
        console.log("აქ არის ერორი:", e)
        res.status(500).json({ e: "სერვერის შეცდომა მონაცემების დამუშავებისას" })
    }
})
app.post('/expenses',async (req,res) => {
    try{
        const { category, price } = req.body
        const expenses  = await readFile('expense.json', true)|| []
        const priceNum = Number(price)
        if (priceNum < 10) {
            return res.status(400).json({ error: "Price must be a number and at least 10!" })
        }
        const newExpense = {
            id:expenses.length > 0 ? expenses[expenses.length - 1].id + 1 : 1,
            category: category,
            price: priceNum,
            createdAt: new Date().toISOString()
        }
        expenses.push(newExpense)
        await writeFile("expense.json", expenses)
        res.status(201).json(newExpense)
    }catch(e){
        res.status(500).json({ e: "სერვერზე ფაილის ჩაწერისას მოხდა შეცდომა" })
    }

})
app.put('/expenses/:id', async(req,res) => {
    try{
        const { category, price } = req.body
        const expenseId = Number(req.params.id)
        const expenses = await readFile('expense.json', true)
        const index = expenses.findIndex(exp => exp.id === expenseId)
        if (index === -1) {
            return res.status(404).json({ error: 'Wrong id provided' })
        }
        if (price !== undefined) {
            const priceNum = Number(price)
            if (priceNum < 10) {
                return res.status(400).json({ error: 'Error: Price must be at least 10' })
            }
            expenses[index].price = priceNum
        }
        if (category) {
            expenses[index].category = category.toLowerCase()
        }
        await writeFile('expense.json', expenses)
        
        res.status(200).json({ 
            message: 'Expense updated successfully', 
            updatedExpense: expenses[index] 
        });
    }catch(e){
        res.status(500).json({ e: 'სერვერის შეცდომა განახლებისას' })
    }
})

app.delete('/expenses/:id', async (req, res) => {
    try{
        const secretHeader = req.headers['secret']
        if(secretHeader !== 'random123'){
            return res.status(403).json({ error: "წვდომა უარყოფილია! არასწორი საიდუმლო კოდი." })
        }
        const expenses = await readFile('expense.json', true) || []
        const expenseId = Number(req.params.id)
        const index = expenses.findIndex(exp => exp.id === expenseId)
        if (index === -1) {
            return res.status(404).json({ error: "ხარჯი ამ ID-ით ვერ მოიძებნა!" })
        }
        const deletedExpense = expenses[index]
        expenses.splice(index, 1)
        await writeFile('expense.json', expenses)
    
        res.status(200).json({ message: "წარმატებით წაიშალა", deletedExpense: deletedExpense})

    }catch{
        res.status(500).json({ error: "სერვერზე ფაილის წაშლისას მოხდა შეცდომა" })
    }
})
app.listen(port, () => {
console.log(`Example app listening on port ${port}`)
})