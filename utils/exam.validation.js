const Joi = require('joi');

const validateExam = (data) => {
    const schema = Joi.object({
        name: Joi.string().required(),
        cource: Joi.string().required().min(1),
        topic: Joi.string().required().min(1)
    });
    return schema.validate(data);
};

module.exports = { validateExam };
