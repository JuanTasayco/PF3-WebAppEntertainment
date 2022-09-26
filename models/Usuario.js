const { Schema, model } = require("mongoose");


const UsuarioSchema = Schema({
    email: {
        type: String,
        unique: true,
        required: true,

    },
    password: {
        type: String,
        required: true
    },
})

module.exports = model("Usuario", UsuarioSchema)