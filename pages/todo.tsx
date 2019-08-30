import React from 'react';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { makeStyles } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';

import Layout from './_layout';

const TodoPage = () => {
  return (
    <Layout>
      <Box
        display="flex"
        flexDirection="row"
        alignItems="center"
        height="100%"
      >
        <Container maxWidth="xl">
          Todo List
        </Container>
      </Box>
    </Layout>
  );
}

export default TodoPage;