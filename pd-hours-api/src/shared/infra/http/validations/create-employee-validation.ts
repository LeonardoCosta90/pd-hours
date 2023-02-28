import Joi from 'joi';

const createEmployeeValidation = {
  name: Joi.string().required(),
  estimatedHours: Joi.number().min(1).max(12).required(),
  squadId: Joi.number().required(),
};

export default Joi.object(createEmployeeValidation);
