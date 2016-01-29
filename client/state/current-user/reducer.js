/**
 * External dependencies
 */
import { combineReducers } from 'redux';
import Joi from 'joi';

/**
 * Internal dependencies
 */
import { CURRENT_USER_ID_SET, SERIALIZE, DESERIALIZE } from 'state/action-types';
import { isValidStateWithSchema } from 'state/utils';
import schema from './schema';

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
			return isValidStateWithSchema( state, schema ) ? state : null;
	}

	return state;
}

export default combineReducers( {
	id
} );
