import { DRAWER_WIDTH } from '../../layouts/RootLayout';
import { styled, useTheme, Theme, CSSObject } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { Stack } from '@mui/material';
import { FaBloggerB } from 'react-icons/fa';
import { BiSolidDashboard } from 'react-icons/bi';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import RootListItem from './RootListItem';
import RootMenuHeader from '../headers/RootMeuHeader';
import SwitchTheme from '../switches/SwitchTheme';

interface RootDrawer {
  open: boolean;
  handleDrawerClose: () => void;
}

const exitAnimation = {
  opacity: 0,
  x: -50,
};

const openedMixin = (theme: Theme): CSSObject => ({
  width: DRAWER_WIDTH,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

export const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  width: DRAWER_WIDTH,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  ...(open && {
    ...openedMixin(theme),
    '& .MuiDrawer-paper': openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    '& .MuiDrawer-paper': closedMixin(theme),
  }),
}));

export default function RootDrawer({ open, handleDrawerClose }: RootDrawer) {
  const theme = useTheme();

  const location = useLocation();
  return (
    <Drawer
      variant='permanent'
      open={open}
      PaperProps={{
        sx: {
          backgroundColor: '#090E14',
          color: '#fff',
          display: { xs: 'none', sm: 'flex' },
        },
      }}
    >
      <DrawerHeader>
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={exitAnimation}
              style={{ width: '100%' }}
            >
              <RootMenuHeader openMenu={open} />
            </motion.div>
          )}
        </AnimatePresence>
        {location.pathname.includes('forum') ? (
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={exitAnimation}
            style={{
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <RootMenuHeader openMenu={open} isForum={true} />
          </motion.div>
        ) : (
          <IconButton
            onClick={handleDrawerClose}
            sx={{
              color: 'inherit',
              transition: 'background 150ms',
              p: 1,
              '&:hover': {
                background: '#23262D',
              },
            }}
          >
            {theme.direction === 'rtl' ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        )}
      </DrawerHeader>
      <Divider sx={{ background: '#ffffff29' }} />
      <Stack
        direction={'column'}
        justifyContent={'space-between'}
        minHeight={'calc(100vh - 66px)'}
      >
        <List>
          <AnimatePresence>
            {!open && !location.pathname.includes('forum') && (
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={exitAnimation}
                style={{ paddingBlock: '8px' }}
              >
                <RootMenuHeader openMenu={open} />
              </motion.div>
            )}
          </AnimatePresence>

          <RootListItem
            text='Dashboard'
            open={open}
            icon={<BiSolidDashboard />}
            to='/dashboard'
          />

          <RootListItem
            text='Blog'
            open={open}
            icon={<FaBloggerB />}
            to='/posts'
          />
        </List>
        <div>
          <Divider sx={{ background: '#ffffff29' }} />
          <SwitchTheme openMenu={open} />
        </div>
      </Stack>
    </Drawer>
  );
}
