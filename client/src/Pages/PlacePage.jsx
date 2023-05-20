import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import BookingWidget from '../BookingWidget';

import Header from '../Header';
import Image from '../Image';

export default function PlacePage() {
	const { id } = useParams();
	const [place, setPlace] = useState([]);
	const [showAll, setShowAll] = useState(false);

	useEffect(() => {
		if (!id) {
			return;
		}
		axios.get(`/places/${id}`).then((res) => {
			setPlace(res.data);
		});
	}, [id]);
	return (
		<div className='relative '>
			{!showAll && (
				<div className=' overflow-x-hidden  px-32'>
					<div className=' pt-2 px-4 mt-2 flex flex-col '>
						<Header />
					</div>
					<div className='mt-4 bg-gray-100 -mx-32 px-36 pt-8 '>
						<h1 className=' text-2xl'>{place.title}</h1>
						<a
							href={`https://www.google.com/maps/?q=${place.address}`}
							target='_blank'
							className='flex gap-1 my-2 underline font-semibold w-fit'
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
									d='M15 10.5a3 3 0 11-6 0 3 3 0 016 0z'
								/>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									d='M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z'
								/>
							</svg>
							{place.address}
						</a>{' '}
						<div className='text-2xl'>
							Hosted by {place?.owner?.name}
						</div>
						<div className=' relative max-w-3xl overflow-x-hidden '>
							<div
								className='grid gap-2  grid-cols-[2fr_1fr] cursor-pointer mt-4 rounded-3xl overflow-hidden shadow-lg border'
								onClick={() => setShowAll(true)}
							>
								<div>
									{place.photos?.[0] && (
										<Image
											className='cursor-pointer aspect-square lg:aspect-auto lg:min-h-full object-cover'
											src={place.photos[0]}
										/>
									)}
								</div>
								<div className='grid gap-2 '>
									{place.photos?.[1] && (
										<Image
											className=' cursor-pointer aspect-square lg:aspect-auto lg:min-h-full object-cover'
											src={place.photos[1]}
										/>
									)}
									<div className='overflow-hidden relative '>
										{place.photos?.[2] && (
											<Image
												className='cursor-pointer aspect-square lg:aspect-auto lg:min-h-full object-cover'
												src={place.photos[2]}
											/>
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
						<div className='grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-8 mt-12  '>
							<div>
								<div className=''>
									<h2 className='font-semibold text-2xl  '>
										Description
									</h2>
									<p className='mt-4'>{place.description}</p>
								</div>
								<div className='mt-8'>
									{' '}
									Check-in: {place.checkIn}
									<br />
									Check-out: {place.checkOut}
									<br />
									Max number of guests: {place.maxGuests}
								</div>
							</div>
							<BookingWidget place={place} />
						</div>
						<div className=' bg-white -mx-32 px-32 pb-10 py-4 mt-6 border-t  '>
							<h2 className='font-semibold text-2xl  mt-6 '>
								Extra info
							</h2>
							<div className=' text-gray-700  text-md mt-2  '>
								{place.extraInfo}
							</div>
						</div>
					</div>{' '}
				</div>
			)}
			{showAll && (
				<div className='absolute -inset-14  bg-white '>
					<div className='absolute left-44  p-8 grid grid-cols-1 items-center  gap-2'>
						<h1 className='text-2xl mt-12 mb-4'>
							Photos of {place.title}
						</h1>
						<div>
							<button
								onClick={() => {
									setShowAll(false);
								}}
								className='fixed left-6 top-5 flex gap-1 rounded-full hover:bg-gray-100 hover:scale-110  shadow-md'
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
										d='M12 9.75L14.25 12m0 0l2.25 2.25M14.25 12l2.25-2.25M14.25 12L12 14.25m-2.58 4.92l-6.375-6.375a1.125 1.125 0 010-1.59L9.42 4.83c.211-.211.498-.33.796-.33H19.5a2.25 2.25 0 012.25 2.25v10.5a2.25 2.25 0 01-2.25 2.25h-9.284c-.298 0-.585-.119-.796-.33z'
									/>
								</svg>
							</button>
						</div>
						{place?.photos?.length > 0 &&
							place.photos.map((photo) => (
								<Image className='min-w-full' src={photo} />
							))}
					</div>
				</div>
			)}
		</div>
	);
}
