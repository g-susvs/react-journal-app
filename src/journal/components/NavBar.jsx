import { AppBar, Grid, IconButton, Toolbar, Typography, Link } from '@mui/material';
import { LogoutOutlined, MenuOutlined } from '@mui/icons-material';
import { Link as RouterLink } from "react-router-dom";

export const NavBar = ({ drawerWidth = 240, setDisplayDrawer }) => {
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
                    sx={{ mr: 2, display: { sm: 'none' } }}
                    onClick={() => setDisplayDrawer('block')}
                >
                    <MenuOutlined />
                </IconButton>

                <Grid container direction='row' justifyContent='space-between' alignItems='center'>
                    <Typography variant='h6' noWrap component='div'> JournalApp </Typography>
                    <Link component={RouterLink} to='/auth/login'>
                        <IconButton color='error'>
                            <LogoutOutlined />
                        </IconButton>
                    </Link>
                </Grid>

            </Toolbar>
        </AppBar>
    )
}
