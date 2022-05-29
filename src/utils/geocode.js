const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiYW1pcmxpZiIsImEiOiJjbDFkd2RqeTYwbHJvM2NwMmtpcXNubXh1In0.iw4oOrXka9cU5X0h74mh0Q'

    request({ url: url, json: true}, (error,response) => {
        if (error) {
            callback('Unable to connect')
        } else if (response.body.features.length === 0) {
            callback('Unable to find this location')
        } else {
            callback(undefined, {
                latitude: response.body.features[0].center[1],
                longitude: response.body.features[0].center[0],
                location: response.body.features[0].place_name
            })
        }
    
    })
}

module.exports = geocode