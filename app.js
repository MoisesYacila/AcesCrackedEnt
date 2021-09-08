//Require dependencies and call express
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const ejsMate = require('ejs-mate');
const methodOverride = require('method-override');
const app = express();

//Require models
const Venue = require('./models/venues');

//Get the url for connecting to Mongo DB
const dbUrl = 'mongodb://localhost:27017/ace';

//Mongoose initializer code
//Mongoose.connect returns a promise, so we can handle it with .then and .catch
mongoose.connect(dbUrl)
    .then(() => {
        console.log("Database connected.")
    })
    .catch(err => {
        console.log("Database connection error.")
        console.log(err)
    })

//Set up our views folder for templates, and public directory to serve static files.
//Thanks to our path.join we can run the file from anywhere in the computer
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')))

//We need to include this middleware to get req.body from POST requests
app.use(express.urlencoded({ extended: true }));

//Set up template engine as EJS, and use ejsMate for the boilerplate
app.set('view engine', 'ejs');
app.engine('ejs', ejsMate);

//Setting our public directory to serve our static files
//Thanks to our path.join we can run the file from anywhere in the computer
app.use(express.static(path.join(__dirname, 'public')));

//This middleware allows us to send any type of HTTP request from a HTML form
app.use(methodOverride('_method'));


app.get('/', (req, res) => {
    res.render('home')
})

app.get('/venues', async (req, res) => {
    //Get all the venues
    const venues = await Venue.find({});

    //Render venues page, and pass the venues from DB
    res.render('venues/index', { venues });
})

//Post route for creating new venues
app.post('/venues', async (req, res) => {
    //Create venue using req.body, and save it to the DB
    //It knows about venue because on the HTML form, we gave the inputs a name of venue
    const venue = new Venue(req.body.venue);
    venue.save();

    //Redirect to venues page
    res.redirect('/venues');
})

//Render new venue form
app.get('/venues/new', (req, res) => {
    res.render('venues/new')
})

//Render edit form ':' indicates that id is a variable
app.get('/venues/:id/edit', async (req, res) => {
    //Get the id from the link and find the venue to load the information on the edit page
    const { id } = req.params;
    const venue = await Venue.findById(id);

    //Pass venue object to EJS
    res.render('venues/edit', { venue });
})

//Edit route ':' indicates that id is a variable
app.put('/venues/:id', async (req, res) => {
    const { id } = req.params;

    //Second argument uses JS Spread syntax, so it will take out whatever is in the object
    //So ...req.body.venue === name: "name", address="address" and so on
    const venue = await Venue.findByIdAndUpdate(id, { ...req.body.venue });

    //After updating, redirect to venues page
    res.redirect('/venues');
})

//Delete route for venues ':' indicates that id is a variable
app.delete('/venues/:id', async (req, res) => {
    //Get id from the URL, and delete from DB
    const { id } = req.params;
    await Venue.findByIdAndDelete(id);

    //Redirect to venues page
    res.redirect('/venues');
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

app.get('/information/partners', (req, res) => {
    res.render('partners')
})

app.get('/information/players', (req, res) => {
    res.render('players')
})

app.get('/information/blinds', (req, res) => {
    res.render('blinds')
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