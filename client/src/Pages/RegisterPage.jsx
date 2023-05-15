import axios from 'axios';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

export default function RegisterPage() {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const navigate = useNavigate();
	const handleRegister = async (e) => {
		e.preventDefault();

		try {
			await axios.post('/register', {
				name,
				email,
				password,
			});
			Swal.fire({
				title: 'You have successfully registered',
				showCancelButton: true,
				confirmButtonText: 'Login',
			}).then((result) => {
				if (result.isConfirmed) {
					navigate('/login');
				}
			});
		} catch (ex) {
			Swal.fire('Email Already in use');
		}
	};
	return (
		<div className='mt-4 min-h-screen flex flex-col items-center justify-around'>
			<div className=' mb-48'>
				<h1 className=' text-4xl text-center mb-4'>Register</h1>
				<form className=' max-w-md mx-auto ' onSubmit={handleRegister}>
					<input
						type='text'
						placeholder='John Doe'
						onChange={(e) => setName(e.target.value)}
					/>
					<input
						type='email'
						placeholder='your@email.com'
						onChange={(e) => setEmail(e.target.value)}
					/>
					<input
						type='password'
						placeholder='password'
						onChange={(e) => setPassword(e.target.value)}
					/>
					<button className='primary'>Register</button>
					<div className='text-center text-gray-500'>
						Already have an account?{' '}
						<Link className='text-black underline' to='/login'>
							Login
						</Link>
					</div>
				</form>
			</div>
		</div>
	);
}
