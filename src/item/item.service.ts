import { Injectable } from '@nestjs/common';
import { Firestore } from '@google-cloud/firestore';
import { ItemDocument } from './item.document';

@Injectable()
export class ItemService {
  private readonly collection;

  constructor(private readonly firestore: Firestore) {
    this.collection = this.firestore.collection(ItemDocument.collectionName);
  }

  async create(item: Partial<ItemDocument>) {
    if (!item.images || item.images.length !== 3) {
      throw new Error('Images array must contain exactly 3 images.');
    }

    const docRef = this.collection.doc();
    await docRef.set({ id: docRef.id, ...item });
    return { id: docRef.id, ...item };
  }

  async findAll(filters: { minPopularity?: number; maxPopularity?: number }) {
    let query = this.collection as FirebaseFirestore.Query<ItemDocument>;
    if (filters.minPopularity !== undefined) {
      query = query.where(
        'popularityScore',
        '>=',
        String(filters.minPopularity),
      );
    }
    if (filters.maxPopularity !== undefined) {
      query = query.where(
        'popularityScore',
        '<=',
        String(filters.maxPopularity),
      );
    }
    const snapshot = await query.get();

    return snapshot.docs.map((doc) => doc.data());
  }

  async findOne(id: string) {
    const doc = await this.collection.doc(id).get();
    return doc.exists ? doc.data() : null;
  }

  async update(id: string, data: Partial<ItemDocument>) {
    if (data.images && data.images.length !== 3) {
      throw new Error('Images array must contain exactly 3 images.');
    }

    await this.collection.doc(id).update(data);
    return { id, ...data };
  }
  async delete(id: string) {
    await this.collection.doc(id).delete();
    return { id };
  }
}
