const request = require('request')

const forecast = (latitude,longitude,callback) => {

    const url = "https://api.darksky.net/forecast/6e2099c6bd02e6370e07232abef81a00/"+latitude+","+longitude+"?units=si&lang=ca"

    request({url, json: true}, (error,{body}) => {
        if (error) {
            callback('Cannot connect',undefined)
        } else if (body.error) {
            callback('Unable to find location',undefined)
        } else {
            const temperature = body.currently.temperature
            const precipProbability = body.currently.precipProbability
            callback(undefined, body.daily.data[0].summary+" Temperatura ara: "+temperature+". Temperatura maxima d'avui: " + body.daily.data[0].temperatureHigh+" i la minima: "+ body.daily.data[0].temperatureLow+"% de probabilitat de pluja: "+precipProbability)
        }
    })

}

module.exports = forecast