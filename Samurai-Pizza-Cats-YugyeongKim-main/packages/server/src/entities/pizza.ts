import { Document } from 'mongodb';
import { Pizza } from 'src/application/schema/types/schema';

interface PizzaDocument extends Document, Omit<Pizza, 'id' | 'priceCents'> {}

const toPizzaObject = (pizza: PizzaDocument): Pizza => {
  return {
    id: pizza._id.toHexString(),
    name: pizza.name,
    description: pizza.description,
    toppingIds: pizza.toppingIds,
    toppings: pizza.toppings,
    imgSrc: pizza.imgSrc,
    priceCents: pizza.priceCents,
  };
};

export { PizzaDocument, toPizzaObject };
