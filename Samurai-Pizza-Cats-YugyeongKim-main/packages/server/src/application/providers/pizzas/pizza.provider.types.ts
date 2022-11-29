import { Topping } from '../toppings/topping.provider.types';

export interface Pizza {
  id: string;
  name: string;
  description?: string | null;
  toppingIds: string[];
  imgSrc?: string | null;
  toppings: Topping[];
  priceCents?: number | null;
}

export interface CreatePizzaInput {
  name: string;
  description?: string | null;
  imgSrc?: string | null;
  toppingIds?: string[] | null;
}

export interface UpdatePizzaInput {
  id: string;
  name?: string | null;
  description?: string | null;
  imgSrc?: string | null;
  toppingIds?: string[] | null;
}
