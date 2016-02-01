/**
 * External dependencies
 */
import Joi from 'joi';

const user = Joi.object().keys( {
	ID: Joi.number().integer().required(),
	display_name: Joi.string().required(),
	username: Joi.string().required(),
	avatar_URL: Joi.string().allow( '' ).optional(),
	site_count: Joi.number().integer().optional(),
	visible_site_count: Joi.number().integer().optional(),
	date: Joi.string().allow( '' ).optional(),
	has_unseen_notes: Joi.boolean().optional(),
	newest_note_type: Joi.string().optional(),
	phone_account: Joi.boolean().optional(),
	email: Joi.string().allow( '' ).optional(),
	email_verified: Joi.boolean().optional(),
	is_valid_google_apps_country: Joi.boolean().optional(),
	logout_URL: Joi.string().allow( '' ).optional(),
	primary_blog_url: Joi.string().allow( '' ).optional(),
	meta: Joi.object().optional(),
	primarySiteSlug: Joi.string().allow( '' ).optional(),
	localeSlug: Joi.string().allow( '' ).optional(),
	isRTL: Joi.boolean().optional()
} );

const schema = Joi.object().pattern( /\d+/, user );

export default schema;
