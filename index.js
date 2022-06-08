const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, './.env') });

const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const mongoString = process.env.DATABASE_URL;

mongoose.connect(mongoString);
const database = mongoose.connection;

const port = 3000;
const app = express();

database.on('error', (error) => {
    console.log(error)
})

database.once('connected', () => {
    console.log('Database Connected');
})

app.use(express.json());
app.use(cors());

const routes = require('./routes/routes');

app.use('/api', routes);


app.listen(port,(req,res)=>{
    console.log(`App started on ${port}`);
});

