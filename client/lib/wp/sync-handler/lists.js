/**
 * Module dependencies
 */

import debugFactory from 'debug';
const debug = debugFactory( 'calypso:sync-handler:whitelist' );

const whitelist = [
	'^/me',
	'^/sites/.+/stats/',
	'^/sites/.+/posts$'
];

export const isWhitelisted = params => {
	const { path } = params;

	let whitelisted = false;
	for ( let i = 0; i < whitelist.length; i++ ) {
		let item = whitelist[ i ];
		let regExp = new RegExp( item );
		if ( regExp.test( path ) ) {
			debug( ' %o whitelisted', path );
			whitelisted = true;
			continue;
		}
	}

	return whitelisted;
}
