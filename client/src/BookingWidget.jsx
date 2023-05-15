import { useContext, useEffect, useState } from 'react';
import { differenceInCalendarDays } from 'date-fns';
import axios from 'axios';
import { useNavigate } from 'react-router';
import { UserContext } from './UserContext';
export default function BookingWidget({ place }) {
	const navigate = useNavigate();
	const [checkIn, setCheckIn] = useState('');
	const [checkOut, setCheckOut] = useState('');
	const [maxGuests, setMaxGuests] = useState(1);
	const { user } = useContext(UserContext);
	const [name, setName] = useState('');
	const [number, setNumber] = useState('');

	useEffect(() => {
		if (user) setName(user.name);
	}, [name]);

	let numberofNights = 0;
	if (checkIn && checkOut) {
		numberofNights = differenceInCalendarDays(
			new Date(checkOut),
			new Date(checkIn)
		);
	}

	const handleBooking = async () => {
		const placeInfo = await axios.post('/bookings', {
			checkIn,
			checkOut,
			maxGuests,
			number,
			name,
			place: place._id,
			price: numberofNights * place.price,
		});
		const id = placeInfo.data._id;
		console.log(id);
		navigate(`/account/bookings/${id}`);
	};

	return (
		<div className=' overflow-hidden '>
			<div className=' bg-white shadow-xl border rounded-2xl p-4'>
				<p className=' text-xl text-center'>
					Price: ${place.price} / per night
				</p>
				<div className=' rounded-xl mt-4'>
					<div className='flex flex-col md:flex-row py-2 px-4'>
						<div>
							<label>Check-in: </label>
							<input
								type='date'
								value={checkIn}
								onChange={(e) => {
									setCheckIn(e.target.value);
								}}
							></input>
						</div>
						<div className=' md:border-l'>
							<div className=' '>
								<label> Check-out: </label>
								<input
									type='date'
									value={checkOut}
									onChange={(e) => {
										setCheckOut(e.target.value);
									}}
								></input>
							</div>
						</div>
					</div>
					<div className=' border-t mt-2  py-2 px-4'>
						<label>Number of Guests:</label>
						<input
							type='number'
							value={maxGuests}
							onChange={(e) => {
								setMaxGuests(e.target.value);
							}}
						></input>
					</div>
					<div className=' py-2 px-4'>
						{numberofNights > 0 && (
							<div>
								<label>Full Name:</label>
								<input
									type='text'
									value={name}
									onChange={(e) => setName(e.target.value)}
								/>
								<div className='mt-3'>
									<label>Phone Number:</label>
									<input
										type='tel'
										value={number}
										onChange={(e) =>
											setNumber(e.target.value)
										}
									/>
								</div>
							</div>
						)}
					</div>
					<button onClick={handleBooking} className='primary'>
						Book This Place
						{numberofNights > 0 && (
							<span> ${numberofNights * place.price}</span>
						)}
					</button>
				</div>
			</div>
		</div>
	);
}
