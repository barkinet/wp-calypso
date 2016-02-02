/**
 * External dependencies
 */
import Joi from 'joi';

/**
 * Module variables
 */

export function isValidStateWithSchema( state, schema ) {
	const validationError = Joi.validate( state, schema ).error;
	if ( validationError ) {
		console.warn( 'state validation failed', state, validationError );
	}
	return ! validationError;
}
