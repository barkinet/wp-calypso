/**
 * External dependencies
 */
import { combineReducers } from 'redux';
import pick from 'lodash/object/pick';
import indexBy from 'lodash/collection/indexBy';
import isFunction from 'lodash/lang/isFunction';
import omit from 'lodash/object/omit';
import debugModule from 'debug';
import Joi from 'joi';

/**
 * Internal dependencies
 */
import { plans } from './plans/reducer';
import { SITE_RECEIVE, SERIALIZE, DESERIALIZE } from 'state/action-types';
import schema from './schema';

/**
 * Module variables
 */
const debug = debugModule( 'calypso:state:sites' );

/**
 * Tracks all known site objects, indexed by site ID.
 *
 * @param  {Object} state  Current state
 * @param  {Object} action Action payload
 * @return {Object}        Updated state
 */
export function items( state = {}, action ) {
	switch ( action.type ) {
		case SITE_RECEIVE:
			return Object.assign( {}, state, {
				[ action.site.ID ]: action.site
			} );
		case SERIALIZE:
			// scrub _events, _maxListeners, and other misc functions
			const sites = Object.keys( state ).map( ( siteID ) => {
				let plainJSObject = Object.assign( {}, state[ siteID ] );
				plainJSObject = pick( plainJSObject, ( value ) => ! isFunction( value ) );
				plainJSObject = omit( plainJSObject, [ '_events', '_maxListeners'] );
				return plainJSObject;
			} );
			return indexBy( sites, 'ID' );
		case DESERIALIZE:
			const validationErrors = Object.keys( state ).map( ( key ) => {
				return Joi.validate( state[key], schema ).error
			} ).filter( error => !! error );
			if ( validationErrors.length > 0 ) {
				debug( 'failed to deserialize site items', validationErrors );
				return {};
			}
			return state;

	}
	return state;
}

export default combineReducers( {
	items,
	plans
} );
