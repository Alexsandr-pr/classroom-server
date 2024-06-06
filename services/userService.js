
require("dotenv").config()
const bcrypt = require("bcrypt");
const uuid = require("uuid");
const tokenService = require("./tokenService");
const User = require("../models/User")
const ApiError = require("../exceptions/apiError")
const UserDto = require("../dtos/user-dto");

class UserService {

    async registration(req, email, password, name, surname) {

        const candidate = await User.findOne({email});

        if(candidate) {
            throw  ApiError.BadRequest(`Користувач з таким ${email} вже існує!`);
        }

        const hashPassword = await bcrypt.hash(password, 5);
        const user = await User.create({email, password: hashPassword, name, surname});

        const userDto = new UserDto(user);

        const tokens = tokenService.generateTokens({...userDto});
        await tokenService.saveToken(userDto.id, tokens.refreshToken);

        return { ...tokens, user: userDto }
    }


    async login(email, password) {
        try {
            const user = await User.findOne({email});
            if(!user) {
                throw  ApiError.BadRequest('The user was not found, please check that your email is entered correctly')
            }

            const isPassEquals = await bcrypt.compare(password, user.password);
            
            if(!isPassEquals) {
                if(user) {
                    throw ApiError.BadRequest("Incorrect password, try again.")
                }
            }

            const userDto = new UserDto(user);
            const tokens = tokenService.generateTokens({...userDto});
            
            await tokenService.saveToken(userDto.id, tokens.refreshToken);

            return { ...tokens, user: userDto }
        } catch(e) {
            throw e
        }
    }

    async logout(refreshToken) {
        const token = await tokenService.removeToken(refreshToken);
        return token;
    }

    async refresh(refreshToken) {
        if(!refreshToken)  {
            throw ApiError.UnathorizedError();
        }

        const userData = tokenService.validateRefreshToken(refreshToken);
        const tokenFromDb = await tokenService.findToken(refreshToken);
        if(!userData || !tokenFromDb) {
            throw ApiError.UnathorizedError();
        }

        const user = await User.findById(userData.id);

        const userDto = new UserDto(user)
        const tokens = tokenService.generateTokens({...userDto});
        await tokenService.saveToken(userDto.id, tokens.refreshToken);

        return { ...tokens, user: userDto }
    }


    async userDelete(id, refreshToken) {
        try {
            const user = await User.findById({_id: id}); 
            
            await tokenService.removeToken(refreshToken);
            
            await User.deleteOne({ _id: id })
        } catch(e) {
        }    
    }
}



module.exports = new UserService;