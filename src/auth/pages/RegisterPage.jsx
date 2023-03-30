import { Link as RouterLink } from 'react-router-dom';
import {
	Alert,
	Button,
	Grid,
	Link,
	TextField,
	Typography,
} from '@mui/material';
import { AuthLayout } from '../layout/AuthLayout';
import { useForm } from '../../hooks/useForm';
import { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { startCreatingUserWithEmailPassword } from '../../store/auth/thunks';

const formData = {
	email: '',
	password: '',
	displayName: '',
};

const formValidations = {
	email: [value => value.includes('@'), 'El email debe de tener @'],
	password: [
		value => value.length >= 6,
		'La contraseña debe tener 6 carateres',
	],
	displayName: [value => value.length >= 1, 'El nombre es obligatorio'],
};

export const RegisterPage = () => {
	const [formSubmitted, setFormSubmitted] = useState(false);

	const dispatch = useDispatch();
	const { status, errorMessage } = useSelector(state => state.auth);

	const isCheckingAuthentication = useMemo(
		() => status === 'checking',
		[status]
	);

	const {
		displayName,
		email,
		password,
		onInputChange,
		isFormValid,
		emailValid,
		passwordValid,
		displayNameValid,
	} = useForm(formData, formValidations);

	const onSubmit = event => {
		event.preventDefault();
		setFormSubmitted(true);

		if (!isFormValid) return;

		dispatch(
			startCreatingUserWithEmailPassword({ email, password, displayName })
		);
	};

	return (
		<AuthLayout title='Crear cuenta'>
			{/* <h1>FormValid: {isFormValid ? 'Valido' : 'Incorrecto'}</h1> */}
			<form
				onSubmit={onSubmit}
				className='animate__animated animate__fadeIn animate__faster'
			>
				<Grid container>
					<Grid item xs={12} sx={{ mt: 2 }}>
						<TextField
							label='Nombre completo'
							type='text'
							placeholder='Nombre completo'
							name='displayName'
							value={displayName}
							onChange={onInputChange}
							error={!!displayNameValid && formSubmitted}
							helperText={formSubmitted ? displayNameValid : null}
							fullWidth
						/>
					</Grid>

					<Grid item xs={12} sx={{ mt: 2 }}>
						<TextField
							label='Correo'
							type='email'
							placeholder='correo@google.com'
							name='email'
							value={email}
							onChange={onInputChange}
							error={!!emailValid && formSubmitted}
							helperText={formSubmitted ? emailValid : null}
							fullWidth
						/>
					</Grid>

					<Grid item xs={12} sx={{ mt: 2 }}>
						<TextField
							label='Contraseña'
							type='password'
							placeholder='Contraseña'
							name='password'
							value={password}
							onChange={onInputChange}
							error={!!passwordValid && formSubmitted}
							helperText={formSubmitted ? passwordValid : null}
							fullWidth
						/>
					</Grid>

					<Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>
						<Grid item xs={12} sx={{ display: errorMessage ? '' : 'none' }}>
							<Alert severity='error'>{errorMessage}</Alert>
						</Grid>
						<Grid item xs={12}>
							<Button
								type='submit'
								variant='contained'
								disabled={isCheckingAuthentication}
								fullWidth
							>
								Crear cuenta
							</Button>
						</Grid>
					</Grid>

					<Grid container direction='row' justifyContent='end'>
						<Typography sx={{ mr: 1 }}>¿Ya tienes cuenta?</Typography>
						<Link component={RouterLink} color='inherit' to='/auth/login'>
							ingresar
						</Link>
					</Grid>
				</Grid>
			</form>
		</AuthLayout>
	);
};
