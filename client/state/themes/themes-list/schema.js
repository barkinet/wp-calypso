/**
 * External dependencies
 */
import Joi from 'joi';

const query = Joi.object().keys( {
	search: Joi.string().allow( '', null ).optional(),
	perPage: Joi.number().integer().optional(),
	page: Joi.number().integer().optional(),
	tier: Joi.any().valid( 'free', 'premium', 'all' ).optional(),
	id: Joi.number().integer().optional()
} );

const queryState = Joi.object().keys( {
	isLastPage: Joi.boolean().optional(),
	isFetchingNextPage: Joi.boolean().optional()
} );

const schema = Joi.object().keys( {
	list: Joi.array().items( Joi.string() ),
	nextId: Joi.number().integer().optional(),
	query: query,
	queryState: queryState,
	active: Joi.number().optional()
} );

export default schema;
