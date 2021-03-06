// ===============================
// puerto
// ===============================
process.env.PORT = process.env.PORT || 3000;


// ===============================
// Entorno
// ===============================
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';




// ===============================
// Vencimiento del Token
// ===============================
// 60 segundos
// 60 minutos
// 24 horas
// 30 dias
process.env.CADUCIDAD_TOKEN = 60 * 60 * 24 * 30;



// ===============================
// Seed de autenticación
// ===============================
process.env.SEED = process.env.SEED || 'secret';




// ===============================
// Base de datos
// ===============================
let urlDB;

 if( process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/cafe'
} else {
    urlDB = 'mongodb+srv://root:root@cluster0.1tdjw.mongodb.net/<cafe>?retryWrites=true&w=majority'; 
 } 


process.env.URLDB = urlDB; 


