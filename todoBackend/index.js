const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
require('dotenv').config();
const PORT = process.env.PORT || 8000;
const todoRoutes = require('./ROUTES/TodoRoutes')

require('./db');

app.use(cors());
app.use(bodyParser.json());
app.use('/todoroutes',todoRoutes) // to use the made routes first you export that route
//then you import it ass imported above using require keyword and then we use it by app.use module
// '/todoroutes' is mentioned in the url and then the keyword for the api that we have written in route like /todoroutes/testapi

app.get('/',(req,res)=>{
    res.json({message:"API is working"})
})

app.listen(PORT,()=>{
    console.log(`server is running on ${PORT}`);
})