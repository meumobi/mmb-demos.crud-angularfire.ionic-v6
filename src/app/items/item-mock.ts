import { Item } from './item.model';

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
