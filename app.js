//Require dependencies and call express
const express = require('express');
const path = require('path');
const app = express();

//Set up our views folder for templates, and public directory to serve static files.
//Thanks to our path.join we can run the file from anywhere in the computer
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')))

//We need to include this middleware to get req.body from POST requests
app.use(express.urlencoded({ extended: true }));

//SSet up template engine as EJS
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('home')
})

app.get('/venues', (req, res) => {
    res.render('venues')
})

app.get('/leaderboard', (req, res) => {
    res.render('leaderboard')
})

app.get('/schedule', (req, res) => {
    res.render('schedule')
})

app.get('/information', (req, res) => {
    res.render('information')
})

app.get('/social', (req, res) => {
    res.render('social')
})


app.get('/legends', (req, res) => {
    res.render('legends')
})

app.listen(3000, () => {
    console.log("Listening on port 3000");
})