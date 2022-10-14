const { request } = require("express");

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
			let adm_data = {
				
				password: req.password,
			};
			const token = AdmloginToken(adm_data);
			res.status(200).json({ status: 1, token: token });
		} else {
			let err_data = { password: 'Invalid login details' };
			return res.status(400).json({ status: 2, errors: err_data });
		}
	},
}