#!/usr/bin/env node
import { readFile, writeFile } from './utils/utils.js';
import { Command } from 'commander'
import fs from 'fs/promises'

const program = new Command()

program
    .name('expense-cli')
    .description('This is simple cli usage')
    .version('1.0.1')

program
    .command('Create')
    .description("This command  creates expence ")
    .argument('<category>', 'expense category field (e.g., shopping, food)')
    .argument('<price>', 'expense price field (must be a number)')
    .action(async (category, price) => {
        const expenses  = await readFile('expense.json', true)
        const priceNum = Number(price)
        if (priceNum < 10) {
            console.log("Error: Price must be at least 10!")
            return
        }
        const newExpense = {
            id:expenses.length > 0 ? expenses[expenses.length - 1].id + 1 : 1,
            category: category,
            price: priceNum,
            createdAt: new Date().toISOString()
        }
        expenses.push(newExpense)
        await writeFile("expense.json", expenses)
        console.log(`Expense with category "${category}" added successfully!`) 
    })

program
    .command("show")
    .description("this command shows all expenses")
    .option('--asc', 'Sort by date ascending')
    .option('--desc', 'Sort by date descending')
    .option('-c, --category <category>', 'Filter by category name')
    .option('--page <page>', 'Page number', '1')
    .option('--limit <limit>', 'Items per page', '5')
    .action(async (opts) => {
        let expenses = await readFile('expense.json', true)
        
        if (!expenses || expenses.length === 0) {
            console.log("No expenses found.")
            return
        }
        
        if (opts.category) {
            expenses = expenses.filter(exp => exp.category === opts.category.toLowerCase())
        }
        
        if (opts.asc) {
            expenses.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
        } else if (opts.desc) {
            expenses.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        }
        
        const page = Number(opts.page)
        const limit = Number(opts.limit)
        const startIndex = (page - 1) * limit
        const endIndex = page * limit
        
        const paginatedExpenses = expenses.slice(startIndex, endIndex)
        console.log(`--- Page ${page} (Showing ${paginatedExpenses.length} of ${expenses.length} items) ---`)
        console.log(paginatedExpenses)
    })
program
    .command('update')
    .description('this command updates an expense property')
    .argument('<id>', 'unique id of expense')
    .option('-c, --category <category>', 'category property')
    .option('-p, --price <price>', 'price property')
    .action(async (id, opts) => {
        const expenses = await readFile('expense.json', true)
        const index = expenses.findIndex(exp => exp.id === Number(id))
        if (index === -1) {
            console.log('Wrong id provided')
            return
        }
        if (opts.price !== undefined) {
            const priceNum = Number(opts.price)
            if (priceNum < 10) {
                console.log('Error: Price must be at least 10')
                return
            }
            expenses[index].price = priceNum
        }
        if (opts.category) {
            expenses[index].category = opts.category.toLowerCase()
        }
        await writeFile('expense.json', expenses)
        
        console.log('Expense updated successfully:', expenses[index])


    })

program
    .command("delete")
    .description("this command deletes expenses by ID")
    .argument('<id>', 'unique id of expense')
    .action(async (id) => {
        const expenses = await readFile('expense.json', true)
        const index = expenses.findIndex(exp => exp.id === Number(id))
        if (index === -1) {
        console.log('Wrong id provided')
        return
        }
        const deletedExpense = expenses[index]
        expenses.splice(index, 1)
        await writeFile('expense.json', expenses)
    
        console.log('Expense deleted successfully:', deletedExpense)
    })
program
    .command('search')
    .description('this command searchs expenses by specific date')
    .argument('<date>', 'date string in YYYY-MM-DD format')
    .action(async (dateStr) => {
        const expenses = await readFile('expense.json', true)
        const filtered = expenses.filter(exp => exp.createdAt.startsWith(dateStr))
        if (filtered.length === 0) {
            console.log(`No expenses found for date: ${dateStr}`)
            return
        }
        
        console.log(`Expenses found for ${dateStr}:`, filtered)
    })
program.parse()