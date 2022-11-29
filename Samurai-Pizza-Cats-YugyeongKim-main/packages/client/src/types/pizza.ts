import { Topping } from './topping';

export interface Pizza {
  id: string;
  name: string;
  description?: string | null;
  toppingIds: string[];
  imgSrc?: string | null;
  toppings: Topping[];
  priceCents?: number | null;
}

export interface GetPizzaResult {
  results: Pizza[];
  totalCount: number;
  hasNextPage: boolean;
  cursor: string;
}

export interface CursorResultsInput {
  limit: number;
  cursor: string;
}
