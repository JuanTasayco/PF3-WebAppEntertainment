const { reponse } = require("express");
const jwt = require("jsonwebtoken");



const validarJWT = (req, resp, next) => {

    const token = req.header("x-token")

    if (!token) {
        return resp.status(401).json({
            ok: false,
            msg: "error en el token"
        })
    }


    try {

        const { uid } = jwt.verify(token, process.env.SECRET_JWT_SEED)
        req.uid = uid;


    } catch (err) {
        return resp.status(401).json({
            ok: false,
            msg: "token no valido"
        })

    }



    next();
}

module.exports = {
    validarJWT
}