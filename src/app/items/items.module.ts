import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ItemsRoutingModule } from './items-routing.module';
import { ItemListComponent } from './item-list/item-list.component';
import { ItemDetailComponent } from './item-detail/item-detail.component';
import { ItemFormModal } from './item-form/item-form.modal';
import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [ItemListComponent, ItemDetailComponent, ItemFormModal],
  imports: [CommonModule, ItemsRoutingModule, IonicModule, ReactiveFormsModule],
})
export class ItemsModule {}
