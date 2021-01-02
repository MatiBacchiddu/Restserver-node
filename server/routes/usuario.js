const bodyParser = require('body-parser');
const express = require('express');
const bcrypt = require('bcrypt');
const _ = require('underscore');
const Usuario = require('../models/usuario');
const app = express();


app.get('/usuario', function(req, res) {

    // adentro del req.query vienen los parametros opcionales
    let desde = req.query.desde || 0;

    // los parametros opcionales(req.query) aparecen en la url asi: http://localhost:3000/usuario?desde=5
    // y nos pagina desde el número 5
    desde = Number(desde);

    let limite = req.query.limite || 5;
    limite = Number(limite);
                                        // con esto, nos traemos solo los que estan entre las comillas
    Usuario.find({estado: true}, 'nombre email role estado google role img') // el google: true fue una condicion para buscar a los usuarios que tengan el google true
             .skip(desde)
             .limit(limite)
             .exec((err, usuarios) => {

                 if(err) return res.status(400).json({ok: false, err})

                Usuario.count({estado: true}, (err, conteo) => {
 


                    res.json({
                        ok: true,
                        usuarios,
                        cuantos: conteo
                    });
                })

                

             })
    
})


app.post('/usuario', function(req, res) {

    let body = req.body

    let usuario = new Usuario({
        nombre: body.nombre,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10)
    });


    usuario.save((err, usuarioDB) => {

        if(err) return res.status(400).json({ok: false, err})

        

        res.json({
            ok: true,
            usuario: usuarioDB
        });

    }); 

})

app.put('/usuario/:id', function(req, res) {

    let id = req.params.id
    /* let body = _.pick(req.body, ['nombre', 'email', 'img', 'role', 'estado']) */
    let body = req.body

    Usuario.findByIdAndUpdate(id, body, {new: true, runValidators: true}, (err, usuarioDB) => {

        if(err) return res.status(400).json({ok: false, err})
        
        res.json({
            ok: true,
            usuario: usuarioDB
        })

    })

})

app.delete('/usuario/:id', function(req, res) {

    let id = req.params.id

    let cambiaEstado = {
        estado: false
    };

    /* Usuario.findByIdAndRemove(id,  (err, usuarioBorrado) => { */
    Usuario.findByIdAndUpdate(id, cambiaEstado, {new: true}, (err, usuarioBorrado) => {

        if(err) return res.status(400).json({ok: false, err})

        if(!usuarioBorrado) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Usuario no encontrado'
                }
            })
        }

        res.json({
            ok:true,
            usuario: usuarioBorrado
        });
    });



});


module.exports = app;