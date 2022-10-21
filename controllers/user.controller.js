const { request } = require("express");
const JWT = require('jsonwebtoken');
const Config= require("../configuration/config")

AdmloginToken = () => {
	console.log(Config.jwt.secret)
	return JWT.sign(
		{
			
		},
		Config.jwt.secret
	);
};

module.exports = {
    handle_login: async (req, res, next) => {
        console.log("ff", req.user.id)
		if (Number.	isInteger(req.user.id) && req.user.id > 0) {
		next();
		} else {
			let err_data = { password: 'Invalid login details' };
			return res.status(400).json({ status: 2, errors: err_data });
		}
	},
    login: async (req, res, next) => {
		if (Number.isInteger(req.user.id) && req.user.id > 0) {
			
			const token = AdmloginToken();
			console.log({token})
			
			res.status(200).json({ status: 1, token: token });
		} else {
			let err_data = { password: 'Invalid login details' };
			return res.status(400).json({ status: 2, errors: err_data });
		}
	},

	add_studentData: async (req, res, next) => {
		try {
			const { Name,Section,Class,Roll_n} =
				req.value.body;
			const salt = await bcrypt.genSalt(10);
			const passwordHash = await bcrypt.hash(password, salt);

			const admobj = {
				
				Name: entities.encode(Name),
				Class: entities.encode(Class),
				Section:entities.encode(Section),
				Roll_n:entities.encode(Roll_n),
				// date_added: common.currentDateTime(),
			};
			await admModel
				.add_studentData(admobj)
				.then(function (data) {
					res
						.status(200)
						.json({
							status: 1,
							data: data,
						})
						.end();
				})
				.catch((err) => {
					console.log(err);
					res
						.status(400)
						.json({
							status: 1,
							message: "Data   Added",
						})
						.end();
				});
		} catch (err) {
			console.log(err);
			res
				.status(400)
				.json({
					status: 1,
					message: "Data  Added",
				})
				.end();
		}
	},
}