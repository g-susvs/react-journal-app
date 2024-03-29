export const uploadFile = async file => {
	if (!file) throw new Error('No tenemos ningun archivo a subir');

	const cloudUrl =
		'https://api.cloudinary.com/v1_1/react-journal/upload?api_key=815553485395848';

	const formData = new FormData();
	formData.append('upload_preset', 'react-journal');
	formData.append('file', file);

	try {
		const resp = await fetch(cloudUrl, {
			method: 'POST',
			body: formData,
		});

		if (!resp.ok) throw new Error('No se pudo subir la imagen');
		const cloudResp = await resp.json();

		return cloudResp.secure_url;
	} catch (error) {
		// console.log(error.message)
		// throw new Error(error.message)
		return null;
	}
};
