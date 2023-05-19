export default function Image({ src, ...rest }) {
	console.log(src);
	src =
		src && src.includes('cloudinary')
			? src
			: 'http://localhost:4000/uploads/' + src;

	return <img {...rest} src={src} />;
}
