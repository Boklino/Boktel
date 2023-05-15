import axios from 'axios';
import { useContext } from 'react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../UserContext';
import Swal from 'sweetalert2';

export default function LoginPage() {
	const navigate = useNavigate();
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const { setUser } = useContext(UserContext);
	function delay(time) {
		return new Promise((resolve) => setTimeout(resolve, time));
	}

	const handleLogin = async (e) => {
		e.preventDefault();
		try {
			const { data } = await axios.post('/login', {
				email,
				password,
			});

			setUser(data);
			let timerInterval;
			Swal.fire({
				title: 'Login successful',
				timer: 1000,
				didOpen: () => {
					const b = Swal.getHtmlContainer().querySelector('b');
					timerInterval = setInterval(() => {
						b.textContent = Swal.getTimerLeft();
					}, 100);
				},
				willClose: () => {
					clearInterval(timerInterval);
				},
			});

			delay(1200).then(() => navigate('/'));
		} catch (ex) {
			Swal.fire('login unsuccessful');
		}
	};
	return (
		<div className='mt-4 min-h-screen flex flex-col items-center justify-around'>
			<div className=' mb-48'>
				<h1 className=' text-4xl text-center mb-4'>Login</h1>
				<form className=' max-w-md mx-auto ' onSubmit={handleLogin}>
					<input
						type='email'
						placeholder='your@email.com'
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
					<input
						type='password'
						placeholder='password'
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
					<button className='primary'>Login</button>
					<div className='text-center text-gray-500'>
						Don't have an account yet?{' '}
						<Link className='text-black underline' to='/register'>
							Register now
						</Link>
					</div>
				</form>
			</div>
		</div>
	);
}
