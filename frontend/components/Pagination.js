import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import Head from 'next/head';
import Link from 'next/link';

import DisplayError from './ErrorMessage';
import { perPage } from '../config';

import PaginationStyles from './styles/PaginationStyles';

export const PAGINATION_QUERY = gql`
  query PAGINATION_QUERY {
    _allProductsMeta {
      count
    }
  }
`;

const Pagination = ({ page }) => {
  const { error, loading, data } = useQuery(PAGINATION_QUERY);

  if (loading) {
    return <p>Loading ...</p>;
  }

  if (error) {
    return <DisplayError />;
  }

  const { count } = data._allProductsMeta;
  const pageCount = Math.ceil(count / perPage);

  return (
    <PaginationStyles>
      <Head>
        <title>
          Sick Fits - Page {page} of {pageCount}
        </title>
      </Head>
      <Link href={`/products/${page - 1}`}>
        <a aria-disabled={page <= 1}>⬅️&nbsp;Prev</a>
      </Link>
      <p>
        Page {page} of {pageCount}
      </p>
      <p>{count} Items Total</p>
      <Link href={`/products/${page + 1}`}>
        <a aria-disabled={page >= pageCount}>Next&nbsp;➡️</a>
      </Link>
    </PaginationStyles>
  );
};

export default Pagination;
