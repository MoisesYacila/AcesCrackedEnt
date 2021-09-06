const mongoose = require('mongoose');

//To shorten code
const Schema = mongoose.Schema;

//We can create an image schema to use only within the Campground Schema
//Store the url of the image to display it and the filename in case we want to delete the image
const ImageSchema = new Schema({
    url: String,
    filename: String
})

//Structure of the DB objects; Schema
const VenueSchema = new Schema({
    name: String,
    address: String,
    city: String,
    state: String,
    description: String,
    url: String
    //ADD USER
})

//Create Mongoose Model with our schema and export it
const Venue = mongoose.model('Venue', VenueSchema);
module.exports = Venue;