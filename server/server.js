//importamos archivo config
require('./config/config');

const port = 3000;

const express = require('express');
const app = express();
const mongoose = require('mongoose');

const bodyParser = require('body-parser');
// parse application/x-www-form-urlencoded
//app.use son middlewares: funciones que se disparan cada vez que el código pasa por estas líneas
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

app.use(require('./routes/usuarios'));

//Definimos la conexión con la BD
mongoose.connect(process.env.urlDB, { useNewUrlParser: true, useCreateIndex: true },
    (err, res) => {

        if (err) throw err;

        console.log('Base de datos ONLINE');

    });

app.listen(process.env.PORT, () => console.log(`Example app listening on port ${process.env.PORT}!`));