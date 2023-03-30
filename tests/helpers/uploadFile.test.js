import 'setimmediate'
import { v2 as cloudinary } from 'cloudinary'
import { uploadFile } from "../../src/helpers/uploadFile"

cloudinary.config({
    cloud_name: 'g-projects',
    api_key: '815553485395848',
    api_secret: 'kIao3x94Sxp6aeeK9f_3YibzEQs',
    secure: true
})

describe('Pruebas en uploadFile', () => {

    test('debe de subir el archivo correctamente a cloudinary', async () => {

        const imgUrl = 'https://cdn.pixabay.com/photo/2012/08/27/14/19/mountains-55067__340.png'
        const resp = await fetch(imgUrl)
        const blob = await resp.blob() // obtengo los bytes
        const file = new File([blob], 'foto.png')

        const url = await uploadFile(file)
        expect(typeof url).toBe('string')

        const segments = url.split('/')
        const imgId = ((segments[segments.length - 1]).split('.'))[0]
        // console.log(imgId)
        await cloudinary.api.delete_resources(['journal/' + imgId], {
            resource_type: 'image'
        })
        // console.log(cloudResp)
    })
    test('debe de retornar null', async () => {
        const file = new File([], 'foto.png')

        const url = await uploadFile(file)
        expect(url).toBe(null)
    })

})