import { Stack, Paper } from '@mui/material';
import loginImg from '/imgs/loginImg.jpg';
import Login from '../components/login/Login';

export default function InitialLoginPage() {
  return (
    <Stack direction={'row'} sx={{ minHeight: '100vh', overflow: 'hidden' }}>
      <Stack
        sx={{
          width: '60%',
          position: 'relative',
          '& img': {
            display: 'block',
            width: '100%',
            transform: 'rotate(25deg)',
            position: 'absolute',
            top: '-500px',
            left: '-50px',
            boxShadow: '10px 10px 50px rgba(0, 0, 0, 0.486)',
          },
        }}
      >
        <Paper component={'img'} src={loginImg} />
      </Stack>
      <Stack
        direction={'column'}
        justifyContent={'center'}
        alignItems={'center'}
        sx={{ width: '40%' }}
      >
        <Login />
      </Stack>
    </Stack>
  );
}
