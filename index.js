const express = require('express');
const app = express();
require('dotenv').config();
const {connectDB} = require('./utils/db');

const friendsRoute = require('./routes/friends');
const { mailScheduler } = require('./utils/dailymailer');

app.use(express.json());

connectDB()
   .then(res => console.log(res))
   .catch(err => console.error(err));

app.use('/friends', friendsRoute);

app.listen(5000, ()=>{
   console.log('Listening on 5000');
});

mailScheduler();