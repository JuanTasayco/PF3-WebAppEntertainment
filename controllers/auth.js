const { response } = require("express")
const Usuario = require("../models/Usuario")
const bcrypt = require("bcryptjs")
const { generarJWT } = require("../helpers/jwt")


const crearUsuario = async (req, resp = response) => {

    const { email, password } = req.body
    console.log(email, password)
    try {

        const usuario = await Usuario.findOne({ email })

        if (usuario) {
            return resp.status(400).json({
                ok: false,
                msg: "This email already exists"
            })
        }

        const dbUser = new Usuario(req.body);
        const salt = bcrypt.genSaltSync();
        dbUser.password = bcrypt.hashSync(dbUser.password, salt)

        const token = await generarJWT(dbUser.id, dbUser.email)


        await dbUser.save();

        return resp.status(201).json({
            ok: true,
            msg: "Connect user",
            password: dbUser.password,
            email,
            token
        })


    } catch (error) {
        console.log(error)
        return resp.status(500).json({ //en caso no exista conexión
            ok: false,
            msg: "Contact an administrator pls",
        })
    }


}




const login = async (req, resp) => {
    const { email, password } = req.body

    try {

        const dbUser = await Usuario.findOne({ email: email });

        if (!dbUser) {
            return resp.status(400).json({
                ok: false,
                msg: "This email does not exist"
            })
        }

        //funcion especial debido al hash de las contraseñas 

        const validPassword = bcrypt.compareSync(password, dbUser.password)
        if (!validPassword) {
            return resp.status(400).json({
                ok: false,
                msg: "The password is not correct"
            })
        }

        const token = await generarJWT(dbUser.id, dbUser.email)


        return resp.json({
            ok: true,
            msg: "Connect login success",
            uid: dbUser.id,
            email: dbUser.email,
            token
        })

    } catch (err) {

        return resp.status(500).json({
            ok: false,
            msg: "Contact an administrator pls"
        })

    }

}

const validarToken = async (req, resp) => {

    const { uid } = req;
    console.log(uid)

    const dbUser = await Usuario.findById(uid);
    const token = await generarJWT(uid, dbUser.email);

    return resp.json({
        ok: true,
        msg: "Respuesta token establecida",
        email: dbUser.email,
        uid,
        token
    })
}


module.exports = {
    crearUsuario,
    login,
    validarToken
}