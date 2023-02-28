import Joi from 'joi';

const createSquadValidation = {
  name: Joi.string().required(),
};

export default Joi.object(createSquadValidation);
