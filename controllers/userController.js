
const userService = require("../services/userService");
const ApiError = require("../exceptions/apiError");
const {validationResult} = require("express-validator")


class UserController {

    async registration(req, res, next) {
        try {
            const errors = validationResult(req);

            if(!errors.isEmpty()) {
                return next(ApiError.BadRequest("Ошибка при валидации", errors.array()))
            }
            const {email, password, name, surname} = req.body;

            const userData = await userService.registration(req, email, password, name, surname);

            res.cookie("refreshToken", userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true});

            return res.json(userData);
        }catch(e) {
            next(e)
        }
    }
    

    async login(req, res, next) {
        try {
            const {email, password} = req.body;

            const userData = await userService.login(email, password);
            
            res.cookie("refreshToken", userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true});
            
            return res.json(userData);
        }catch(e) {
            next(e)
        }
    }

    async logout(req, res, next) {
        try {

            const {refreshToken} = req.cookies;
            const token = await userService.logout(refreshToken);

            res.clearCookie("refreshToken");

            return res.json(token)
        }catch(e) {
            next(e)
        }
    }

    async refresh(req, res, next) {
        try {
            const {refreshToken} = req.cookies;
            const userData = await userService.refresh(refreshToken);
            res.cookie("refreshToken", userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true});

            return res.json(userData);

        } catch(e) {
            next(e)
        }      
    }

    async deleteUser(req, res, next) {
        try {
            const id = req.params.id;
            const {refreshToken} = req.cookies;
            res.clearCookie("refreshToken");
            await userService.userDelete(id, refreshToken);

            return res.json({message: "Delete user"}); 
        }catch(e) {
            next(e)
        }
    }
} 


module.exports = new UserController