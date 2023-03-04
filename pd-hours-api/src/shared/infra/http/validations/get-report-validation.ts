import Joi from 'joi';

const getReportValidation = {
  squadId: Joi.number().min(1),
  startDate: Joi.string().optional(),
  endDate: Joi.string().optional(),
};

export default Joi.object(getReportValidation);
