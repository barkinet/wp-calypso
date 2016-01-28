/**
 * External dependencies
 */
import { combineReducers } from 'redux';
import Joi from 'joi';
import debugModule from 'debug';

/**
 * Internal dependencies
 */
import { CURRENT_USER_ID_SET, SERIALIZE, DESERIALIZE } from 'state/action-types';
import schema from './schema';
const debug = debugModule( 'calypso:state:current-user' );

/**
 * Tracks the current user ID.
 *
 * @param  {Object} state  Current state
 * @param  {Object} action Action payload
 * @return {Object}        Updated state
 */
export function id( state = null, action ) {
	switch ( action.type ) {
		case CURRENT_USER_ID_SET:
			state = action.userId;
			break;
		case SERIALIZE:
			return state;
		case DESERIALIZE:
			const validationError = Joi.validate( state, schema ).error;
			if ( validationError ) {
				debug( 'failed to deserialize current user', validationError );
				return null;
			}
			return state;
	}

	return state;
}

export default combineReducers( {
	id
} );
