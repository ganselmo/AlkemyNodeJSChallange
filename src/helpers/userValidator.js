const { User } = require("../models");

const emailExists = async (email)=>{

    const emailExists = await User.findOne({
        where: {
            email
          }
    })
    
    if(emailExists){
        return true;
    }
    return false
}

module.exports = emailExists
