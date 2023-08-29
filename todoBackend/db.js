const mongoose = require('mongoose');
require('dotenv').config();
const MONGO_URL = process.env.MONGO;

mongoose.connect(MONGO_URL,{
    dbName:'Todo'
})
.then(() => {
    console.log('connected to database');
})
.catch(()=>{
    console.log('cannot connect to db'+ err);
});