/**
 * External dependencies
 */
import Joi from 'joi';

const lastParams = Joi.object().keys( {
	search: Joi.string().allow( '', null ).optional(),
	tier: Joi.any().valid( 'free', 'premium', 'all' ).optional(),
	page: Joi.number().integer().optional(),
	perPage: Joi.number().integer().optional()
} );

const schema = Joi.object().keys( {
	previousSiteId: Joi.number().allow( null ).optional(),
	currentSiteId: Joi.number().allow( null ).optional(),
	isJetpack: Joi.boolean().allow( null ).optional(),
	lastParams: lastParams.allow( null ).optional()
} );

export default schema;
