require('./config/config');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: false}))

// parse application json
app.use(bodyParser.json())


app.use('/', function (req, res) {
    res.json('hola')
})

app.listen(process.env.PORT, () => {
    console.log('Escuchando el puerto, ', process.env.PORT)
})

