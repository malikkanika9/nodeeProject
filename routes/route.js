const express = require("express");
const passport = require("passport");
const { fun } = require("../controllers/first.controller");
require('../passport');
const userController = require('../controllers/user.controller');
const { validateBody, schemas } = require('../helpers/admValidate');
const passportlogIn = passport.authenticate('localAdm', { session: false });
const router = express.Router();
router.get("/hello",fun)
router.post('/login',
validateBody(schemas.authSchema),
passportlogIn,
userController.handle_login,
userController.login
)


module.exports=router;
