import { describe, it, before, after } from 'node:test';
import mongoose from 'mongoose';
import assert from 'node:assert';
import http from 'node:http';
import app from '../../server.js';

// const { describe, it, before, after } = require('node:test');
// const mongoose = require('mongoose');
// const assert = require('node:assert');
// const http = require('node:http');
// const app = require('../../server.js');

let server;
let port;

describe('POST /api/login-frontend tesztelése', () => { 
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
	
	it('Ezekkel az adatokkal van felhasználó!', async () => {
		const response = await fetch(`http://localhost:${port}/api/login-frontend`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				email: 'pinmark06@gmail.com',
				jelszo: 'pepe1'
			})
		});

		const valasz = await response.json();

		console.log(valasz);
		assert.equal(response.status, 201, 'Sikeres belépés!');
	});
});

// describe('POST /api/user/register tesztelése', () => { 
// 	before(async () => {
// 		await mongoose.connect(process.env.DBSTRING);
		
// 		server = http.createServer(app);
// 		await new Promise(resolve => server.listen(0, resolve));
// 		port = server.address().port;
// 	});	

// 	after(async () => {
// 		await mongoose.connection.close();
// 		await new Promise(resolve => server.close(resolve));
// 	});
	
// 	it('Ezekkel az adatokkal nincsen felhasználó!', async () => {
// 		const response = await fetch(`http://localhost:${port}/api/user/register`, {
// 			method: 'POST',
// 			headers: {
// 				'Content-Type': 'application/json'
// 			},
// 			body: JSON.stringify({
// 				nev: 'bálint',
// 				email: 'domi@gmail.com',
// 				jelszo: 'pepe'
// 			})
// 		});

// 		const valasz = await response.json();

// 		console.log(valasz);
// 		assert.equal(response.status, 403, 'Nem léphetsz be!');
// 	});
// });

// describe('POST /api/user/login tesztelése', () => { 
// 	before(async () => {
// 		await mongoose.connect(process.env.DBSTRING);
		
// 		server = http.createServer(app);
// 		await new Promise(resolve => server.listen(0, resolve));
// 		port = server.address().port;
// 	});	

// 	after(async () => {
// 		await mongoose.connection.close();
// 		await new Promise(resolve => server.close(resolve));
// 	});
	
// 	it('Ezekkel az adatokkal nem léphetsz be!', async () => {
// 		const response = await fetch(`http://localhost:${port}/api/user/login`, {
// 			method: 'POST',
// 			headers: {
// 				'Content-Type': 'application/json'
// 			},
// 			body: JSON.stringify({
// 				email: 'pepe@gmail.com',
// 				jelszo: 'pepe1'
// 			})
// 		});

// 		const valasz = await response.json();

// 		console.log(valasz);
// 		assert.equal(response.status, 403, 'Nem léphetsz be!');
// 	});
// });