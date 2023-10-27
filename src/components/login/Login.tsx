import axios from '../../utils/axiosInstance';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { TextField, FormControl, Button, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../contexts/UserContext';
import { useContext } from 'react';

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1, 'Password is required.'),
});

export default function Login() {
  const { fetchUser } = useContext(UserContext);

  const { control, handleSubmit, formState } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const navigate = useNavigate();

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      axios.defaults.withCredentials = true;
      const response = await axios.post('/auth/login', values);
      localStorage.setItem('token', response?.data?.token);
      axios.defaults.headers.common[
        'authorization'
      ] = `Bearer ${response?.data?.token}`;
      navigate('/posts');
      await fetchUser();
    } catch (error) {
      console.log(error);
    }
  };

  const isLoading = formState.isSubmitting;

  return (
    <FormControl
      component={'form'}
      onSubmit={handleSubmit(onSubmit)}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 2,
      }}
    >
      <Typography
        variant='h1'
        sx={{
          mb: '2rem',
          fontSize: '3rem',
          fontWeight: 'bold',
          position: 'relative',
          display: 'flex',
          placeContent: 'center',
          '&::before': {
            content: "' '",
            position: 'absolute',
            bottom: -10,
            width: '80%',
            height: 3,
            background: (theme) => theme.palette.primary.dark,
          },
        }}
      >
        Login
      </Typography>
      <Controller
        name='email'
        control={control}
        render={({ field }) => (
          <TextField
            id='email'
            label='Email'
            type='text'
            disabled={isLoading}
            InputLabelProps={{
              shrink: true,
            }}
            placeholder={'Jhon@jhondoe.com'}
            autoComplete='current-email'
            inputProps={{
              sx: {
                padding: '10px 14px',
                minWidth: '245px',
              },
            }}
            {...field}
          />
        )}
      />
      {formState.errors.email?.message && (
        <motion.div
          className='shake'
          initial={{ x: 0 }}
          animate={{
            x: [-10, 10, -10, 10, 0],
            y: -13,
            transition: { duration: 0.5 },
          }} // Shake animation
          style={{
            marginRight: 'auto',
            position: 'relative',
          }}
        >
          <Typography
            sx={{
              color: 'tomato',
              fontSize: '.75rem',
              position: 'absolute',
              whiteSpace: 'nowrap',
            }}
          >
            {formState.errors.email?.message}
          </Typography>
        </motion.div>
      )}

      <Controller
        name='password'
        control={control}
        render={({ field }) => (
          <TextField
            id='password'
            label='password'
            type='password'
            disabled={isLoading}
            autoComplete='current-password'
            InputLabelProps={{
              shrink: true,
            }}
            inputProps={{
              sx: {
                padding: '10px 14px',
                minWidth: '245px',
              },
            }}
            {...field}
          />
        )}
      />
      {formState.errors.password?.message && (
        <motion.div
          className='shake'
          initial={{ x: 0 }}
          animate={{
            x: [-10, 10, -10, 10, 0],
            y: -13,
            transition: { duration: 0.5 },
          }} // Shake animation
          style={{
            marginRight: 'auto',
            position: 'relative',
          }}
        >
          <Typography
            sx={{
              color: 'tomato',
              fontSize: '.75rem',
              position: 'absolute',
              whiteSpace: 'nowrap',
            }}
          >
            {formState.errors.password?.message}
          </Typography>
        </motion.div>
      )}
      <Button
        type={'submit'}
        variant='contained'
        sx={{
          width: '125px',
          borderRadius: '25px',
          paddingBlock: '.2rem',
          mt: '2rem',
        }}
      >
        Login
      </Button>
    </FormControl>
  );
}
