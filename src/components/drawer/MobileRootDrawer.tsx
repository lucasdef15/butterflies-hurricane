import * as React from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import { Stack } from '@mui/material';
import { FaBloggerB } from 'react-icons/fa';
import { BiSolidDashboard } from 'react-icons/bi';
import SwitchTheme from '../switches/SwitchTheme';
import AccountMenu from '../accountMenu/AccountMenu';

export default function MobileRootDrawer() {
  const [value, setValue] = React.useState(0);

  return (
    <Box
      sx={{
        width: '100vw',
        position: 'fixed',
        bottom: 0,
        display: { xs: 'flex', sm: 'none' },
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#090E14',
        color: '#fff',
      }}
    >
      <BottomNavigation
        showLabels
        value={value}
        sx={{ flex: 1, backgroundColor: '#090E14', color: '#fff' }}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
        <BottomNavigationAction
          label='Dashboard'
          icon={<BiSolidDashboard />}
          sx={{ color: 'inherit', '& svg': { fontSize: '1.2rem' } }}
        />
        <BottomNavigationAction
          label='Blog'
          icon={<FaBloggerB />}
          sx={{
            color: 'inherit',
            '& svg': { fontSize: '1.2rem' },
            // '&.Mui-selected svg, .Mui-selected': {
            //   color: 'red',
            // },
          }}
        />
      </BottomNavigation>
      <Stack
        direction={'row'}
        justifyContent={'space-between'}
        sx={{ minWidth: '185px', px: 2.5, borderLeft: '1px solid #ffffff1a' }}
      >
        <SwitchTheme openMenu={false} />
        <AccountMenu top={150} right={-5} />
      </Stack>
    </Box>
  );
}
