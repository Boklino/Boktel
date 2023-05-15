import { useEffect, useState } from 'react';
import axios from 'axios';
import PlacePhoto from '../PlacePhoto';

export default function IndexPage() {
	const [places, setPlaces] = useState([]);

	useEffect(() => {
		axios.get('/places').then((res) => {
			setPlaces(res.data);
		});
	}, []);

	return (
		<div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 pt-12 mt-4 border-t'>
			{places.length > 0 &&
				places.map((place) => <PlacePhoto place={place} />)}
		</div>
	);
}
