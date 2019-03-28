const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

let rolesValidos = {
    values: ['ADMIN_ROLE', 'USER_ROLE'],
    message: '{VALUE} no es un rol válido'
};

//esquemas de mongoose
let Schema = mongoose.Schema;

let usuarioSchema = new Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    email: {
        type: String,
        required: [true, 'El correo es obligatorio'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'La contraseña es obligatoria']
    },
    img: {
        type: String,
        required: false
    },
    role: {
        type: String,
        default: 'USER_ROLE',
        enum: rolesValidos
    },
    estado: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    }
});

usuarioSchema.plugin(uniqueValidator, { message: '{PATH}: debe de ser único' });

//Quitamos parámetros password cuando se intente pasar el objecto usuarioSchema a un JSON
//Sobreescribios el método toJSON, que se usa siempre que se quiere imprimir,
//de esta manera no devolvemos la contraseña en la respuesta de la petición
usuarioSchema.methods.toJSON = function() {
    //no podemos poner función de flecha porque usamos dentro 'this'
    let user = this;
    //de esta manera obtenemos todas las propiedades y métodos del usuario a imprimir
    let userObject = user.toObject();
    delete userObject.password;

    return userObject;
}

module.exports = mongoose.model('Usuario', usuarioSchema);