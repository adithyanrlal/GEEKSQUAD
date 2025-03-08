

const dotenv = require('dotenv');

dotenv.config();  // to use environment variables
const express = require('express')
const cors = require('cors');

const connectToDb = require('./db/db')
const app = express()


const userRoutes = require('./routes/user.routes');
const producerRoutes = require('./routes/producer.routes');


connectToDb();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true}));


app.use('/users' , userRoutes);
app.use('/producers' , producerRoutes);

app.get('/' , (req , res) => {
    res.send("hello world")
});


module.exports = app;