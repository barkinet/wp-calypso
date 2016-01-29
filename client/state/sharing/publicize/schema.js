/**
 * External dependencies
 */
import Joi from 'joi';

export const fetchingConnectionsSchema = Joi.object().pattern( /\d+/, Joi.boolean() );

const connection = Joi.object().keys( {
	ID: Joi.number().integer().required(),
	site_ID: Joi.number().integer().required(),
	user_ID: Joi.number().integer().optional(),
	keyring_connection_ID: Joi.number().integer().optional(),
	keyring_connection_user_ID: Joi.number().integer().optional(),
	shared: Joi.boolean().optional(),
	service: Joi.string().allow( '' ).optional(),
	label: Joi.string().allow( '' ).optional(),
	issued: Joi.string().allow( '' ).optional(),
	expires: Joi.string().allow( '' ).optional(),
	external_ID: Joi.string().allow( '' ).optional(),
	external_name: Joi.string().allow( '' ).optional(),
	external_display: Joi.string().allow( '' ).optional(),
	external_profile_picture: Joi.string().allow( '' ).optional(),
	external_profile_URL: Joi.string().allow( '' ).optional(),
	external_follower_count: Joi.number().integer().optional(),
	status: Joi.string().allow( '' ).optional(),
	refresh_URL: Joi.string().allow( '' ).optional(),
	meta: Joi.object().optional()
} );
export const connectionsSchema = Joi.object().pattern( /\d+/, connection );

export const connectionsBySiteIdSchema = Joi.object().pattern( /\d+/,
	Joi.array().items( Joi.number().integer() )
);

