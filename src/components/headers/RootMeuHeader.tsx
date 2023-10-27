import { Stack, Typography } from '@mui/material';
import { useContext } from 'react';
import AccountMenu from '../accountMenu/AccountMenu';
import { UserContext } from '../../contexts/UserContext';

interface HeaderMenuProps {
  openMenu: boolean;
  isForum?: boolean;
}

export default function RootMenuHeader({ openMenu }: HeaderMenuProps) {
  const { user } = useContext(UserContext);

  return (
    <Stack
      direction='row'
      alignItems='center'
      justifyContent={openMenu ? 'start' : 'center'}
      spacing={2}
      sx={{ width: '100%' }}
    >
      <AccountMenu />
      {openMenu && (
        <Stack>
          <Typography sx={{ fontSize: '1rem' }}>{user?.user?.name}</Typography>
          <Typography
            sx={{
              fontSize:
                (user?.user?.email.length as number) > 21 ? '.7rem' : '.85rem',
              fontWeight: 'light',
              color: 'text.light',
            }}
          >
            {(user?.user?.email.length as number) > 21
              ? user?.user?.email.slice(0, 21) + '...'
              : user?.user?.email}
          </Typography>
        </Stack>
      )}
    </Stack>
  );
}
