import { Helmet } from 'react-helmet-async';

import { Container, Stack } from '@mui/material';
// @mui
import SearchResult from '../sections/@dashboard/result/SearchResult';

// ----------------------------------------------------------------------


// ----------------------------------------------------------------------

export default function Search() {
  return (
    <>
      <Helmet>
        <title> Dashboard: This Month </title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <SearchResult/>
          </Stack>
      </Container>
    </>
  );
}
