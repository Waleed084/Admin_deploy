import { Helmet } from 'react-helmet-async';
// @mui
import { Container } from '@mui/material';
// components
import ProductPage from '../sections/@dashboard/products/ProductPage';
// mock

// ----------------------------------------------------------------------

export default function ProductsPage() {

  return (
    <>
      <Helmet>
        <title> Dashboard: Today Orders </title>
      </Helmet>

      <Container>
      <ProductPage />
      </Container>
    </>
  );
}
