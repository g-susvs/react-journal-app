export const uploadFile = async (file) => {

    const formData = new FormData()

    formData.append('upload_preset', 'react-journal')
    formData.append('file', file)

    const cloudUrl = 'https://api.cloudinary.com/v1_1/react-journal/upload?api_key=815553485395848'

    try {

        const resp = await fetch(cloudUrl, {
            method: 'POST',
            body: formData
        })

        console.log(resp)
        if(!resp.ok) throw new Error('No se pudo subir la imagen')

        const cloudResp = await resp.json()

        return cloudResp.secure_url

    } catch (error) {
        console.log(error)
        throw new Error(error.message)
    }
}