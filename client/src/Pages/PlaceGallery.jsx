import { useState } from 'react';

export default function PlaceGallery({ place }) {
	const [showAll, setShowAll] = useState(false);
	return (
		<div className=' relative  lg:right-60 lg:px-60  overflow-x-hidden '>
			<div
				className='grid gap-2  grid-cols-[2fr_1fr] cursor-pointer mt-6 rounded-3xl overflow-hidden shadow-lg border'
				onClick={() => setShowAll(true)}
			>
				<div>
					{place.photos?.[0] && (
						<img
							className='cursor-pointer aspect-square lg:aspect-auto lg:min-h-full object-cover'
							src={
								'http://localhost:4000/uploads/' +
								place.photos[0]
							}
						></img>
					)}
				</div>
				<div className='grid gap-2 '>
					{place.photos?.[1] && (
						<img
							className=' cursor-pointer aspect-square lg:aspect-auto lg:min-h-full object-cover'
							src={
								'http://localhost:4000/uploads/' +
								place.photos[1]
							}
						></img>
					)}
					<div className='overflow-hidden relative '>
						{place.photos?.[2] && (
							<img
								className='cursor-pointer aspect-square lg:aspect-auto lg:min-h-full object-cover'
								src={
									'http://localhost:4000/uploads/' +
									place.photos[2]
								}
							></img>
						)}
						<div>
							<button
								onClick={() => {
									setShowAll(true);
								}}
								className='flex lg:gap-1 absolute lg:p-2 shadow shadow-gray-500 bg-white bottom-2 right-2 opacity-70  rounded-full'
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
										d='M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z'
									/>
								</svg>
								Show more
							</button>{' '}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
