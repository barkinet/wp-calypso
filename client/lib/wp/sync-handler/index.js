
/**
 * Module dependencies
 */
import config from 'config';
import localforage from 'localforage';
import Hashes from 'jshashes';
import { isWhitelisted } from './lists';

import debugFactory from 'debug';
const debug = debugFactory( 'calypso:sync-handler' );

// defaults
const defaults = config( 'sync-handler-defaults' );
defaults.driver = localforage[ defaults.driver ];

/**
 * SyncHandler class
 */
export class SyncHandler {
	/**
	 * Create a SyncHandler instance
	 *
	 * @param {Object} [setup] - sync setup
	 * @param {Function} handler - wpcom handler
	 *
	 * @return {Function} sync-handler wrapper
	 */
	constructor( setup, handler ) {
		if ( 'function' === typeof setup ) {
			handler = setup;
			setup = {};
		}

		this.setup = Object.assign( {}, defaults, setup );
		this.reqHandler = handler;
		return this.syncHandlerInstance( handler );
	}

	syncHandlerInstance( handler ) {
		const self = this;

		return function( params, wrappedResponseCallback ) {
			// detect and no-sync proxy connection request
			if ( params.metaAPI && params.metaAPI.accessAllUsersBlogs ) {
				debug( 'skip - non-sync -proxy-handler request detected' );
				return self.reqHandler( params, wrappedResponseCallback );
			}

			const clonedParams = Object.assign( {}, params );
			const { path } = clonedParams;

			// whitelist barrier
			if ( ! isWhitelisted( params ) ) {
				debug( 'not whitelisted: skip %o request', path );
				return handler( params, wrappedResponseCallback );
			};

			// response sent flag
			let responseSent = false;

			// generate an unique resource key
			const key = self.generateKey( params );

			debug( 'starting to get resource ...' );

			self.retrieveRecord( key, function( err, localRecord ) {
				if ( err ) {
					// @TODO improve error handling here
					console.error( err );
				}

				// let's be optimistic
				if ( localRecord ) {
					responseSent = true;

					debug( '%o stored(%o). Let\'s be optimistic ...\n', path, localRecord );
					wrappedResponseCallback( null, localRecord.body );
				} else {
					debug( 'No data for %o\n', path );
				}

				// * background sync process *
				debug( 'requesting %o to WP.com', path );
				handler( params, ( resErr, resData ) => {
					if ( resErr ) {
						if ( responseSent ) {
							return;
						}

						return wrappedResponseCallback( resErr );
					}

					debug( 'WP.com response %o -> %o', path, resData );

					const isPOSTRequest = clonedParams &&
						clonedParams.method &&
						'post' === clonedParams.method.toLowerCase();

					if ( ! isPOSTRequest ) {
						let storingData = {
							__sync: {
								key,
								synced: new Date().toString(),
								syncing: false
							},
							body: resData,
							params: clonedParams
						};

						self.storeRecord( key, storingData, storedErr => {
							if ( storedErr ) {
								console.error( storedErr );
								if ( ! responseSent ) {
									wrappedResponseCallback( err, resData );
								}
							}

							// extra response
							let _resData = Object.assign(
								{},
								resData,
								{ __backgroundResponse: true }
							);

							debug( 'background response sent' );
							wrappedResponseCallback( err, _resData );
						} );
					} else {
						debug( 'skip - non sync request: [%o] %o - %o\n', path, params, resData );
					}

					if ( ! responseSent ) {
						wrappedResponseCallback( err, resData );
					}
				} );
			} );
		};
	}

	/**
	 * Generate a key from the given param object
	 *
	 * @param {Object} params - request parameters
	 * @param {Boolean} hashCodification - codificate key when it's true
	 * @return {String} request key
	 */
	generateKey( params, hashCodification = true ) {
		var key = params.apiVersion || '';
		key += '-' + params.method;
		key += '-' + params.path;

		if ( params.query ) {
			key += '-' + params.query;
		}

		if ( hashCodification ) {
			key = new Hashes.SHA1().hex( key );
		}

		debug( 'key: %o', key );
		return key;
	}

	retrieveRecord( key, fn = () => {} ) {
		localforage.config( this.setup );
		debug( 'getting data from %o key\n', key );
		localforage.getItem( key, fn );
	}

	storeRecord( key, data, fn = () => {} ) {
		localforage.config( this.setup );
		debug( 'storing data in %o key\n', key );
		localforage.setItem( key, data, fn );
	}

	removeRecord( key, fn = () => {} ) {
		localforage.config( this.setup );
		debug( 'removing %o key\n', key );
		localforage.removeItem( key, fn );
	}
}
