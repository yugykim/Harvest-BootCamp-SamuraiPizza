import { ObjectId } from 'bson';

import { Pizza } from '../../../types/schema';

export const createTestPizza = (data: Partial<Pizza> = {}): Pizza => ({
  __typename: 'Pizza',
  id: new ObjectId().toHexString(),
  name: 'test name',
  description: 'test description',
  imgSrc: 'test img',
  toppings: [],
  priceCents: 100,
  toppingIds: [],
  ...data,
});
