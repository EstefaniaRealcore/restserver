/********************* 
 PUERTO
*********************/
//process es una variable global que está siempre presente en node
process.env.PORT = process.env.PORT || 3000;

/********************* 
 ENTORNO
*********************/
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

/********************* 
 BASE DE DATOS
*********************/
let urlDB;

if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/cafe';
} else {
    urlDB = 'mongodb+srv://fani:5SJKx4hZWuCVaKDy@cluster0-lbz90.mongodb.net/cafe';
}
//envirorment inventado
process.env.urlDB = urlDB;