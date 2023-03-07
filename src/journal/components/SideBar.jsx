import { Box, Divider, Drawer, Grid, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography } from '@mui/material'
import { TurnedInNot, CloseOutlined } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { setDisplayDrawer } from '../../store/drawer/drawerSlice';

export const SideBar = ({ drawerWidth = 240 }) => {

    const { displayName } = useSelector(state => state.auth)
    const dispatch = useDispatch()
    const { displayDrawer } = useSelector(state => state.drawer)
    return (
        <Box
            component='nav'
            sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        >
            <Drawer
                variant='permanent' // temporary
                open
                sx={{
                    display: { sm: 'block', xs: displayDrawer },
                    '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth }
                }}
            >
                <Toolbar>
                    <Grid container direction='row' justifyContent='flex-start' alignItems='center'>

                        <IconButton
                            sx={{ display: { sm: 'none' } }}
                            onClick={() => dispatch(setDisplayDrawer('none'))}>
                            <CloseOutlined />
                        </IconButton>

                        <Typography variant='h6' ml={1} noWrap component='div'>
                            {displayName}
                        </Typography>
                    </Grid>
                </Toolbar>
                <Divider />

                <List>
                    {
                        ['Enero', 'Febrero', 'Marzo', 'Abril'].map(text => (
                            <ListItem key={text} disablePadding>
                                <ListItemButton>
                                    <ListItemIcon>
                                        <TurnedInNot />
                                    </ListItemIcon>
                                    <Grid container>
                                        <ListItemText primary={text} />
                                        <ListItemText secondary={'Exercitation cillum irure elit consectetur.'} />
                                    </Grid>
                                </ListItemButton>
                            </ListItem>
                        ))
                    }
                </List>

            </Drawer>

        </Box>
    )
}
