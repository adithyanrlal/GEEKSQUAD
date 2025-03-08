


const dotenv = require('dotenv');
dotenv.config();  // to use environment variables
const express = require('express')


const connectToDb = require('./db/db')
const app = express()

const userRoutes = require('./routes/user.routes');



connectToDb();


app.use(express.json());
app.use(express.urlencoded({ extended: true}));


app.use('/users' , userRoutes);

app.get('/' , (req , res) => {
    res.send("hello world")
});


module.exports = app;