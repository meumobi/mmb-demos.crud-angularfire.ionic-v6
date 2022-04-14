# Master-detail implementation

## Module

> Rule of thumb is to try to create features which don't depend on any other features just on services provided by CoreModule and components provided by SharedModule.

It's considered a [best practice to add routing module for each feature module](https://angular.io/guide/lazy-loading-ngmodules).
Then we'll add a new module for stacks (before running each cli I recommend to add `--dry-run` to simulate cmd):

```bash
$ ng generate module items --routing
CREATE src/app/items/items-routing.module.ts (248 bytes)
CREATE src/app/items/items.module.ts (275 bytes)
```

ItemsRoutingModule will handle any items-related routing. This keeps the app's structure organized as the app grows and allows you to reuse this module while easily keeping its routing intact.

ItemsModule is needed for setting up lazy loading for your feature module.

## Components

```bash
$ ng g c items/item-list -m items --type page
$ ng g c items/item-detail -m items --type page
```

And declare them on ItemsModule as below:

```ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemsRoutingModule } from './items-routing.module';
import { ItemListComponent } from './item-list/item-list.component';
import { ItemDetailComponent } from './item-detail/item-detail.component';

@NgModule({
  declarations: [ItemListComponent, ItemDetailComponent],
  imports: [CommonModule, ItemsRoutingModule],
})
export class ItemsModule {}
```

## Routing

Open and edit `src/app/app-routing.module.ts` to add new module.

```typescript
const routes: Routes = [
  { path: '', redirectTo: '/items', pathMatch: 'full' },
...
  {
    path: 'items',
    loadChildren: () => import('./items/items.module').then(m => m.ItemsModule)
  },
....
];
```

Open and edit src/app/items/items-routing.module.ts to add routes as below:

```typescript
...
import { ItemListComponent } from './item.component';
import { ItemDetailComponent } from './item-detail/item-detail.component';


const routes: Routes = [
  { path: '', component: ItemListComponent},
  { path: 'detail/:id', component: ItemDetailComponent},
];
...
```

To test routing you can run the app on localhost and call routes `/items` and `items/detail/123`.

## Model

```bash
$ ng g class items/item --type=model --skip-tests
CREATE src/app/items/items.model.ts (23 bytes)
```

Open and edit `src/app/items/item.model.ts` as below:

```ts
export class Item {
  id?: string;
  title: string;
  description: string;
  publishedAt: string = null; // ISO 8601 datetime format (YYYY-MM-DDTHH:mm:ss.sZ)
  createdAt: string = null; // ISO 8601 datetime format (YYYY-MM-DDTHH:mm:ss.sZ)
  modifiedAt: string = null; // ISO 8601 datetime format (YYYY-MM-DDTHH:mm:ss.sZ)
  picture: string = null;

  constructor(props: any) {
    Object.entries(props).forEach(([key, value]) => (this[key] = value));
  }
}
```

```sh
$ ng g class items/item-mock --skip-tests
CREATE src/app/items/item-mock.ts (26 bytes)
```

Open and edit `src/app/items/item-mock.ts` as below:

```ts
export class ItemMock {
  public static data: Item[] = [
    {
      id: '123',
      title: 'I learned to READ my dreams (and you can too)',
      description:
        'One night, about 18 months ago, I had a vivid dream about a mole that was poisoning me. When, a few nights later, I had the same strange dream again, I Googled what being sick in a dream might mean.',
      publishedAt: '2019-08-28T14:48:00.000Z',
      createdAt: '2019-08-28T14:48:00.000Z',
      modifiedAt: '2019-08-28T14:48:00.000Z',
      picture:
        'https://i.dailymail.co.uk/1s/2019/08/28/21/17803628-0-image-a-131_1567024609120.jpg',
    },
    {
      id: '124',
      title:
        "Square Crypto Praises Gimmicky Bitcoin Giveaways but Doesn't Give Any Away",
      description:
        'Basically, Square Crypto argues that if you give bitcoin to someone (especially a skeptic), they’ll become emotionally invested in its success. Why? Because then they’ll have skin in the game.',
      publishedAt: '2019-08-28T14:48:00.000Z',
      createdAt: '2019-08-28T14:48:00.000Z',
      modifiedAt: '2019-08-28T14:48:00.000Z',
      picture:
        'https://www.ccn.com/wp-content/uploads/2019/08/bitcoin-giveaway-ss.jpg',
    },
  ];
}
```

## Observable data service

Observable data services or stores are a simple and intuitive pattern that allows tapping into the power of functional reactive programming in Angular without introducing too many of new concepts. An observable data service is an Angular injectable service that can be used to provide data to multiple parts of the application. This pattern can ensure data is coming from one place in our application and that **every component receives the latest version of that data through our data streams**.

### Mock

```sh
$ ng g service items/shared/services/item-mock --skip-tests
CREATE src/app/items/shared/services/item-mock.service.ts (137 bytes)
```

Open and edit `src/app/items/shared/services/item-mock.service.ts` as below:

```ts
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ItemMock } from '../../item-mock';
import { Item } from '../../item.model';
import { delay } from 'rxjs/operators';
import keyBy from 'lodash/keyBy';

@Injectable({
  providedIn: 'root',
})
export class ItemMockService {
  // Copy object references into the new array (shallow copy)
  // https://stackoverflow.com/questions/7486085/copy-array-by-value
  private data: Item[] = [...ItemMock.data];
  private items: BehaviorSubject<Item[]> = new BehaviorSubject(items);

  constructor() {}

  get data$(): Observable<Item[]> {
    return this.items.asObservable().pipe(delay(3000)); // delay to simulate http request
  }

  getById(id: string): Promise<Eventure> {
    let itemsKeyById = keyBy(this.data, 'id');
    const item = itemsKeyById[id] || null;
    return new Promise((resolve) => setTimeout(() => resolve(event), 2000));
  }

  update(id: string, data: Partial<Item>): Promise<void> {}
  create(item: Item): Promise<any> {}
  delete(id: string): Promise<void> {}
}
```

## Templates

### item-list

```html
<ng-container *ngIf="items$ | async as items; else loading">
  <div *ngIf="items.length > 0; else empty">
    <ul *ngFor="let item of items">
      <li routerLink="/items/detail/{{ item.id }}">{{ item.title }}</li>
    </ul>
  </div>
</ng-container>
<ng-template #loading>Loading...</ng-template>
<ng-template #empty>No items found!</ng-template>
```

```ts
export class ItemListComponent implements OnInit {
  events$: Observable<Item[]>;

  constructor(private itemService: ItemService) {}

  ngOnInit() {
    this.items$ = this.itemService.data$;
  }
}
```

### item-detail

```html
<ng-container *ngIf="item !== undefined; else loading">
  <div *ngIf="item !== null; else empty">
    <h2>{{ item.title }}</h2>
  </div>
</ng-container>
<ng-template #loading>Loading...</ng-template>
<ng-template #empty>Item not found!</ng-template>
```
