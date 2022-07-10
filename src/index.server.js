const express = require('express');
const env = require('dotenv');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose')

//Routes
const userRoutes = require('./routes/user')

//environment variable or you can say constants
env.config();

//mongoDB connection
//mongodb+srv://manhbinh3012:<password>@cluster0.dizcum5.mongodb.net/?retryWrites=true&w=majority
mongoose.connect(`mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@cluster0.dizcum5.mongodb.net/${process.env.MONGO_DB_DATABASE}?retryWrites=true&w=majority`)
        .then(() => {
            console.log('Database connected!!')
        });


app.use(bodyParser.json());
app.use('/api', userRoutes)

app.listen(process.env.PORT, () =>{
    console.log(`Server is running on port ${process.env.PORT}`);
});






