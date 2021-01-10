const jwt = require('jsonwebtoken');

// Verificar token


// lo q hace el next es seguir con el programa
let verificaToken =  (req, res, next) => {

    // asi agarramos headers
    let token = req.get('token');

    jwt.verify(token, process.env.SEED, (err, decoded) => {

        if(err) return res.status(401).json({ok:false, err: {message: 'Token no valido'}});

        req.usuario = decoded.usuario;

        next(); // sigue el codigo y evita que termine aqui

    });

   
};

// verifican admin role
let verificaAdmin_role = (req, res, next) => {
    
    let usuario = req.usuario;

    if(usuario.role === 'ADMIN_ROLE'){
        next();
    } else {
        
       return res.json({ok:false, err: {message: 'El usuario no es administrador'}});
    }


}

module.exports = verificaToken;
module.exports = verificaAdmin_role;