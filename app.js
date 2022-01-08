require('./config/mongoose');
const express = require('express');
const app = express();
const logger = require('morgan');
const routerMongo = require('./app/mongodb/routes');
const routerMongoose = require('./app/mongoose/routes');
const cors = require('cors');

app.use(logger("dev"));
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use('/v2', cors(), routerMongoose);
app.use('/v1', cors(), routerMongo);
app.use('/test',(req,res) =>{
    res.send('Test')
});
app.use((req,res) => {
    res.status(404)
    res.send({
        status:'Failed',
        message: 'Resource' + req.originalUrl + ' Not Found'
    });
});

// app.listen(3009, () => console.log('Server : http://localhost:3009'));
app.listen(process.env.PORT || 3009, () => console.log('Server: https://rofi-backendmongo.herokuapp.com:3009'))
