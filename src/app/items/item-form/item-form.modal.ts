import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { Item } from '../item.model';
import { ItemService } from '../shared/services';

@Component({
  selector: 'app-item-form',
  templateUrl: './item-form.modal.html',
  styleUrls: ['./item-form.modal.scss'],
})
export class ItemFormModal implements OnInit {
  @Input() item?: Item; // = new Item();

  itemForm = this.formBuilder.group({
    title: ['', Validators.required],
    description: [''],
    picture: [''],
  });
  isLoading = false;
  isCreateMode = true;

  constructor(
    private modalCtrl: ModalController,
    private formBuilder: FormBuilder,
    private itemService: ItemService
  ) {}
  // convenience getter for easy access to form fields
  get f() {
    return this.itemForm.controls;
  }

  ngOnInit(): void {
    this.isCreateMode = this.item === undefined;

    if (!this.isCreateMode) {
      this.itemForm.patchValue(this.item);
    }
  }

  async onSubmit() {
    this.isLoading = true;
    try {
      if (!this.isCreateMode) {
        await this.itemService.update(this.item.id, this.itemForm.value);
      } else {
        await this.itemService.create({ ...new Item(this.itemForm.value) });
      }
      this.dismissModal();
    } catch (err) {
      console.log(err);
    }
    this.isLoading = false;
  }

  dismissModal() {
    this.modalCtrl.dismiss();
  }
}
