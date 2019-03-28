const express = require('express');
const app = express();
//bcrypt: encriptar contraseñas
const bcrypt = require('bcrypt');
//esquema usuario
const Usuario = require('../models/usuario');
//underscore: amplia funcionalidades de javascript
const _ = require('underscore');

app.get('/usuario', (req, res) => {

    let desde = req.query.desde || 0;
    desde = Number(desde);

    let limite = req.query.limite || 3;
    limite = Number(limite);

    Usuario.find({ estado: true }, 'nombre email')
        .skip(desde)
        .limit(limite)
        .exec((err, usuarios) => {

            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }

            //en el primer parámetro podemos poner condiciones, por ejemplo= {google:false}
            Usuario.count({ estado: true }, (err, totalReg) => {
                res.json({
                    ok: true,
                    usuarios,
                    totalReg
                });
            });

        });
});

app.post('/usuario', (req, res) => {

    let body = req.body;

    //creamos instancia del esquema Usuario
    let usuario = new Usuario({
        nombre: body.nombre,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10), //aplicamos el hash 10 veces
        role: body.role
    });

    usuario.save((err, usuarioDB) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            usuario: usuarioDB
        });

    });
});

app.put('/usuario/:id', (req, res) => {

    let iD = req.params.id;
    let body = _.pick(req.body, ['nombre', 'email', 'img', 'role', 'estado']);
    let opciones = {
        new: true,
        runValidators: true
    };

    Usuario.findByIdAndUpdate(iD, body, opciones, (err, usuarioDB) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            usuario: usuarioDB
        });

    });

});

app.delete('/usuario/:id', (req, res) => {

    let iD = req.params.id;
    let opciones = {
        new: true
    };

    // Usuario.findByIdAndRemove(iD, (err, usuarioBorrado) => {
    Usuario.findByIdAndUpdate(iD, { estado: false }, opciones, (err, usuarioBorrado) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        if (!usuarioBorrado) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Usuario no encontrado'
                }
            });
        }

        res.json({
            ok: true,
            usuarioBorrado
        });

    });

});


module.exports = app;