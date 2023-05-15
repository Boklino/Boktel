import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import Perks from '../Perks';
import PhotoUpload from '../PhotoUpload';

export default function PlacesFormPage() {
	const { id } = useParams();
	const [title, setTitle] = useState('');
	const [address, setAddress] = useState('');
	const [addedPhotos, setAddedPhotos] = useState([]);
	const [description, setDescription] = useState('');
	const [perks, setPerks] = useState([]);
	const [extraInfo, setExtraInfo] = useState('');
	const [checkIn, setCheckIn] = useState('');
	const [checkOut, setCheckOut] = useState('');
	const [maxGuests, setMaxGuests] = useState(1);
	const [price, setPrice] = useState(100);
	const navigate = useNavigate();

	useEffect(() => {
		if (!id) {
			return;
		}
		axios.get('/places/' + id).then((res) => {
			const { data } = res;

			setTitle(data.title);
			setAddress(data.address);
			setAddedPhotos(data.photos);
			setDescription(data.description);
			setPerks(data.perks);
			setExtraInfo(data.extraInfo);
			setCheckIn(data.checkIn);
			setCheckOut(data.checkOut);
			setMaxGuests(data.maxGuests);
			setPrice(data.price);
		});
	}, [id]);

	function inputHeader(text) {
		return <h2 className=' text-2xl mt-4'>{text}</h2>;
	}

	function inputDescription(text) {
		return <p className=' text-gray-500 text-sm'>{text}</p>;
	}

	function preInput(header, description) {
		return (
			<div>
				{inputHeader(header)}
				{inputDescription(description)}
			</div>
		);
	}

	async function handleSubmission(e) {
		e.preventDefault();
		const placeData = {
			title,
			address,
			addedPhotos,
			description,
			perks,
			extraInfo,
			checkIn,
			checkOut,
			maxGuests,
			price,
		};
		if (id) {
			await axios.put('/places', { id, ...placeData });
			navigate('/account/places');
		} else {
			await axios.post('/places', placeData);

			navigate('/account/places');
		}
	}

	return (
		<div>
			<form onSubmit={handleSubmission}>
				{preInput(
					'Title',
					'Title for your place, make it short and meaningful'
				)}

				<input
					type='text'
					placeholder='title, for example: my apartment'
					value={title}
					onChange={(e) => setTitle(e.target.value)}
				/>
				{preInput('Address', 'Address of your place')}

				<input
					type='text'
					placeholder='Address'
					value={address}
					onChange={(e) => setAddress(e.target.value)}
				/>
				{preInput('Photos', 'Upload some photos of your place')}
				<PhotoUpload
					addedPhotos={addedPhotos}
					setAddedPhotos={setAddedPhotos}
				/>
				<div>
					{preInput(
						'Description',
						'Add description of your place here'
					)}

					<textarea
						className='py-2 h-36 mt-4'
						value={description}
						onChange={(e) => setDescription(e.target.value)}
					/>
				</div>
				<div>
					{preInput('Perks', 'Select All the perks of your place')}

					<Perks perks={perks} setPerks={setPerks} />
					{preInput(
						'Extra Info',
						'Add any extra info you want like house rules'
					)}

					<textarea
						className='py-4 h-32 mt-4'
						value={extraInfo}
						onChange={(e) => setExtraInfo(e.target.value)}
					/>
					{preInput(
						'Check-In & Check-Out',
						'Remember to add window to have time fo cleaning'
					)}

					<div className='grid grid-cols-2 md:grid-cols-4 gap-3 mt-4'>
						<div>
							<h3>Check in time</h3>
							<input
								type='text'
								value={checkIn}
								onChange={(e) => setCheckIn(e.target.value)}
							/>
						</div>
						<div>
							<h3>Check out time</h3>
							<input
								type='text'
								value={checkOut}
								onChange={(e) => setCheckOut(e.target.value)}
							/>
						</div>
						<div>
							<h3>Max Guests</h3>
							<input
								type='number'
								value={maxGuests}
								onChange={(e) => setMaxGuests(e.target.value)}
							/>
						</div>
						<div>
							<h3>Price per night</h3>
							<input
								type='number'
								value={price}
								onChange={(e) => setPrice(e.target.value)}
							/>
						</div>
					</div>
				</div>
				<button className='secondary'>Save</button>
			</form>
		</div>
	);
}
