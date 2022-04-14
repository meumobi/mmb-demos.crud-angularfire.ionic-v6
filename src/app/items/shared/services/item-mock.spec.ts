import { ItemMock } from '../../item-mock';
import { Item } from '../../item.model';
import { ItemMockService } from './item-mock.service';
import keyBy from 'lodash/keyBy';

describe('ItemMockService', () => {
  let itemMockService: ItemMockService;
  beforeEach(() => {
    itemMockService = new ItemMockService();
  });

  it('#data$ should return a non-empty array of items', (done: DoneFn) => {
    itemMockService.data$.subscribe((items) => {
      expect(!!items.length).toBeTrue();
      done();
    });
  });

  it('#create should create item on data store', (done: DoneFn) => {
    const item = new Item({ id: 125, title: 'New item' });
    itemMockService.create(item).then((_) => {
      itemMockService.data$.subscribe((items) => {
        expect(items.length === ItemMock.data.length + 1).toBeTrue();
        done();
      });
    });
  });

  it('#update should update item on data store', (done: DoneFn) => {
    const title = 'Updated item';
    const id = '123';
    itemMockService.update(id, { title }).then((_) => {
      itemMockService.getById(id).then((item) => {
        expect(item.title === title).toBeTrue();
        done();
      });
    });
  });

  it('#update should update item on data$', (done: DoneFn) => {
    const title = 'Updated item';
    const id = '123';
    itemMockService.update(id, { title }).then((_) => {
      itemMockService.data$.subscribe((items) => {
        const itemsKeyById = keyBy(items, 'id');
        expect(itemsKeyById[id].title === title).toBeTrue();
        done();
      });
    });
  });

  it('#delete should delete item on data store', (done: DoneFn) => {
    const id = '123';
    itemMockService.delete(id).then((_) => {
      itemMockService.getById(id).then((item) => {
        expect(item === null).toBeTrue();
        done();
      });
    });
  });

  it('#delete should delete item on data$', (done: DoneFn) => {
    const id = '123';
    itemMockService.delete(id).then((_) => {
      itemMockService.data$.subscribe((items) => {
        const itemsKeyById = keyBy(items, 'id');
        expect(itemsKeyById[id] === undefined).toBeTrue();
        done();
      });
    });
  });
});
