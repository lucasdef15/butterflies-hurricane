import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { useContext } from 'react';
import MainContext from '../../contexts/MainContext';

export default function Loader() {
  const { darkMode } = useContext(MainContext);

  return (
    <Box
      sx={{
        display: 'grid',
        width: '100%',
        height: 'calc(100vh)',
        placeContent: 'center',
        color: darkMode ? 'white' : '#000088',
      }}
    >
      <CircularProgress color='inherit' />
    </Box>
  );
}
