const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
let dotenv = require("dotenv");
let cors = require("cors")

dotenv.config();

const app = express();
console.log(process.env.MONGODB_HOST)
// connection to Mongo db
mongoose.connect(process.env.MONGODB_HOST)
    .then(db => console.log('db connected'))
    .catch(err => console.log(err));

// importing routes
const indexRoutes = require('./routes/routeindex');


// settings
app.set('port', process.env.PORT || 4000);


// middlewares
app.use(express.json())
app.use(morgan('dev'));
app.use(cors())
app.use(express.urlencoded({extended:false}));


// routes
app.use('/', indexRoutes);


app.listen(app.get('port'), () =>{
    console.log(`server on port ${app.get('port')}`);
})


