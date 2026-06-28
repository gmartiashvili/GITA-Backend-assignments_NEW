// 1)
// function debounce(callback, ms){
//     let timer
//     return (...args) => {
//         clearTimeout(timer)
//         timer = setTimeout(() => {
//             callback(...args)
//         }, ms)
//     }
// }
// window.addEventListener('mousemove',debounce((e) => {
//     console.log(e.clientX, e.clientY)
// }, 300))
// 2)
const quoteBtn = document.getElementById('quote-btn');
const quoteText = document.getElementById('quote-text');
 quoteBtn.addEventListener('click', async () => {
    try{
        const resp = await fetch("https://dummyjson.com/quotes")
        const data = await resp.json()
        const randomIndex = Math.floor(Math.random() * data.quotes.length)
        const first = data.quotes[randomIndex].quote
        quoteText.textContent = first
    }
    catch(e){
        quoteText.textContent = "ინტერნეტის ან API-ს შეცდომა!"
        console.error(e)
    }

 })
