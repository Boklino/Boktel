import { useState } from 'react';
import { Link } from 'react-router-dom';

import Image from './Image';

export default function PlacePhoto({ place }) {
	const [swipe, setSwipe] = useState(0);
	const handleSwipe = (e) => {
		const name = e.target.getAttribute('name');

		if (name === 'swipeRight') {
			e.preventDefault();
			e.stopPropagation();

			setSwipe(swipe + 1);
		} else if (name === 'swipeLeft') {
			e.preventDefault();
			e.stopPropagation();

			setSwipe(swipe - 1);
		}
	};
	return (
		<div key={Math.random()}>
			<Link to={`/place/${place._id}`}>
				<div className='relative  bg-gray-500 rounded-2xl group'>
					{console.log(swipe < place.photos.length)}
					{place.photos[swipe] && (
						<Image
							className='mb-4 rounded-2xl overflow-hidden  aspect-square'
							src={place.photos[swipe]}
							alt='image of the place'
						/>
					)}
					{swipe < place.photos.length - 1 && (
						<div onClick={(e) => handleSwipe(e)} className=' w-10'>
							<svg
								name='swipeRight'
								xmlns='http://www.w3.org/2000/svg'
								viewBox='-1 0 20 20'
								fill='black'
								className='hidden border-transparent border-4 scale-125 group-hover:block w-6 h-6 absolute bottom-32 right-1 transform -translate-x-1/2 -translate-y-1/2 bg-gray-300 rounded-full'
							>
								<path
									fillRule='evenodd'
									d='M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z'
									clipRule='evenodd'
								/>
							</svg>
						</div>
					)}
					{swipe <= place.photos.length - 1 && swipe !== 0 && (
						<div onClick={(e) => handleSwipe(e)} className='w-10'>
							<svg
								name='swipeLeft'
								xmlns='http://www.w3.org/2000/svg'
								viewBox='0 0 20 20'
								fill='currentColor'
								className='hidden scale-125 border-transparent border-4 group-hover:block w-6 h-6  absolute bottom-32 left-6 transform -translate-x-1/2 -translate-y-1/2 bg-gray-300 rounded-full'
							>
								<path
									fillRule='evenodd'
									d='M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z'
									clipRule='evenodd'
								/>
							</svg>
						</div>
					)}
				</div>
				<h2 className='mt-2 font-bold'>{place.address}</h2>

				<h3 className=' text-sm text-gray-600'>{place.title}</h3>
				{place.price && (
					<p>
						<span className='font-bold'>${place.price}</span> per
						night
					</p>
				)}
			</Link>
		</div>
	);
}
