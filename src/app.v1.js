const express =  require('express')
const path = require('path')


console.log(__dirname)
console.log(__filename)

const publicFolder = path.join(__dirname,"../public")
console.log(publicFolder)

const app = express()

app.set('view engine','hbs')
// uses /view folder in node app root
app.use(express.static(publicFolder))

app.get('', (req,res) => {
    res.render('index',{
        title: 'Weather app',
        author: "myself"
    })
})

app.get('/about', (req,res) => {
    res.render('about',{
        title: 'Weather app',
        author: "myself"
    })
})

app.get('/help', (req,res) => {
    res.render('help',{
        title: 'Weather app',
        author: "myself"
    })
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