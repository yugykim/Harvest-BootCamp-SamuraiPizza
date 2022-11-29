import { setupDb } from '../database';

import { ToppingProvider } from './toppings/topping.provider';
import { PizzaProvider } from './pizzas/pizza.provider';
import { PizzaCursorProvider } from './pizzas/pizza-cursor.provider';

const db = setupDb();

const toppingProvider = new ToppingProvider(db.collection('toppings'));
const pizzaCursorProvider = new PizzaCursorProvider(db.collection('pizzas'));
const pizzaProvider = new PizzaProvider(db.collection('pizzas'), toppingProvider, pizzaCursorProvider);

export { toppingProvider, pizzaProvider };
