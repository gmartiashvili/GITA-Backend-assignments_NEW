#!/usr/bin/env node
import { Command } from 'commander'
import fs from 'fs/promises'

const program = new Command()

program
    .name('weather cli')
    .description('this is cli for weather')
    .version('1.0.1')
program
    .command("weather",{ isDefault: true })
    .argument('<cityName>', "name of the city to check weather for")
    .action(async (cityName) => {
        const resp = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=895284fb2d2c50a520ea537456963d9c`)
        const data = await resp.json()
        if (data.cod === "404" || data.cod === 404) {
            return console.log(`შეცდომა: ქალაქი "${cityName}" ვერ მოიძებნა!`)
        }
        return console.log(data)
    })
    program.parse()