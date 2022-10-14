const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const login = require('./models/login.model')
const JwtStrategy = require('passport-jwt').Strategy;
const Config = require('./configuration/config');
const { ExtractJwt } = require('passport-jwt');
const Cryptr = require('cryptr');
const cryptr = new Cryptr(Config.cryptR.secret);

isValidPassword = async function (newPassword, existiongPassword) {
    try {
        
        return await bcrypt.compare(newPassword, existiongPassword);
    } catch (error) {
        throw new Error(error);
    }
}
passport.use(
	'jwtAdm',
	new JwtStrategy(
		{
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			secretOrKey: Config.jwt.secret,
		},
		async (payload, done) => {
			try {
				if (!payload.admin) {
					return done(null, { id: 0 });
				}

				if (!payload.sub) {
					return done(null, { id: 0 });
				}
				if (!payload.ag) {
					return done(null, { id: 0 });
				}
				if (!payload.exp) {
					return done(null, { id: 0 });
				} else {
					var current_time = Math.round(new Date().getTime() / 1000);
					if (current_time > payload.exp) {
						return done(null, { id: 0 });
					}
				}

				const user = await Adm.findByAdminId(cryptr.decrypt(payload.sub));
				//CHECK POSTED GROUP == CURRENT GROUP
				//console.log('payload===>',payload,'user===>',user);

				if (user.length > 0) {
					if (payload.gp != user[0].group_id) {
						return done(null, { id: 0 });
					} else if (payload.sa != user[0].super_admin) {
						return done(null, { id: 0 });
					} else {
						user[0].ag = cryptr.decrypt(payload.ag);
						done(null, user[0]);
					}
				} else {
					return done(null, { id: 0 });
				}
			} catch (error) {
				done(null, user[0]);
			}
		}
	)
);
passport.use("localAdm",
    new LocalStrategy(async(username,password,done)=>{
        console.log(username)
        try {
            const user = await login.findByUsername(username)
            console.log("user", user)
            if(user.length > 0) {
                console.log("password",password)
                const isMatch = await isValidPassword(password,user[0].password);
                console.log(isMatch)
                if(!isMatch){
                    return done(null,{id:0,});
                }
                done(null,user[0]);
            }else{
                return done(null,{id:0,});
            }
        } catch (error) {
            console.log("ggg");
            done(error,false);
        }
    })
)