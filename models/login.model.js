const db = require('../configuration/dbConfig')

module.exports ={
    findByUsername: async(username)=>{
        return new Promise(function(resolve, reject) {
            db.any(
                "select username, password,id from  login where username=($1)",[username]
            )
            .then(function(result) { 
                console.log(result)
                resolve(result);
             })
            .catch(function(err) { 
                console.log("err",err)
                reject(err)
            })
        });
    }



}