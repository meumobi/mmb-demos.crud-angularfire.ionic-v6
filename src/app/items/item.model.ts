export class Item {
  id?: string;
  title: string;
  description = '';
  publishedAt: string = null;
  createdAt: string = null;
  modifiedAt: string = null;
  picture: string = null;

  constructor(props: any) {
    Object.entries(props).forEach(([key, value]) => (this[key] = value));
  }
}
