import { Helmet } from 'react-helmet-async';

import { Container, Stack } from '@mui/material';
// @mui
import AllOrder from '../sections/@dashboard/all/AllOrder';

// ----------------------------------------------------------------------


// ----------------------------------------------------------------------

export default function BlogPage() {
  return (
    <>
      <Helmet>
        <title> Dashboard: All Orders | </title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <AllOrder/>
          </Stack>
      </Container>
    </>
  );
}
