import React, { useCallback, useEffect, useState } from 'react';
import { Container } from '@material-ui/core';
import { useQuery } from '@apollo/client';
import { makeStyles } from '@material-ui/styles';
import { createStyles, Theme } from '@material-ui/core';
import { GetPizzaResult, Pizza } from '../../types';
import PizzaItem from './PizzaItem';
import { GET_PIZZAS } from '../../hooks/graphql/pizzas/queries/get-pizzas';
import PizzaModal from './PizzaModal';

const useStyles = makeStyles(({ typography }: Theme) =>
  createStyles({
    container: {
      display: 'flex',
      justifyContent: 'center',
      flexWrap: 'wrap',
    },
    skeleton: {
      display: 'flex',
      justifyContent: 'center',
      verticalAlign: 'center',
    },
    button: {
      backgroundColor: 'white',
      fontSize: '24px',
      border: 'none',
      cursor: 'pointer',
      padding: '2vw',
      outline: 'none',
      margin: 'auto',
      display: 'block',
    },
  })
);

interface ItoppingNameList {
  id: string;
  value: string;
  label: string;
}

const PizzasList: React.FC = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [selectedPizza, setselectedPizza] = React.useState<Partial<Pizza>>();
  const [limit, setLimit] = useState(5);
  const { loading, error, data } = useQuery(GET_PIZZAS, {
    variables: {
      input: {
        limit,
        cursor: 'empty',
      },
    },
  });

  const clickMorePizzas = useCallback((event) => setLimit((current) => current + 3), [limit]);

  if (loading) {
    return (
      <div data-testid={`pizza-list-loading`} className={classes.skeleton}>
        Pizza List Loading ...
      </div>
    );
  }

  const handleOpen = (pizza?: Pizza): void => {
    setselectedPizza(pizza);
    setOpen(true);
  };

  const pizzaList = data?.pizzas.results.map((pizza: Pizza) => (
    <PizzaItem data-testid={`pizza-item${pizza?.id}`} key={pizza?.id} handleOpen={handleOpen} pizza={pizza} />
  ));

  return (
    <Container maxWidth="xl">
      <div data-testid={`pizza-item-list`}></div>
      <div className={classes.container}>
        <PizzaItem key="add-pizza" handleOpen={handleOpen} />
        {pizzaList}
      </div>
      <button className={classes.button} onClick={clickMorePizzas}>
        See more pizzas
      </button>
      <PizzaModal selectedPizza={selectedPizza} setSelectedPizza={setselectedPizza} open={open} setOpen={setOpen} />
    </Container>
  );
};

export default PizzasList;
