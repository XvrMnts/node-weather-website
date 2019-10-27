const request = require('request')

const geocode = (address,callback) => {
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + address + ".json?access_token=pk.eyJ1Ijoic3BhbW1lIiwiYSI6ImNrMjJjMWJyejA2emczZHBkejVvd2N3MHkifQ.uIjD4nLR_p2tWLUR1WHaHg&limit=1"

    request({url, json: true}, (error,{body}) => {
    
        if (error) {
            callback('Cannot connect', undefined)
        } else if (body.features.length === 0 ) {
            callback('Unable to find location', undefined)
        } else {
            const latitude = body.features[0].center[0]
            const longitude = body.features[0].center[1]

            callback(undefined, {
                latitude ,
                longitude,
                location: body.features[0].place_name
             } )
        }
    
    })
}

module.exports = geocode