// Importeerd npm pakket express uit de node_modules map
import express from 'express'
// Importeerd de zelfgemaakte functie fetchJson uit de ./helpers map
import fetchJson from './helpers/fetch-json.js'

const app = express()

const audioUrl = 'http://25683.live.streamtheworld.com/BNR_BUSINESS_BEATS.mp3';
// Stel ejs in als template engine
app.set('view engine', 'ejs')
// Stel de map met ejs templates in
app.set('views', './views')

// Gebruik de map 'public' voor statische resources
app.use(express.static('public'))

// Zorg dat werken met request data makkelijker wordt
app.use(express.urlencoded({extended: true}))
// Stel het poortnummer in waar express op moet gaan luisteren
app.set('port', process.env.PORT || 8004)

// Start express op, haal daarbij het zojuist ingestelde poortnummer op
app.listen(app.get('port'), function () {
    // Toon een bericht in de console en geef het poortnummer door
    console.log(`Application started on http://localhost:${app.get('port')}`)
})


app.get('/', (request, response) => {
    fetchJson('https://api.mobile.bnr.nl/v1/articles')
        .then(articles => {
            const firstTenArticles = articles.slice(0, 10)
            response.render('index', {
                firstTenArticles, audioUrl,
            });
        })
})



