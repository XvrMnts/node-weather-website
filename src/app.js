const express =  require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

console.log(__dirname)
console.log(__filename)

const publicFolder = path.join(__dirname,"../public")
console.log(publicFolder)

const viewsFolder = path.join(__dirname,"../templates/views")
const partialsFolder = path.join(__dirname,"../templates/partials")

const app = express()

app.set('view engine','hbs')
app.set('views',viewsFolder)
hbs.registerPartials(partialsFolder)

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


app.get('/help/*', (req,res) => {
    res.send("help article ont found")
})

app.get('/weather', (req,res) => {
    const location = req.query.address
    if(!location) {
        return res.send("<H1>Please provide location in address term</H1>")
    }

    geocode(location,(error,{latitude,longitude,location} = {}) => {
        if (error) {
            return res.send({error: error})
        }
        
        forecast(latitude, longitude, (error, forecastData) => {
        if (error) {
            return res.send({error: error})
        }
            return res.send({
                query: req.query.address,
                location: location,
                forecastData: forecastData
            }) 
        })
    })
})

app.get('/products', (req,res) => {
    if(!req.query.search) {
        return res.send("Please provide search term")
    }
    res.send({
        peoducts: []
    })
})


app.get('*', (req,res) => {
    res.render('404',{
        title: '404',
        author: "myself",
        errorMessage: "error!"
    })
})



const port = 3000
app.listen(port, () => {
    console.log('Server up in port: ',port)
})