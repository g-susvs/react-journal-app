import { AppBar, Grid, IconButton, Toolbar, Typography } from '@mui/material';
import { LogoutOutlined, MenuOutlined } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { setDisplayDrawer } from '../../store/drawer/drawerSlice';
import { startLogout } from '../../store/auth';

export const NavBar = ({ drawerWidth = 240 }) => {
    const dispatch = useDispatch()
    const {displayDrawer} = useSelector( state => state.drawer)

    const onLogout = () => {
        dispatch(startLogout())
    }

    return (
        <AppBar
            position='fixed'
            sx={{
                width: { sm: `calc(100% - ${drawerWidth}px)` },
                ml: { sm: `${drawerWidth}px` }
            }}
        >
            <Toolbar>
                <IconButton
                    color='inherit'
                    edge="start"
                    sx={{ mr: 2, display: { sm: displayDrawer } }}
                    onClick={() => dispatch(setDisplayDrawer('block'))}
                >
                    <MenuOutlined />
                </IconButton>

                <Grid container direction='row' justifyContent='space-between' alignItems='center'>
                    <Typography variant='h6' noWrap component='div'> JournalApp </Typography>
                        <IconButton color='error' onClick={onLogout}>
                            <LogoutOutlined />
                        </IconButton>
                </Grid>

            </Toolbar>
        </AppBar>
    )
}
