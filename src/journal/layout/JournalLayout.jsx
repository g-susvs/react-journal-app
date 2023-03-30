import { Toolbar } from '@mui/material';
import { Box } from '@mui/system';
import { NavBar, SideBar } from '../components';

const drawerWidth = 280;

export const JournalLayout = ({ children }) => {
	return (
		<Box sx={{ display: 'flex', flexShrink: { sm: 0 } }}>
			<NavBar drawerWidth={drawerWidth} />

			<SideBar drawerWidth={drawerWidth} />

			<Box pl={drawerWidth} component='main' sx={{ flexGrow: 1, p: 3 }}>
				<Toolbar />

				{children}
			</Box>
		</Box>
	);
};
