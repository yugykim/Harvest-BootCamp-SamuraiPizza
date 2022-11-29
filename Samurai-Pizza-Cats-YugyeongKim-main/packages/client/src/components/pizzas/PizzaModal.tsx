import React, { useEffect } from 'react';
import { useState } from 'react';
import Select from 'react-select';
import { Backdrop, createStyles, Fade, makeStyles, Modal, Paper, TextField, Theme } from '@material-ui/core';

import { useFormik } from 'formik';
import * as yup from 'yup';
import { GET_TOPPINGS } from '../../hooks/graphql/topping/queries/get-toppings';
import { useQuery } from '@apollo/client';
import usePizzaMutations from '../../hooks/pizza/use-pizza-mutations';
import defaultPizza from '../../assets/img/default-pizza.jpeg';
import makePizza from '../../assets/img/make-pizza.jpeg';
import { Topping } from '../../types/schema';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    skeleton: {
      display: 'flex',
      justifyContent: 'center',
      verticalAlign: 'center',
    },
    paper: {
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[5],
      padding: theme.spacing(1, 3, 1),
    },
    root: {
      '& .MuiTextField-root': {
        margin: theme.spacing(1),
        width: '25ch',
      },
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
      margin: '10px',
      maxWidth: '30vw',
      maxHight: '5vh',
    },
    h1: {
      fontSize: '2vw',
      textAlign: 'center',
    },
    h2: {
      fontSize: '1.5vw',
    },
    pizzaImg: {
      width: '25vw',
      margin: '10px',
    },
    pizzaImgDefault: {
      width: '25vw',
      margin: '10px',
    },
    buttonBox: {
      textAlign: 'center',
    },
    button: {
      border: 'none',
      outline: 'none',
      backgroundColor: 'inherit',
      fontSize: '1.3vw',
      fontWeight: 'bold',
      padding: '1.5vw 1vw 0 1vw',
      cursor: 'pointer',
    },
    textBox: {
      display: 'flex',
    },
    textField: {
      flex: '2',
      fontSize: '1vw',
      '&:focus': {
        border: 'pink solid 2px',
      },
    },
    labelBox: {
      flex: '1',
      fontSize: '1vw',
    },
    selectTopping: {
      width: '100%',
      height: '10%',
      border: 'none',
    },
  })
);

interface PizzaModalProps {
  selectedPizza?: any;
  setSelectedPizza: React.Dispatch<React.SetStateAction<any>>;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

interface ItoppingNameList {
  id: string;
  value: string;
  label: string;
}

const PizzaModal = ({ selectedPizza, setSelectedPizza, open, setOpen }: PizzaModalProps): JSX.Element => {
  const classes = useStyles();
  const { onCreatePizza, onDeletePizza, onUpdatePizza } = usePizzaMutations();
  const { loading, data } = useQuery(GET_TOPPINGS);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  const validationSchema = yup.object({
    name: yup.string(),
    description: yup.string(),
    imgSrc: yup.string(),
    toppingIds: yup.array().of(
      yup.object().shape({
        id: yup.string(),
      })
    ),
  });

  const formik = useFormik({
    initialValues: {
      id: selectedPizza?.id,
      name: selectedPizza?.name,
      description: selectedPizza?.description,
      imgSrc: selectedPizza?.imgSrc,
      toppingIds: selectedPizza?.toppings ? selectedPizza?.toppings : [],
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      let ids = values.toppingIds.map((topping: any) => topping.id);
      console.log(values);
      if (selectedPizza) {
        let newPizza = {
          id: selectedPizza.id,
          name: values.name,
          description: values.description,
          imgSrc: values.imgSrc,
          toppingIds: ids,
        };
        onUpdatePizza(newPizza);
      } else {
        let newPizza = {
          name: values.name,
          description: values.description,
          imgSrc: values.imgSrc,
          toppingIds: ids,
        };
        onCreatePizza(newPizza);
      }
      setOpen(false);
    },
  });

  const handleChange = (options: any) => {
    const toppingIds = options.map((option: any) => option.id.toString());
    setSelectedOptions(toppingIds.id);
    formik.values.toppingIds = options;
  };

  if (loading) {
    return <div>Loading ...</div>;
  }

  let toppingNameList: ItoppingNameList[] = [];
  data?.toppings.forEach((topping: Topping) => {
    toppingNameList.push({
      id: topping.id,
      value: topping.name,
      label: topping.name,
    });
  });

  let selectedToppings: ItoppingNameList[] = [];

  selectedPizza?.toppings.forEach((topping: Topping) => {
    selectedToppings.push({
      id: topping.id,
      value: topping.name,
      label: topping.name,
    });
  });

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      className={classes.modal}
      open={open}
      onClose={(): void => setOpen(false)}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={open}>
        <Paper className={classes.paper}>
          {selectedPizza ? (
            <>
              <h1 className={classes.h1} id="name">
                {selectedPizza.name}
              </h1>
              <img
                id="imgSrc"
                className={classes.pizzaImg}
                src={selectedPizza.imgSrc.includes('https') ? selectedPizza.imgSrc : defaultPizza}
              />
            </>
          ) : (
            <>
              <img id="imgSrc" src={makePizza} alt="defaultPizza" className={classes.pizzaImgDefault} />
            </>
          )}
          <form onSubmit={formik.handleSubmit} noValidate autoComplete="off" className={classes.form}>
            <h2 className={classes.h2}>Detail</h2>
            <div className={classes.textBox}>
              <div className={classes.labelBox}>
                <label>Name: </label>
              </div>
              <TextField
                id="name"
                className={classes.textField}
                defaultValue={selectedPizza?.name ? selectedPizza.name : 'New pizza'}
                onChange={formik.handleChange}
                InputProps={{
                  classes: {
                    input: classes.textField,
                  },
                  disableUnderline: true,
                }}
              />
            </div>
            <div className={classes.textBox}>
              <div className={classes.labelBox}>
                <label>Description: </label>
              </div>
              <TextField
                id="description"
                className={classes.textField}
                type="text"
                defaultValue={selectedPizza?.description ? selectedPizza.description : 'description'}
                onChange={formik.handleChange}
                InputProps={{
                  classes: {
                    input: classes.textField,
                  },
                  disableUnderline: true,
                }}
              />
            </div>
            <div className={classes.textBox}>
              <div className={classes.labelBox}>
                <label>Image URL: </label>
              </div>
              <TextField
                id="imgSrc"
                className={classes.textField}
                type="text"
                defaultValue={selectedPizza?.imgSrc ? selectedPizza.imgSrc : 'defaultPizza'}
                onChange={formik.handleChange}
                InputProps={{
                  classes: {
                    input: classes.textField,
                  },
                  disableUnderline: true,
                }}
              />
            </div>
            <h2 className={classes.h2}>Toppings</h2>
            <Select
              className={classes.selectTopping}
              options={toppingNameList}
              isMulti
              defaultValue={selectedToppings.map((topping: any) => topping)}
              styles={{
                control: (baseStyles, state) => ({
                  ...baseStyles,
                  borderColor: state.isFocused ? 'red' : '',
                  borderRadius: '0',
                  border: 'none',
                  borderBottom: 'black solid 1px',
                }),
              }}
              closeMenuOnSelect={false}
              onChange={handleChange}
            />
            {selectedPizza ? (
              <div className={classes.buttonBox}>
                <button
                  className={classes.button}
                  aria-label="update"
                  onClick={(): void => {
                    onUpdatePizza(selectedPizza);
                  }}
                  type="submit"
                >
                  Submit
                </button>
                <button
                  className={classes.button}
                  aria-label="delete"
                  onClick={(): void => {
                    onDeletePizza(selectedPizza);
                    setOpen(false);
                  }}
                  type="submit"
                >
                  Delete
                </button>
              </div>
            ) : (
              <div className={classes.buttonBox}>
                <button
                  className={classes.button}
                  aria-label="create"
                  onClick={(): void => {
                    onCreatePizza(selectedPizza);
                  }}
                  type="submit"
                >
                  Submit
                </button>
              </div>
            )}
          </form>
        </Paper>
      </Fade>
    </Modal>
  );
};

export default PizzaModal;
