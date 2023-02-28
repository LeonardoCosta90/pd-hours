import Joi from 'joi';

const createReportValidation = {
  description: Joi.string().required(),
  spentHours: Joi.number().min(1).max(12).required(),
  employeeId: Joi.number().required(),
};

export default Joi.object(createReportValidation);
