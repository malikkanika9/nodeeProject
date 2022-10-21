const { resolve } = require("bluebird")
const db = require("../configuration/dbConfig")



module.exports = {
    add_studentData : async(userame)=>{
        return new Promise((res,rej)=>{
            db.one(`INSERT INTO studentInfo(Name,Class,Section,Roll_n) Values($1,$2,$3,$4) returning id`,[
                Name,
                Class,
                Section,
                Roll_n
            ]).then((data)=>{
                resolve(data)
            })
            .catch((err)=>{
                console.log(err,message)
                rej(err)
            })
        })
    },
   
}