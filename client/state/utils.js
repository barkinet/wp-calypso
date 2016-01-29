/**
 * External dependencies
 */
import Joi from 'joi';
import debugModule from 'debug';

/**
 * Module variables
 */
const debug = debugModule( 'calypso:state' );

export function isValidStateWithSchema( state, schema ) {
	const validationError = Joi.validate( state, schema ).error;
	if ( validationError ) {
		debug( 'state validation failed', state, validationError );
	}
	return ! validationError;
}
