import React from 'react';
import PageHeader from '../common/PageHeader';
import PizzasList from './PizzaList';
import { Container } from '@material-ui/core';

const Pizzas: React.FC = () => {
  return (
    <Container maxWidth="xl" style={{ display: 'flex', flexDirection: 'column' }}>
      <PageHeader pageHeader={'Pizzas'} />
      <PizzasList />
    </Container>
  );
};

export default Pizzas;
