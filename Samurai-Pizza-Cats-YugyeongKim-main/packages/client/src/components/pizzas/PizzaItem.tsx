import { Box, Card, CardContent } from '@material-ui/core';
import { IconButton } from '@material-ui/core';
import { makeStyles, createStyles } from '@material-ui/styles';
import toDollars from '../../lib/format-dollars';
import { Pizza } from '../../types/pizza';
import makePizza from '../../assets/img/make-pizza.jpeg';
import { AddCircle } from '@material-ui/icons';
import { useState } from 'react';
import defaultPizza from '../../assets/img/default-pizza.jpeg';

const useStyles = makeStyles(() =>
  createStyles({
    ListContainer: {
      display: 'flex',
      width: '25%',
      justifyContent: 'center',
      margin: '2vw',
    },
    card: {
      display: 'flex',
      width: '25vw',
      height: '65vh',
      flexDirection: 'column',
      backgroundColor: 'white',
    },
    imgBox: {
      textAlign: 'right',
      width: '95%',
      height: '90%',
      border: 'none',
      cursor: 'pointer',
      marginBottom: '10px',
    },
    pizzaInfoBox: {
      height: '30%',
      width: '90%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      gap: '20px',
    },
    pizzaName: {
      fontSize: '1.5vw',
      fontWeight: 'bold',
    },
    pizzaDes: {
      fontSize: '1vw',
    },
    pizzaPrice: {
      fontSize: '1.2vw',
    },
    newPizzaBox: {
      backgroundColor: 'black',
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      justifyContent: 'space-between',
      color: 'white',
    },
    newPizzaImg: {
      width: '90%',
    },
    addIcon: {
      fontSize: '3vw',
      color: 'white',
      transition: '0.3s',
      '&:hover': {
        color: 'grey',
      },
    },
    fixIcon: {
      fontSize: '3vw',
      color: 'black',
      position: 'relative',
      cursor: 'pointer',
      transition: '0.3s',
      '&:hover': {
        color: 'grey',
      },
    },
  })
);

export interface PizzaItemProps {
  pizza?: Pizza;
  handleOpen: (pizza?: Pizza) => void;
}

const PizzaItem: React.FC<PizzaItemProps> = ({ pizza, handleOpen, ...props }) => {
  const classes = useStyles();
  return (
    <Box className={classes.ListContainer}>
      <Card>
        <CardContent style={{ padding: '0', width: '100%', height: '100%' }} {...props}>
          {pizza ? (
            <div className={classes.card}>
              <button
                className={classes.imgBox}
                type="button"
                onClick={(): void => handleOpen(pizza)}
                style={{
                  backgroundImage: `url(${pizza.imgSrc?.includes('https') ? pizza?.imgSrc : defaultPizza})`,
                  backgroundSize: '100% 100%',
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'center',
                }}
                data-testid={`pizza-imgSrc-${pizza?.id}`}
              ></button>
              <div className={classes.pizzaInfoBox}>
                <p data-testid={`pizza-name-${pizza?.id}`} className={classes.pizzaName}>
                  {pizza?.name}
                </p>
                <p data-testid={`pizza-description-${pizza?.id}`} className={classes.pizzaDes}>
                  {pizza?.description ? pizza.description : ''}
                </p>
                <p data-testid={`pizza-priceCents-${pizza?.id}`} className={classes.pizzaPrice}>
                  {pizza?.priceCents ? toDollars(pizza.priceCents) : ''}
                </p>
              </div>
            </div>
          ) : (
            <div className={classes.card}>
              <div className={classes.newPizzaBox}>
                <h2 style={{ fontSize: '2vw', textAlign: 'center', marginTop: '1vw' }}>Make New Pizza</h2>
                <img className={classes.newPizzaImg} src={makePizza} />
                <IconButton
                  className={classes.addIcon}
                  edge="end"
                  aria-label="create"
                  type="button"
                  onClick={(): void => handleOpen(pizza)}
                >
                  <AddCircle fontSize="inherit" />
                </IconButton>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </Box>
  );
};

export default PizzaItem;
