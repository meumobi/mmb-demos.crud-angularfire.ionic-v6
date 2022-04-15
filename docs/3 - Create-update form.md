## Components

```sh
$ ng g c items/item-form -m items --type modal
```

FAB button to create

```html
<ion-fab slot="fixed">
  <ion-fab-button (click)="onCreate()">Create</ion-fab-button>
</ion-fab>
```

```ts
async onCreate() {
  const modal = await this.modalController.create({
    component: ItemForm
  });
  return await modal.present();
}
```

## Passing item to update

During creation of a modal, data can be passed in through the `componentProps`.

```ts
async onUpdate(item) {
  const modal = await this.modalController.create({
    component: ItemForm,
    componentProps: {
    'item': item
    }
  });
  return await modal.present();
}
```

To get the data passed into the `componentProps`, set it as an `@Input`:

```ts
export class ItemForm implements OnInit {

  // Data passed in by componentProps
  @Input() item: Item;

  form!: FormGroup;
  isLoading = false;
...
  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.isCreateMode = !this.item;

    this.form = this.formBuilder.group({
      title: ['', Validators.required],
      description: [''],
      picture: [''],
    })

    if (!this.isCreateMode) {
      this.form.patchValue(this.item));
    }
  }

// convenience getter for easy access to form fields
  get f() { return this.form.controls; }

  onSubmit() {
    // stop here if form is invalid
    if (this.form.invalid) {
        return;
    }

    this.isLoading = true;
    if (this.isCreateMode) {
        this.createUser();
    } else {
        this.updateUser();
    }
    this.isLoading = false
  }

  private createUser() {
    this.itemService.create(this.form.value)
    .then(_ => console.log('Item created successfully!'))
    .catch(error) {
      console.error(error)
    }
    .finally()
  }

  private updateUser() {
    this.itemService.update(this.item.id, this.form.value)
    .then(_ => console.log('Item updated successfully!'))
    .catch(error) {
      console.error(error)
    }
    .finally()
  }
}
```

```html
<form [formGroup]="form" (ngSubmit)="onSubmit()">
  <input formControlName="title" type="text" />
  <div *ngIf="f['title'].touched && f['title'].invalid">
    <div *ngIf="f['title'].errors && f['title'].errors['required']">
      Title is required.
    </div>
  </div>

  <button [disabled]="isLoading || !form.valid">Save</button>
</form>
```

- https://jasonwatmore.com/post/2020/12/15/angular-11-crud-example-with-reactive-forms#users-add-edit-component-ts
- https://wechris.github.io/tips-tutorials/angular/typescript/json/crud/webapp/angular6/2018/07/30/Angular-6-CRUD-Example-Application/
- https://www.c-sharpcorner.com/blogs/angular-crud-operations

## Mock backend

https://jsonplaceholder.typicode.com/
[cornflourblue/FakeBackendInterceptor implements HttpInterceptor](https://github.com/cornflourblue/angular-11-crud-example/blob/master/src/app/_helpers/fake-backend.ts)
