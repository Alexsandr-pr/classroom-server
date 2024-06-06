const Router = require("express");
const router = new Router();
const {body} = require("express-validator");
const UserController = require("../controllers/userController")

router.post("/registration",
    body("email").isEmail(),
    body("password").isLength({min:3, max:32}), 
    UserController.registration);

router.post("/login", 
    body("email").isEmail(),
    UserController.login);

router.post("/logout", UserController.logout);

router.get("/refresh", UserController.refresh);
router.delete("/del/:id", UserController.deleteUser);

module.exports = router