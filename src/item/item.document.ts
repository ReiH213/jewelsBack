export class ItemDocument {
  static collectionName = 'items';

  name: string;
  popularityScore: number;
  weight: number;
  images: imageObject[];
}

declare type imageObject = {
  url: string;
  color: string;
};
