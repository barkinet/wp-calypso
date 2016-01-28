/**
 * External dependencies
 */
import { expect } from 'chai';

/**
 * Internal dependencies
 */
import {
	CONNECTION_LOST,
	CONNECTION_RESTORED,
	SERIALIZE,
	DESERIALIZE
} from 'state/action-types';
import { connectionState } from '../reducer';

describe( 'reducer', () => {
	describe( 'connection lost', () => {
		it( 'updates state to offline', () => {
			const state = connectionState( 'CHECKING', { type: CONNECTION_LOST } );
			expect( state ).to.eql( 'OFFLINE' );
		} );
	} );
	describe( 'connection restored', () => {
		it( 'updates state to online', () => {
			const state = connectionState( 'CHECKING', { type: CONNECTION_RESTORED } );
			expect( state ).to.eql( 'ONLINE' );
		} );
	} );
	describe( 'SERIALIZE', () => {
		it( 'never persists online state', () => {
			const state = connectionState( 'ONLINE', { type: SERIALIZE } );
			expect( state ).to.eql( 'CHECKING' );
		} );
		it( 'never persists offline state', () => {
			const state = connectionState( 'OFFLINE', { type: SERIALIZE } );
			expect( state ).to.eql( 'CHECKING' );
		} );
	} );
	describe( 'DESERIALIZE', () => {
		it( 'always uses initialState, even if given offline', () => {
			const state = connectionState( 'OFFLINE', { type: DESERIALIZE } );
			expect( state ).to.eql( 'CHECKING' );
		} );
		it( 'always uses initialState, even if given online', () => {
			const state = connectionState( 'ONLINE', { type: DESERIALIZE } );
			expect( state ).to.eql( 'CHECKING' );
		} );
	} );
} );
