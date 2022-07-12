

const { signToken } = require("../helpers/auth.helper.js");
const { User } = require("../models");
const bcryptjs = require("bcryptjs");
const emailExists  = require("../helpers/userValidator.js");

const login = async (req, res) => {


    try {
        const { email, password } = req.body
        const user = await User.findOne({
            where: {
                email
              }
        })
        if(!user){
            return res.status(400).json({errors:{msg:"user.not_found"}})
        }
        const validatePassword = bcryptjs.compareSync(password,user.password)
        if(!validatePassword){
            return res.status(400).json({errors:{msg:"user.password_invalid"}})
        }


        const token = signToken(user);
        return res.status(200).json({
            user,
            token
        })
    } catch (e) {
        res.status(500).json({ msg: e.message })
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
        // sendEmail here
        return res.status(200).json({
            user,
            token
        })
    } catch (e) {
        res.status(500).json({ msg: e.message })

    }

}

module.exports = { login, register }