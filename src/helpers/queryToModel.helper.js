const { Op } = require("sequelize")


const buildWhereClause =(clauses=[]) =>{
    let whereClause ={} 
    
    clauses.forEach((clause)=>{
        if(clause.value)
            whereClause[clause.name] = { [Op[clause.op]]: clause.value }
    })
    return whereClause;
}


module.exports={buildWhereClause}