import './App.css';
import IndexPage from './Pages/IndexPage';
import LoginPage from './Pages/LoginPage';
import { Route, Routes } from 'react-router';
import Layout from './Layout';
import RegisterPage from './Pages/RegisterPage';
import axios from 'axios';
import { UserContextProvider } from './UserContext';
import AccountPage from './Pages/AccountPage';
import PlacesPage from './Pages/PlacesPage';
import BookingsPage from './Pages/BookingsPage';
import PlacesFormPage from './Pages/PlacesFormPage';
import PlacePage from './Pages/PlacePage';
import BookingPage from './Pages/BookingPage';

axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL;

axios.defaults.withCredentials = true;
function App() {
	return (
		<UserContextProvider>
			<Routes>
				<Route path='/' element={<Layout />}>
					<Route index element={<IndexPage />} />
					<Route path='/login' element={<LoginPage />} />
					<Route path='/register' element={<RegisterPage />} />
					<Route path='/account' element={<AccountPage />} />
					<Route path='/account/places' element={<PlacesPage />} />
					<Route
						path='/account/bookings'
						element={<BookingsPage />}
					/>
					<Route
						path='/account/bookings/:id'
						element={<BookingPage />}
					/>
					<Route
						path='/account/places/new'
						element={<PlacesFormPage />}
					/>
					<Route
						path='/account/places/:id'
						element={<PlacesFormPage />}
					/>
				</Route>
				<Route path='/place/:id' element={<PlacePage />} />
			</Routes>
		</UserContextProvider>
	);
}

export default App;
