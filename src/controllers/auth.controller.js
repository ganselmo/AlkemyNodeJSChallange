

const { signToken } = require("../helpers/auth.helper.js");
const { User } = require("../models");
const bcryptjs = require("bcryptjs");
const emailExists  = require("../helpers/userValidator.js");
const { sendWelcomeEmail } = require("../helpers/email.helper.js");
const errorFactory = require('../errors/ErrorFactory')
const login = async (req, res) => {


    try {
        const { email, password } = req.body
        const user = await User.findOne({
            where: {
                email
              }
        })
        if(!user){
            return res.status(401).json({errors:{msg:"user.auth_failed"}})
        }
        const validatePassword = bcryptjs.compareSync(password,user.password)
        if(!validatePassword){
            return res.status(401).json({errors:{msg:"user.auth_failed"}})
        }


        const token = signToken(user);
        return res.status(200).json({
            user,
            token
        })
    } catch (e) {
        return errorFactory.createError(error, res)
    }
}


const register = async (req, res) => {

    try {
        const { firstName, lastName, email, password } = req.body

        if(await emailExists(email)){
            return res.status(400).json({errors:{msg:"user.email_exists"}})
        }
        const salt = bcryptjs.genSaltSync()

        const user = await User.create({
            firstName,
            lastName,
            email,
            password: bcryptjs.hashSync(password,salt)
        });
        const token = signToken(user);
        await sendWelcomeEmail(email,firstName,lastName)
        return res.status(200).json({
            user,
            token
        })
    } catch (error) {
        return errorFactory.createError(error, res)

    }

}

module.exports = { login, register }