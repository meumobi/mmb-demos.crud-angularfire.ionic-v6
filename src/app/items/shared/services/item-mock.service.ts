import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { delay } from 'rxjs/operators';
import { ItemMock } from '../../item-mock';
import { Item } from '../../item.model';

@Injectable({
  providedIn: 'root',
})
export class ItemMockService {
  private items: BehaviorSubject<Item[]> = new BehaviorSubject([]);

  constructor() {
    this.items.next(ItemMock.data);
  }

  get items$(): Observable<Item[]> {
    return this.items.asObservable().pipe(delay(3000)); // delay to simulate http request
  }
}
