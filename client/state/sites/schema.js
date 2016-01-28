/**
 * External dependencies
 */
import Joi from 'joi';

const schema = Joi.object().keys( {
	ID: Joi.number().integer().required(),
	name: Joi.string().min( 1 ).required()
	//TODO: please fill this out
} );

export default schema;
