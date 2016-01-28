/**
 * External dependencies
 */
import Joi from 'joi';

const schema = Joi.number().integer().min( 0 ).required();

export default schema;
