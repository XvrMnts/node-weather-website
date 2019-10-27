const express =  require('express')
const path = require('path')


console.log(__dirname)
console.log(__filename)

const publicFolder = path.join(__dirname,"../public")
console.log(publicFolder)

const app = express()

app.use(express.static(publicFolder))

app.get('', (req,res) => {
    res.send('Hello express!')
})

app.get('/help', (req,res) => {
    res.send({
        name: 'Andrew',
        age: 27
    })
})

app.get('/about', (req,res) => {
    res.send('<H1>about page</H1>')
})

app.get('/weather', (req,res) => {
    res.send({
        forecast: "raining",
        location: "Terrassa"
    })
})

const port = 3000
app.listen(port, () => {
    console.log('Server up in port: ',port)
})