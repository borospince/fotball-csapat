import { useState } from 'react';
import './Login.css';

const Login = () => {
	const [email, setEmail] = useState('');
	const [jelszo, setJelszo] = useState('');

	async function bejelentkezes(event) {
		event.preventDefault();

		
		
		const response = await fetch('http://localhost:3500/api/login-frontend', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({  email, jelszo })
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
		<div className='login-kontener'>
			<h1>Regisztráció</h1>
			<form>
				<table>
					<tbody>
					<tr>
						<td><label htmlFor="email">Email:</label></td>
						<td><input type="email" id="email" onChange={(e) => setEmail(e.target.value)} /></td>
					</tr>
					<tr>
						<td><label htmlFor="jelszo">Jelszó:</label></td>
						<td><input type="password" id="jelszo" onChange={(e) => setJelszo(e.target.value)} /></td>
					</tr>
					<tr>
						<td><button onClick={bejelentkezes}>Bejelentkezés: </button></td>
						<td></td>
					</tr>
					</tbody>
				</table>
			</form>
								<div className='registergomb'>
						<p>Nincs még fiókod? </p>
						<button onClick={() => window.location.href = '/register'}>Regisztráció</button>
					</div>
		</div>
	);
}

export default Login;