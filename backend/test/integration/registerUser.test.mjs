import { describe, it, before, after } from 'node:test';
import mongoose from 'mongoose';
import assert from 'node:assert';
import http from 'node:http';
import app from '../../server.js';

let server;
let port;

describe('POST /api/register-frontend tesztelése', () => { 
	before(async () => {
		await mongoose.connect(process.env.DBSTRING);
		
		server = http.createServer(app);
		await new Promise(resolve => server.listen(0, resolve));
		port = server.address().port;
	});	

	after(async () => {
		await mongoose.connection.close();
		await new Promise(resolve => server.close(resolve));
	});
	
	it('Felhasználó regisztrálása!', async () => {
		const response = await fetch(`http://localhost:${port}/api/register-frontend`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				nev: 'dominik',
				email: 'dominik06@gmail.com',
				jelszo: 'dominik'
			})
		});

		const valasz = await response.json();

		console.log(valasz);
		assert.equal(response.status, 200, 'Sikeres belépés!');
	});
});
