import { useCallback } from 'react';
import { useMutation } from '@apollo/client';

import { GET_PIZZAS } from '../graphql/pizzas/queries/get-pizzas';
import { CREATE_PIZZA } from '../graphql/pizzas/queries/mutations/create-pizza';
import { DELETE_PIZZA } from '../graphql/pizzas/queries/mutations/delete-pizza';
import { UPDATE_PIZZA } from '../graphql/pizzas/queries/mutations/update-pizza';
import { CreatePizzaInput } from '../../../../server/src/application/providers/pizzas/pizza.provider.types';

interface UsePizzaMutationsOutput {
  onCreatePizza: (selectedPizza: CreatePizzaInput | undefined) => void;
  onDeletePizza: (selectedPizza: any) => Promise<void>;
  onUpdatePizza: (selectedPizza: any) => void;
}

const usePizzaMutations = (): UsePizzaMutationsOutput => {
  const [createPizza] = useMutation(CREATE_PIZZA, { refetchQueries: [GET_PIZZAS, 'Pizzas'] });
  const [deletePizza] = useMutation(DELETE_PIZZA, { refetchQueries: [GET_PIZZAS, 'Pizzas'] });
  const [updatePizza] = useMutation(UPDATE_PIZZA);
  const onCreatePizza = useCallback(
    (selectedPizza: CreatePizzaInput | undefined) => {
      try {
        //console.log("mutations" + selectedPizza);
        createPizza({
          variables: {
            createPizzaInput: {
              name: selectedPizza?.name,
              description: selectedPizza?.description,
              toppingIds: selectedPizza?.toppingIds,
              imgSrc: selectedPizza?.imgSrc,
            },
          },
        });
      } catch (err) {
        console.log(err);
      }
    },
    [createPizza]
  );

  const onDeletePizza = useCallback(
    async (selectedPizza) => {
      try {
        await deletePizza({
          variables: {
            deletePizzaInput: {
              id: selectedPizza.id,
            },
          },
        });
      } catch (err) {
        console.log(err);
      }
    },
    [deletePizza]
  );

  const onUpdatePizza = useCallback(
    (selectedPizza) => {
      try {
        updatePizza({
          variables: {
            updatePizzaInput: {
              id: selectedPizza.id,
              name: selectedPizza?.name,
              description: selectedPizza?.description,
              toppingIds: selectedPizza?.toppingIds,
              imgSrc: selectedPizza?.imgSrc,
            },
          },
        });
      } catch (err) {
        console.log(err);
      }
    },
    [updatePizza]
  );

  return { onCreatePizza, onDeletePizza, onUpdatePizza };
};

export default usePizzaMutations;
