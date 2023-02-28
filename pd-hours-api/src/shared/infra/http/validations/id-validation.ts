import Joi from 'joi';

const IdValidation = {
  id: Joi.number().min(1),
};

export default Joi.object(IdValidation);
