const Joi = require("joi");
module.exports = {
    validateBody: (schema) => {
		return (req, res, next) => {
			const result = Joi.validate(req.body, schema, { abortEarly: false });
			if (result.error) {
				let err_msg = {};
				for (let counter in result.error.details) {
					let k = result.error.details[counter].context.key;
					let val = result.error.details[counter].message;
					err_msg[k] = val;
				}
				let return_err = { status: 2, errors: err_msg };
				return res.status(400).json(return_err);
			}

			if (!req.value) {
				req.value = {};
			}
			req.value['body'] = result.value;
			next();
		};
	},
    schemas:{
        authSchema: Joi.object().keys({
            
            username: Joi.string().required().alphanum().min(4).max(12),
            password: Joi.string().required().min(4).max(12),
        })
    }
}