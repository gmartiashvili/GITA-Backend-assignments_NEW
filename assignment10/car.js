const fs = require('fs/promises')
const [,,operation,carName, carColor, carReleaseDate] = process.argv

const arg2 = process.argv[2]
const arg3 = process.argv[3]
const arg4 = process.argv[4]
async function car_list(){
    let cars = []
    try {
        const data = await fs.readFile("cars.json", "utf-8")
        cars = JSON.parse(data)
    } catch (e) {
    }
    if(arg2 === "show"){
        const filter_value = arg3
        if(!filter_value){
            console.log("გთხოვთ მიუთითოთ წელი ან ფერი ფილტრაციისთვის!")
            return
        }
        const filteredCars = cars.filter(car => car.carReleaseDate === filter_value || car.carColor === filter_value)
        if(filteredCars.length === 0){
            console.log(`მანქანები კრიტერიუმით '${filter_value}' ვერ მოიძებნა.`)
        }else{
            console.table(filteredCars)
        }


    }else{
        const carName = arg2
        const carReleaseDate = arg3
        const carColor = arg4
        if (!carName || !carReleaseDate || !carColor) {
            console.log("არასწორი ფორმატი!")
            return
        }
        const newCar = {
            carName: carName,
            carReleaseDate: carReleaseDate,
            carColor: carColor
        }
        cars.push(newCar)
        await fs.writeFile("cars.json", JSON.stringify(cars))

    }
}
car_list()  