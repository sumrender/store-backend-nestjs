import {
  FilterQuery,
  Model,
  Types,
  UpdateQuery,
  isValidObjectId,
} from 'mongoose';
import { BaseDocument } from './base.schema';

export abstract class BaseRepository<TDocument extends BaseDocument> {
  constructor(protected readonly model: Model<TDocument>) {}

  static toObjectId(id: string): Types.ObjectId {
    if (!id) {
      throw new Error('Id passed is undefined or null');
    }

    if (!isValidObjectId(id)) {
      throw new Error('Invalid id');
    }

    return new Types.ObjectId(id);
  }

  async create(document: TDocument) {
    const createdDocument = await this.model.create(document);
    console.log(createdDocument);
    return createdDocument;
  }

  async findById(id: string) {
    return this.model
      .findById(BaseRepository.toObjectId(id))
      .lean<TDocument>(true);
  }

  async find(filterQuery: FilterQuery<TDocument>) {
    return this.model.find(filterQuery).lean<TDocument[]>(true);
  }

  async findByIdAndUpdate(id: string, update: UpdateQuery<TDocument>) {
    return this.model
      .findByIdAndUpdate(BaseRepository.toObjectId(id), update, {
        new: true,
      })
      .lean<TDocument>(true);
  }

  async findByIdAndDelete(id: string) {
    return this.model.findByIdAndDelete(BaseRepository.toObjectId(id), {
      lean: true,
    });
  }
}
