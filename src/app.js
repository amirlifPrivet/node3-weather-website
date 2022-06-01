const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

// Define Paths for Express
const publicDirPath = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')


// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirPath))


app.get('/', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Amir Lif'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Amir Lif'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Get help',
        name: 'Amir Lif',
        helpMessage: 'The answer is: 42'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address!'
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error })
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
})

app.get('/products', (req, res) => {
    if(!req.query.search)
        {
           return res.send({
                Error: 'Error - No such item'
            }) // END - res.send
    } // END - if

    res.send({
        products: [1,2]
    }) // END - res.send
}) // END - app.get

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 'Get help - 404',
        name: 'Amir Lif',
        message404: 'Cannot find this help page'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: 'Sorry: Error 404',
        name: 'Amir Lif',
        message404: 'Cannot find this page at all'
    })
})


app.listen(port, () => {
    console.log('Server is up on port: ' + port)
})

