import {
	Box,
	Divider,
	Drawer,
	Grid,
	IconButton,
	List,
	Toolbar,
	Typography,
} from '@mui/material';
import { CloseOutlined } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { setDisplayDrawer } from '../../store/drawer/drawerSlice';
import { SidebarListItem } from './SidebarListItem';

export const SideBar = ({ drawerWidth = 240 }) => {
	const { displayName } = useSelector(state => state.auth);
	const { notes } = useSelector(state => state.journal);
	const dispatch = useDispatch();
	const { displayDrawer } = useSelector(state => state.drawer);
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
					'& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
				}}
			>
				<Toolbar>
					<Grid
						container
						direction='row'
						justifyContent='flex-start'
						alignItems='center'
					>
						<IconButton
							sx={{ display: { sm: 'none' } }}
							onClick={() => dispatch(setDisplayDrawer('none'))}
						>
							<CloseOutlined />
						</IconButton>

						<Typography variant='h6' ml={1} noWrap component='div'>
							{displayName}
						</Typography>
					</Grid>
				</Toolbar>
				<Divider />

				<List>
					{notes.map(note => (
						<SidebarListItem key={note.id} {...note} />
					))}
				</List>
			</Drawer>
		</Box>
	);
};
