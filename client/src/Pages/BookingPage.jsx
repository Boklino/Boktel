import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import PlaceGallery from './PlaceGallery';
import { differenceInCalendarDays, format } from 'date-fns';

export default function BookingPage() {
	const { id } = useParams();
	const [booking, setBooking] = useState();
	const [showAll, setShowAll] = useState(false);
	useEffect(() => {
		axios
			.get('/bookings')
			.then((res) => setBooking(res.data.find(({ _id }) => _id === id)));
	}, [id]);

	return (
		<div className='relative '>
			{!showAll && booking && (
				<div className=' overflow-x-hidden -mx-8 px-8'>
					<div className='mt-4 bg-gray-100 -mx-32 px-32 pt-8 '>
						<h1 className=' text-2xl'>{booking.place.title}</h1>
						<a
							href={`https://www.google.com/maps/?q=${booking.place.address}`}
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
							{booking.place.address}
						</a>
						<div className=' bg-gray-300 p-8 rounded-2xl mt-6 mb-4'>
							<h2 className=' text-2xl mb-4'>
								Your booking info
							</h2>
							<div className=' text-md mt-7 flex gap-3 items-center'>
								<div className='flex gap-1'>
									<svg
										xmlns='http://www.w3.org/2000/svg'
										fill='none'
										viewBox='0 0 24 24'
										strokeWidth={1.5}
										stroke='currentColor'
										className='w-6 h-6 gap-2'
									>
										<path
											strokeLinecap='round'
											strokeLinejoin='round'
											d='M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z'
										/>
									</svg>
									{differenceInCalendarDays(
										new Date(booking.checkOut),
										new Date(booking.checkIn)
									)}{' '}
									Nights
								</div>

								<div className='flex gap-1 font-bold  '>
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
											d='M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
										/>
									</svg>
									Total Price: ${booking.price}
								</div>
								<div className='flex gap-1'>
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
											d='M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5'
										/>
									</svg>
									{format(
										new Date(booking.checkIn),
										'yyyy-MM-dd'
									)}
									{'  '}
									&rarr;
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
											d='M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5'
										/>
									</svg>
									{format(
										new Date(booking.checkOut),
										'yyyy-MM-dd'
									)}
								</div>
							</div>
						</div>

						<div className=' relative  lg:right-60 lg:px-60  overflow-x-hidden '>
							<div
								className='grid gap-2  grid-cols-[2fr_1fr] cursor-pointer mt-3 rounded-3xl overflow-hidden shadow-lg border'
								onClick={() => setShowAll(true)}
							>
								<div>
									{booking.place.photos?.[0] && (
										<img
											className='cursor-pointer aspect-square lg:aspect-auto lg:min-h-full object-cover'
											src={
												'http://localhost:4000/uploads/' +
												booking.place.photos[0]
											}
										></img>
									)}
								</div>
								<div className='grid gap-2 '>
									{booking.place.photos?.[1] && (
										<img
											className=' cursor-pointer aspect-square lg:aspect-auto lg:min-h-full object-cover'
											src={
												'http://localhost:4000/uploads/' +
												booking.place.photos[1]
											}
										></img>
									)}
									<div className='overflow-hidden relative '>
										{booking.place.photos?.[2] && (
											<img
												className='cursor-pointer aspect-square lg:aspect-auto lg:min-h-full object-cover'
												src={
													'http://localhost:4000/uploads/' +
													booking.place.photos[2]
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
					</div>{' '}
				</div>
			)}
			{showAll && (
				<div className='absolute -inset-14  bg-white '>
					<div className='absolute left-44  p-8 grid grid-cols-1 items-center  gap-2'>
						<h1 className='text-2xl'>
							Photos of {booking.place.title}
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
						{booking.place?.photos?.length > 0 &&
							booking.place.photos.map((photo) => (
								<img
									className='min-w-full'
									src={
										'http://localhost:4000/uploads/' + photo
									}
								></img>
							))}
					</div>
				</div>
			)}
		</div>
	);
}
