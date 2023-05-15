import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import AccountNav from '../AccountNav';

export default function PlacesPage() {
	const [places, setPlaces] = useState([]);

	useEffect(() => {
		axios.get('/user-places').then(({ data }) => {
			setPlaces(data);
		});
	}, []);

	return (
		<div>
			<AccountNav />
			<div className='text-center flex justify-center'>
				<Link
					className='py-2 px-4 bg-primary rounded-full text-white inline-flex gap-1 mt-4 '
					to={'/account/places/new'}
				>
					<svg
						xmlns='http://www.w3.org/2000/svg'
						fill='none'
						viewBox='0 0 24 24'
						strokeWidth={1.5}
						stroke='currentColor'
						className='w-6 h-6'
					>
						<path
							strokeLinecap='round'
							strokeLinejoin='round'
							d='M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z'
						/>
					</svg>
					Add new place
				</Link>
			</div>

			<div className='mt-6  gap-4'>
				{places.length > 0 &&
					places.map((place) => (
						<div className='gap-4  p-4 relative'>
							<Link
								to={'/account/places/' + place._id}
								className=' p-4 bg-gray-300 rounded-2xl flex gap-4'
							>
								<div className='flex bg-gray-400 w-32 h-32 shrink-0'>
									{place.photos.length > 0 && (
										<img
											src={
												'http://localhost:4000/uploads/' +
												place.photos[0]
											}
											alt='photo of the place'
										/>
									)}
								</div>
								<div className='gap-4'>
									<h2 className=' text-lg'>{place.title}</h2>
									<p className=' text-sm mt-2'>
										{place.description}
									</p>
								</div>
								<div className='bottom-6 right-8 opacity-50 text-white absolute rounded-2xl px-2 py-2  bg-gray-900 font-semibold hover:scale-110'>
									Edit
								</div>
							</Link>
						</div>
					))}
			</div>
		</div>
	);
}
