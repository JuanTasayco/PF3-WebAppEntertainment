const { Router } = require("express");
const { crearUsuario, validarToken, login } = require("../controllers/auth");
const { check } = require("express-validator")
const { validarCampos } = require("../middlewares/validaciones-usuario");
const { validarJWT } = require("../middlewares/validar-jwt");

const router = Router();



router.post("/new", [
    check("email").notEmpty().withMessage("El email no debe estar vacío").isEmail().withMessage("Por favor escribe en un formato correcto"),
    check("password").notEmpty().withMessage("El password no debe ser vacío").isLength({ min: 6 }).withMessage("Debe tener mínimo 6 caracteres")
    , validarCampos
], crearUsuario)

router.post("/", [
    check("email").notEmpty().withMessage("El email no debe estar vacío").isEmail().withMessage("Por favor escribe en un formato correcto"),
    check("password").notEmpty().withMessage("El password no debe ser vacío").isLength({ min: 6 }).withMessage("Debe tener mínimo 6 caracteres")
    , validarCampos
], login)


router.get("/", validarJWT ,validarToken)

module.exports = router