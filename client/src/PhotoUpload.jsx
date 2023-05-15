import axios from 'axios';
import { useState } from 'react';

export default function PhotoUpload({ addedPhotos, setAddedPhotos }) {
	const [photoLink, setPhotoLink] = useState('');

	const handleUpload = async (e) => {
		console.log('lol');
		const images = new FormData();
		let photos = e.target.files;
		console.log('z', photos);
		Object.values(photos).forEach((photo) => {
			images.append('photos', photo);
		});

		const { data } = await axios.post('/upload', images, {
			headers: {
				'Content-Type': 'multipart/form-data',
			},
		});
		console.log('lol', data);
		setAddedPhotos([...addedPhotos, ...data]);
	};

	async function addByLink(e) {
		e.preventDefault();
		setPhotoLink('');
		const { data } = await axios.post('/upload-link', { link: photoLink });

		setAddedPhotos([...addedPhotos, data]);
	}

	const handleRemove = (img) => {
		setAddedPhotos([...addedPhotos.filter((photo) => photo !== img)]);
	};

	const handleMainPic = (e, img) => {
		e.preventDefault();
		setAddedPhotos([img, ...addedPhotos.filter((photo) => photo !== img)]);
	};

	return (
		<div>
			<div className=' inline-flex w-full gap-2'>
				<input
					type='text'
					placeholder='Add your photos using a link'
					value={photoLink}
					onChange={(e) => setPhotoLink(e.target.value)}
				/>
				<button
					className='py-4 px-2 rounded-full bg-gray-400 inline-flex gap-1 '
					onClick={addByLink}
				>
					Add&nbsp;Photo
				</button>
			</div>
			<div className='grid grid-cols-2 md:grid-cols-3 mt-4 gap-3'>
				{addedPhotos.length > 0 &&
					addedPhotos.map((img) => {
						return (
							<div key={img} className='flex h-36 relative'>
								<img
									className='rounded-xl object-cover w-full'
									src={'http://localhost:4000/uploads/' + img}
									alt='img of the place'
								/>
								<button
									onClick={() => handleRemove(img)}
									className='absolute p-1 rounded-2xl bottom-1 right-1 text-white bg-black bg-opacity-40 cursor-pointer'
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
											d='M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0'
										/>
									</svg>
								</button>
								<button
									onClick={(e) => handleMainPic(e, img)}
									className='absolute p-1 rounded-2xl bottom-1 left-2 text-white bg-black bg-opacity-40 cursor-pointer'
								>
									{img === addedPhotos[0] && (
										<svg
											xmlns='http://www.w3.org/2000/svg'
											fill='white'
											viewBox='0 0 24 24'
											strokeWidth={1.5}
											stroke='currentColor'
											className='w-6 h-6'
										>
											<path
												strokeLinecap='round'
												strokeLinejoin='round'
												d='M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z'
											/>
										</svg>
									)}
									{img !== addedPhotos[0] && (
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
												d='M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z'
											/>
										</svg>
									)}
								</button>
							</div>
						);
					})}
			</div>
			<div>
				<label className='py-2 px-4 text-lg rounded-full bg-primary inline-flex gap-1 mt-6 text-white cursor-pointer '>
					<input
						type='file'
						className='hidden'
						onChange={handleUpload}
						multiple
					/>
					<svg
						xmlns='http://www.w3.org/2000/svg'
						fill='none'
						viewBox='0 0 24 24'
						strokeWidth={1.5}
						stroke='currentColor'
						className='w-6 h-6 mt-1'
					>
						<path
							strokeLinecap='round'
							strokeLinejoin='round'
							d='M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z'
						/>
					</svg>
					Upload From Device
				</label>
			</div>
		</div>
	);
}
