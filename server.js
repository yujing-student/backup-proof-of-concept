
// Importeer het npm pakket express uit de node_modules map
// import express from 'express'
// import path from 'path'
 async function fetchJson(url, payload = {}) {
	try{//de reden voor een try and catch is zotat er een betere error adhandeling is en dat ik de error in de console log kan zien
		//en de then als die niet reageert dan gaat die automatisch naar de catch
		return await fetch(url, payload)
			.then((response) => response.json())//reageeer op de aanroep en pas de informatie aan aar een json

	}catch (error){
		console.error('Error:', error);
	}

}
const path = require('path')
const express = require('express')
// Import the path module for dirname function
// Importeer de zelfgemaakte functie fetchJson uit de/helpers map

const app = express()

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, '../views'))
// Gebruik de map 'public' voor statische resources, zoals stylesheets, afbeeldingen en client-side JavaScript
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({extended: true}));//deze regel code gebruiken vanwege middelware zodat de data leesbaar gemaakt word



app.get('/', (request, response) => {
    fetchJson('https://api.mobile.bnr.nl/v1/articles')
        .then(articles => {
            const firstTenArticles = articles.slice(0, 10)
            response.render('index', {
                firstTenArticles, audioUrl,
            });
        })
})


app.set('port', process.env.PORT || 8004)
// Start express op, haal daarbij het zojuist ingestelde poortnummer op
app.listen(app.get('port'), function () {
    // Toon een bericht in de console en geef het poortnummer door
    console.log(`Application started on http://localhost:${app.get('port')}`)
})
module.exports = app

