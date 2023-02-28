import { Toolbar } from '@mui/material';
import { Box } from '@mui/system'
import { useState } from 'react';
import { NavBar, SideBar } from '../components';


const drawerWidth = 280;

export const JournalLayout = ({ children }) => {

  const [displayDrawer, setDisplayDrawer] = useState('none') // block/none

  return (
    <Box sx={{ display: 'flex', flexShrink: { sm: 0 } }}>

      <NavBar drawerWidth={drawerWidth} setDisplayDrawer={setDisplayDrawer} />

      <SideBar drawerWidth={drawerWidth} displayDrawer={displayDrawer} setDisplayDrawer={setDisplayDrawer} />

      <Box
        pl={drawerWidth}
        component='main'
        sx={{ flexGrow: 1, p: 3 }}
      >
        <Toolbar />

        {children}

      </Box>
    </Box>
  )
}
