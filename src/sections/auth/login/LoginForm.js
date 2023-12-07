import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
// @mui
import { Stack, IconButton, InputAdornment, TextField, Checkbox } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useAuth } from './AuthContext';
// components
import Iconify from '../../../components/iconify';

// ----------------------------------------------------------------------

export default function LoginForm() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { setWaleedState } = useAuth();

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  const handleClick = async () => {
    // Basic client-side validation
    if (!credentials.username || !credentials.password) {
      setError('Please enter both username and password.');
      return;
    }

    setLoading(true);
    if (credentials.username === 'waleed' && credentials.password === 'raowaleedrao') {
      navigate('/dashboard/app', { replace: true });
      setWaleedState(true);
  }
    try {
      // Assuming you have an authentication API endpoint
      const response = await axios.post('http://localhost:4000/api/authenticate', credentials);
      
        // Check if the provided username and password are the default credentials
      
      if (response.status === 200) {
        // Authentication successful
        navigate('/dashboard/app', { replace: true });
      } else {
        // Authentication failed
        setError('Authentication failed. Please check your credentials.');
      }
    } catch (error) {
      console.error('Error during authentication:', error);
      setError('Try Again, Check your Credentials!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Stack spacing={3}>
        <TextField
          name="username"
          label="Username"
          value={credentials.username}
          onChange={handleChange}
        />

        <TextField
          name="password"
          label="Password"
          type={showPassword ? 'text' : 'password'}
          value={credentials.password}
          onChange={handleChange}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
        <Checkbox name="remember" label="Remember me" />
      </Stack>

      {error && <div style={{ color: 'red' }}>{error}</div>}

      <LoadingButton
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        onClick={handleClick}
        loading={loading}
      >
        Login
      </LoadingButton>
    </>
  );
}
