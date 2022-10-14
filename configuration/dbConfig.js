
const Promise = require("bluebird");
const Config = require("./config");
const initOptions = {
  promiseLib: Promise,
  query(e) {
  
  },
  error(error, e) {
    if (e.cn) {
      console.log("CN:", e.cn);
      console.log("EVENT:", error.message || error);
    }
  },
};
const pgp = require("pg-promise")(initOptions);

const cn = {
  host: Config.db.host, 
  port: Config.db.port,
  database: Config.db.database,
  user: Config.db.user,
  password: Config.db.password,
};
pgp.pg.types.setTypeParser(1114, (s) => s);

const db = pgp(cn); 

db.connect()
  .then((obj) => {
    obj.done();
     console.log("Database Connected");
  })
  .catch((error) => {
    console.log("ERROR:", error.message || error);
  });

module.exports = db;

