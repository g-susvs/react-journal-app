import { TurnedInNot } from '@mui/icons-material';
import {
	Grid,
	ListItem,
	ListItemButton,
	ListItemIcon,
	ListItemText,
} from '@mui/material';
import { memo, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { setActiveNote } from '../../store/journal';

export const SidebarListItem = memo(
	({ id, title, body, date, imgsURL = [] }) => {
		const dispatch = useDispatch();

		const newTitle = useMemo(
			() => (title.length > 17 ? title.substring(0, 17) + '...' : title),
			[title]
		);
		const newBody = useMemo(
			() => (body.length > 100 ? body.substring(0, 100) + '...' : body),
			[body]
		);

		const onActiveNote = () => {
			dispatch(setActiveNote({ id, title, body, date, imgsURL }));
		};

		return (
			<ListItem disablePadding onClick={onActiveNote}>
				<ListItemButton>
					<ListItemIcon>
						<TurnedInNot />
					</ListItemIcon>
					<Grid container>
						<ListItemText primary={newTitle} />
						<ListItemText secondary={newBody} />
					</Grid>
				</ListItemButton>
			</ListItem>
		);
	}
);
