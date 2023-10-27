import { Outlet } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { Stack } from '@mui/material';
import { useState, useEffect } from 'react';
import ScrollToTop from '../utils/ScrollToTop';
import RootDrawer, { DrawerHeader } from '../components/drawer/RootDrawer';
import RootAppbar from '../components/headers/RootAppbar';
import MobileRootDrawer from '../components/drawer/MobileRootDrawer';

export const DRAWER_WIDTH = 275;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  zIndex: -1,
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(0),
  },
}));

export default function RootLayout() {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 600);
  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 600);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <>
      <ScrollToTop />
      <Stack direction='row' sx={{ position: 'relative', zIndex: -1 }}>
        {/* <ModalProvider /> */}
        {!isMobile && (
          <RootDrawer open={open} handleDrawerClose={handleDrawerClose} />
        )}
        {isMobile && <MobileRootDrawer />}

        <RootAppbar
          open={open}
          handleDrawerOpen={handleDrawerOpen}
          isMobile={isMobile}
        />
        <Main open={open}>
          <DrawerHeader />
          <Outlet />
        </Main>
      </Stack>
    </>
  );
}
