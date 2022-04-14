import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { delay } from 'rxjs/operators';
import { ItemMock } from '../../item-mock';
import { Item } from '../../item.model';
import keyBy from 'lodash/keyBy';

@Injectable({
  providedIn: 'root',
})
export class ItemMockService {
  // Copy object references into the new array (shallow copy)
  // https://stackoverflow.com/questions/7486085/copy-array-by-value
  private data: Item[] = [...ItemMock.data];
  private items: BehaviorSubject<Item[]> = new BehaviorSubject(this.data);

  constructor() {}

  get data$(): Observable<Item[]> {
    return this.items.asObservable().pipe(delay(2000)); // delay to simulate http request
  }

  create(item: Item): Promise<any> {
    this.data.push(item);
    this.items.next(this.data);

    return Promise.resolve();
  }

  getById(id: string): Promise<Item> {
    const itemsKeyById = keyBy(this.data, 'id');
    const item = itemsKeyById[id] || null;

    return new Promise((resolve) => setTimeout(() => resolve(item), 2000));
  }

  update(id: string, data: Partial<Item>): Promise<void> {
    const itemsKeyById = keyBy(this.data, 'id');
    itemsKeyById[id] = { ...itemsKeyById[id], ...data };
    this.data = Object.values(itemsKeyById);
    this.items.next(this.data);

    return Promise.resolve();
  }

  delete(id: string): Promise<void> {
    const itemsKeyById = keyBy(this.data, 'id');
    delete itemsKeyById[id];
    this.data = Object.values(itemsKeyById);
    this.items.next(this.data);

    return Promise.resolve();
  }
}
