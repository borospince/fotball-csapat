import { useState } from 'react';
import './Register.css';

const Register = () => {
	const [nev, setNev] = useState('');
	const [email, setEmail] = useState('');
	const [jelszo, setJelszo] = useState('');
	const [jelszoUjra, setJelszoUjra] = useState('');

	async function regisztracio(event) {
		event.preventDefault();

		if (jelszo !== jelszoUjra) {
			window.alert('A jelszavak nem egyeznek!');
			return;
		}
		
		const response = await fetch('http://localhost:3500/api/register-frontend', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ nev, email, jelszo })
		});

		const valasz = await response.json();

		if (response.ok) {
			window.alert(valasz.msg);
			window.location.href = '/';
		} else {
			window.alert(valasz.msg);
		}
	}

	return (
		<div className='register-kontener'>
			<h1>Regisztráció</h1>
			<form>
				<table>
					<tbody>
					<tr>
						<td><label htmlFor="nev">Felhasználói név:</label></td>
						<td><input type="text" id="nev" onChange={(e) => setNev(e.target.value)} /></td>
					</tr>
					<tr>
						<td><label htmlFor="email">Email:</label></td>
						<td><input type="email" id="email" onChange={(e) => setEmail(e.target.value)} /></td>
					</tr>
					<tr>
						<td><label htmlFor="jelszo">Jelszó:</label></td>
						<td><input type="password" id="jelszo" onChange={(e) => setJelszo(e.target.value)} /></td>
					</tr>
					<tr>
						<td><label htmlFor="jelszo-ujra">Jelszó újra:</label></td>
						<td><input type="password" id="jelszo-ujra" onChange={(e) => setJelszoUjra(e.target.value)} /></td>
					</tr>
					<tr>
						<td><button onClick={regisztracio}>Regisztráció: </button></td>
						<td></td>
					</tr>
					</tbody>
				</table>
			</form>
		</div>
	);
}

export default Register;