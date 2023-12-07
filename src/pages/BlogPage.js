import { Helmet } from 'react-helmet-async';

import { Container, Stack } from '@mui/material';
// @mui
import Month from '../sections/@dashboard/blog/Month';

// ----------------------------------------------------------------------


// ----------------------------------------------------------------------

export default function BlogPage() {
  return (
    <>
      <Helmet>
        <title> Dashboard: This Month </title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Month/>
          </Stack>
      </Container>
    </>
  );
}
