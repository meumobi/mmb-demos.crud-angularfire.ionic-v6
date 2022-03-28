import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Item } from '../item.model';
import { ItemService } from '../shared/services';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.scss'],
})
export class ItemListComponent implements OnInit {
  items$: Observable<Item[]>;

  constructor(private itemsService: ItemService) {}

  ngOnInit() {
    this.items$ = this.itemsService.items$;
  }
}
