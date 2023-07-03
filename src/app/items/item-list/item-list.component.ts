import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { ItemFormModal } from '../item-form/item-form.modal';
import { Item } from '../item.model';
import { ItemService } from '../shared/services';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.scss'],
})
export class ItemListComponent implements OnInit {
  items$: Observable<Item[]>;

  constructor(
    private itemsService: ItemService,
    private modalController: ModalController
  ) {}

  ngOnInit() {
    this.items$ = this.itemsService.data$;
  }

  async create() {
    const modal = await this.modalController.create({
      component: ItemFormModal,
    });

    return await modal.present();
  }

  async update(item: Item) {
    const modal = await this.modalController.create({
      component: ItemFormModal,
      componentProps: { item },
    });

    return await modal.present();
  }
  delete(id: string) {
    this.itemsService
      .delete(id)
      .then((_) => console.log('Item successfully deleted'))
      .catch((error) => {
        console.error('Delete item failed', error);
      });
  }
}
