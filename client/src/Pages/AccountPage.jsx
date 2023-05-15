import axios from 'axios';
import { useContext } from 'react';
import { Navigate, useNavigate } from 'react-router';
import AccountNav from '../AccountNav';
import { UserContext } from '../UserContext';

export default function AccountPage() {
	const navigate = useNavigate();

	const { user, ready, setUser } = useContext(UserContext);

	if (user === null) {
		return '...Loading';
	}
	if (ready && !user) {
		return <Navigate to='/login' />;
	}

	const handleLogout = async () => {
		await axios.post('/logout');
		setUser(null);
		navigate('/');
	};

	return (
		<div>
			<AccountNav />

			<div className=' max-w-lg mx-auto text-center'>
				You are logged in as {user?.name} ({user?.email})<br />
				<button
					className='primary  max-w-sm mt-2 rounded full px-4 py-2'
					onClick={handleLogout}
				>
					Logout
				</button>
			</div>
		</div>
	);
}
