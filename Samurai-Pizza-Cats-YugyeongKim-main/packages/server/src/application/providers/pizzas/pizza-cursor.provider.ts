import _ from 'lodash';
import { Collection, ObjectId } from 'mongodb';
import { PizzaDocument, toPizzaObject } from '../../../entities/pizza';
import { CursorResultsInput } from './pizza-cursor.provider.types';

class PizzaCursorProvider {
  constructor(private pizzaCollection: Collection<PizzaDocument>) {}

  public async getCursorIndex(cursor: string): Promise<number> {
    const pizzas = await (await this.pizzaCollection.find().sort({ name: 1 }).toArray()).map(toPizzaObject);
    let cursorIndex = 0;
    pizzas.forEach((pizza, index) => {
      if (pizza.id === cursor) {
        cursorIndex = index;
      }
    });
    return cursorIndex;
  }

  public async getcursorResults({ limit, cursor }: CursorResultsInput): Promise<any> {
    let hasNextPage = false;
    const itemsToSkip = await this.getCursorIndex(cursor);

    const mongoDocuments = await this.pizzaCollection
      .find()
      .sort({ name: 1 })
      .skip(itemsToSkip)
      .limit(limit + 1)
      .toArray();
    if (mongoDocuments.length > limit) {
      hasNextPage = true;
      mongoDocuments.pop();
    }
    const nextCursor = mongoDocuments.length < limit ? null : mongoDocuments[limit - 1].id;
    return {
      totalCount: mongoDocuments.length,
      hasNextPage: hasNextPage,
      nextCursor: nextCursor,
      results: mongoDocuments,
    };
  }
}

export { PizzaCursorProvider };
