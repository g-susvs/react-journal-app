import { useEffect, useMemo, useRef } from 'react';

import { Delete, SaveOutlined, Upload } from '@mui/icons-material';
import { Button, Grid, IconButton, TextField, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';

import { useForm } from '../../hooks/useForm';
import { startDeletingNote, startSavingNote, startUploadingFile } from '../../store/journal';
import { setActiveNote } from '../../store/journal';
import { ImageGallery } from '../components'


export const NoteView = () => {

    const dispatch = useDispatch()
    const { active: note, messageSaved, isSaving } = useSelector(state => state.journal)
    const { title, body, imgsURL, date, onInputChange, formState } = useForm(note)

    const dateString = useMemo(() => {
        const newDate = new Date(date).toUTCString()
        return newDate
    }, [date])

    const fileInputRef = useRef()

    useEffect(() => {

        dispatch(setActiveNote(formState))

    }, [formState])

    useEffect(() => {


        if (messageSaved.length > 0) {
            Swal.fire('Nota actualizada', messageSaved, 'success')
        }

    }, [messageSaved])


    const onSavingNote = () => {
        dispatch(startSavingNote())
    }

    const onFileInputChange = ({ target }) => {
        // console.log(target.files)
        dispatch(startUploadingFile(target.files))
    }

    const onDeleteNote = () => {
        dispatch(startDeletingNote())
    }

    return (
        <Grid container direction='row' justifyContent='space-between' alignItems='center' sx={{ mb: 1 }}>
            <Grid item>
                <Typography fontSize={39} fontWeight='light' >{dateString}</Typography>
            </Grid>
            <Grid item>
                <input
                    type="file"
                    ref={fileInputRef}
                    multiple
                    onChange={onFileInputChange}
                    style={{ display: 'none' }}
                />
                <IconButton disabled={isSaving} onClick={() => fileInputRef.current.click()}>
                    <Upload color='primary' />
                </IconButton>
            </Grid>
            <Grid item>
                <Button disabled={isSaving} color="primary" sx={{ padding: 2 }} onClick={onSavingNote}>
                    <SaveOutlined sx={{ fontSize: 30, mr: 1 }} />
                    Guardar
                </Button>
            </Grid>

            <Grid container>
                <TextField
                    type="text"
                    variant="filled"
                    fullWidth
                    placeholder="Ingrese un título"
                    label="Título"
                    name="title"
                    value={title}
                    onChange={onInputChange}
                    sx={{ border: 'none', mb: 1 }}
                />

                <TextField
                    type="text"
                    variant="filled"
                    fullWidth
                    name="body"
                    value={body}
                    onChange={onInputChange}
                    multiline
                    placeholder="¿Qué sucedió en el día de hoy?"
                    minRows={5}
                />
            </Grid>
            <Grid container justifyContent="end">
                <Button 
                color="error" 
                onClick={onDeleteNote}
                >
                    <Delete />
                    Borrar
                </Button>
            </Grid>

            {/* Image gallery */}
            <ImageGallery images={note.imgsURL} />

        </Grid>
    )
}
