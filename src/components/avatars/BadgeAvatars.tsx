import { styled } from '@mui/material/styles';
import Badge from '@mui/material/Badge';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import { useContext } from 'react';
import { UserContext } from '../../contexts/UserContext';

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    backgroundColor: '#44b700',
    color: '#44b700',
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    '&::after': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      animation: 'ripple 1.2s infinite ease-in-out',
      border: '1px solid currentColor',
      content: '""',
    },
  },
  '@keyframes ripple': {
    '0%': {
      transform: 'scale(.8)',
      opacity: 1,
    },
    '100%': {
      transform: 'scale(2.4)',
      opacity: 0,
    },
  },
}));

export default function BadgeAvatars() {
  const { user } = useContext(UserContext);

  return (
    <Stack direction='row' spacing={2}>
      <StyledBadge
        overlap='circular'
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        variant='dot'
      >
        {user?.user?.base64Img ? (
          <Avatar alt='Remy Sharp' src={user.user.base64Img} />
        ) : (
          <Avatar sx={{ color: '#fff' }}>
            {user?.user?.name.slice(0, 1).toLocaleUpperCase()}
          </Avatar>
        )}
      </StyledBadge>
    </Stack>
  );
}
