/**
 * External dependencies
 */
import Joi from 'joi';

const logo = Joi.object().keys( {
	id: Joi.number().integer(),
	sizes: Joi.array(),
	url: Joi.string().allow( '' )
} );

const capabilities = Joi.object().pattern( /[a-z_]+/, Joi.boolean() );

const plan = Joi.object().keys( {
	product_id: Joi.number().integer(),
	product_slug: Joi.string().allow( '' ),
	product_name_short: Joi.string().allow( '' ),
	free_trial: Joi.boolean()
} );

const item = Joi.object().keys( {
	ID: Joi.number().integer().required(),
	name: Joi.string().min( 1 ).required(),
	description: Joi.string().allow( '' ).optional(),
	URL: Joi.string().optional(),
	jetpack: Joi.boolean().optional(),
	post_count: Joi.number().integer().optional(),
	subscribers_count: Joi.number().integer().optional(),
	lang: Joi.string().min( 2 ).optional(),
	logo: logo.optional(),
	visible: Joi.boolean().optional(),
	options: Joi.object().optional(),
	meta: Joi.object().optional(),
	user_can_manage: Joi.boolean().optional(),
	is_vip: Joi.boolean().optional(),
	is_multisite: Joi.boolean().optional(),
	is_following: Joi.boolean().optional(),
	is_private: Joi.boolean().optional(),
	capabilities: capabilities.optional(),
	plan: plan.required().optional(),
	single_user_site: Joi.boolean().optional(),
	primary: Joi.boolean().optional(),
	domain: Joi.string().allow( '' ).optional(),
	slug: Joi.string().allow( '' ).optional(),
	title: Joi.string().allow( '' ).optional(),
	wpcom_url: Joi.string().allow( '' ).optional()
} );

const schema = Joi.object().pattern( /\d+/, item );

export default schema;
