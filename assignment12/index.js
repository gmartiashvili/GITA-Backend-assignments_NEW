#!/usr/bin/env node
import { Command } from 'commander'
import fs from 'fs/promises'

const program = new Command()

program
    .name('Test CLI using commander')
    .description('This is simple cli usage')
    .version('1.0.1')


program
    .command("show")
    .description("returns all todo obj")
    .action(async () => {
        const data = await fs.readFile("todo.json","utf-8")
        if (!expenses || expenses.length === 0) {
            console.log("No expenses found.")
            return
        }
    })
program
    .command("add")
    .argument('<name>', "todoName")
    .description("adds a new todo obj")
    .action(async (todoName) => {
        const data = await fs.readFile("todo.json","utf-8")
        const todos = data ? JSON.parse(data) : []
        const newTodo = {
            id: todos.length > 0 ? todos[todos.length - 1].id + 1 : 1,
            title: todoName,
            isDone: false
        }
        todos.push(newTodo)
        await fs.writeFile("todo.json", JSON.stringify(todos))
        console.log(`Todo "${todoName}" წარმატებით დაემატა!`)
        return newTodo
    })
program
    .command("remove")
    .description("remove and show deleted obj")
    .argument("<id>","todoId")
    .action(async (todoId) => {
        const data = await fs.readFile("todo.json","utf-8")
        const todos = data ? JSON.parse(data) : []
        const deletedTodo = todos.find(todo => todo.id === Number(todoId))
        if (!deletedTodo) {
            console.log(`Todo ID: ${todoId} ვერ მოიძებნა.`)
            return
        }
        const filteredTodos = todos.filter(todo => todo.id !== Number(todoId))
        await fs.writeFile("todo.json", JSON.stringify(filteredTodos))
        console.log(`Todo ID: ${todoId} წარმატებით წაიშალა!`)
        return deletedTodo
    })
program
    .command("update")
    .description("updates a todo title using an option and returns it")
    .argument("<id>","todoId")
    .option("-n, --name <todoName>", "new title for the todo")
    .action(async (todoId, opts) => {
        const data = await fs.readFile("todo.json", "utf-8")
        const todos = data ? JSON.parse(data) : []

        const todo = todos.find(item => item.id === Number(todoId))
        if(!todo){
            console.log(`Todo ID: ${todoId} ვერ მოიძებნა`)
            return
        }
        if (opts.name) {
            todo.title = opts.name // ვუცვლით სახელს
        } else {
            console.log("გთხოვთ მიუთითოთ ახალი სახელი: --name <todoName>")
            return
        }
        await fs.writeFile("todo.json", JSON.stringify(todos))
        console.log("თუდუ წარმატებით განახლდა:", todo)
        return todo
    })

program.parse()