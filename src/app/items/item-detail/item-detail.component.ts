import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Item } from '../item.model';
import { ItemService } from '../shared/services';

@Component({
  selector: 'app-item-detail',
  templateUrl: './item-detail.component.html',
  styleUrls: ['./item-detail.component.scss'],
})
export class ItemDetailComponent implements OnInit {
  itemId: string;
  item: Item | undefined;

  constructor(
    private route: ActivatedRoute,
    private itemService: ItemService
  ) {}

  ngOnInit() {
    this.itemId = this.route.snapshot.paramMap.get('id');
    this.itemService
      .getById(this.itemId)
      .then((res) => {
        this.item = res;
      })
      .catch((error) => {
        console.error(error);
      });
  }
}
