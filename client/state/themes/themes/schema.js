/**
 * External dependencies
 */
import Joi from 'joi';

const theme = Joi.object().keys( {
	active: Joi.boolean().optional(),
	id: Joi.string().required(),
	author: Joi.string().allow( '' ).optional(),
	screenshot: Joi.string().allow( '' ).optional(),
	author_uri: Joi.string().allow( '' ).optional(),
	demo_uri: Joi.string().allow( '' ).optional(),
	name: Joi.string().allow( '' ).optional(),
	stylesheet: Joi.string().allow( '' ).optional(),
	price: Joi.string().allow( '' ).optional()
} );

const themes = Joi.object().pattern( /[-a-z]+/, theme );

const schema = Joi.object().keys( {
	themes: themes,
	currentSiteId: Joi.number().optional()
} );

export default schema;
