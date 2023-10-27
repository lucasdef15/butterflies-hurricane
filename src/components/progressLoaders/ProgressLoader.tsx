import { Stack, CircularProgress } from '@mui/material';

export default function ProgressLoader() {
  return (
    <Stack
      justifyContent={'center'}
      alignItems={'center'}
      sx={{ width: '100vw', height: '100vh' }}
    >
      <CircularProgress size={30} thickness={3} />
    </Stack>
  );
}
