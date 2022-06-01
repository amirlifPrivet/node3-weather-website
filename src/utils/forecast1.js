const request = require('request')

const forecast = (longitude,latitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=fd5eaabb0d007ef6e3a484d764c49b9c&query=' + encodeURIComponent(latitude) + ',' + encodeURIComponent(longitude)

    request({ url: url, json: true}, (error,response) => {
        if (error) {
            callback('Unable to connect')
        } else if (response.body.current.weather_descriptions.length === 0) {
            callback('Unable to find this location')
        } else {
            // console.log(body.daily.data[0])
            callback(undefined,response.body.current.weather_descriptions[0]
            )
        }
    
    })
}

module.exports = forecast