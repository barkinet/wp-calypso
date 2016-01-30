/**
 * External dependencies
 */
import Joi from 'joi';

const cost = Joi.object().keys( {
	currency: Joi.string().allow( '' ).optional(),
	number: Joi.number().optional(),
	display: Joi.string().allow( '' ).optional()
} );

const theme = Joi.object().keys( {
	name: Joi.string().required(),
	id: Joi.string().required(),
	cost: cost
} );

const currentThemes = Joi.object().pattern( /\d+/, theme );

const schema = Joi.object().keys( {
	isActivating: Joi.boolean().required(),
	hasActivated: Joi.boolean().required(),
	currentThemes: currentThemes
} );

export default schema;
