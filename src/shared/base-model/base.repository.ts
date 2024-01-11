import {
  FilterQuery,
  Model,
  MongooseError,
  Types,
  UpdateQuery,
  isValidObjectId,
} from 'mongoose';
import { BaseDocument } from './base.schema';
import { DBException, NotFoundError } from '../exceptions';

export abstract class BaseRepository<TDocument extends BaseDocument> {
  constructor(protected readonly model: Model<TDocument>) {}

  protected static throwMongoError(err: MongooseError): void {
    throw new DBException(err);
  }

  static toObjectId(id: string): Types.ObjectId {
    try {
      if (!id) {
        throw new Error('Id passed is undefined or null');
      }

      if (!isValidObjectId(id)) {
        throw new Error('Invalid id');
      }

      return new Types.ObjectId(id);
    } catch (error) {
      BaseRepository.throwMongoError(error);
    }
  }

  async create(document: TDocument): Promise<TDocument> {
    try {
      return this.model.create({
        ...document,
        _id: new Types.ObjectId(),
      });
    } catch (error) {
      BaseRepository.throwMongoError(error);
    }
  }

  async findById(id: string): Promise<TDocument> {
    try {
      const document = await this.model
        .findById(BaseRepository.toObjectId(id))
        .lean<TDocument>(true);

      if (!document) {
        throw new NotFoundError();
      }

      return document;
    } catch (error) {
      BaseRepository.throwMongoError(error);
    }
  }

  async find(filterQuery: FilterQuery<TDocument>): Promise<TDocument[]> {
    try {
      return this.model.find(filterQuery).lean<TDocument[]>(true);
    } catch (error) {
      BaseRepository.throwMongoError(error);
    }
  }

  async findByIdAndUpdate(
    id: string,
    update: UpdateQuery<TDocument>,
  ): Promise<TDocument> {
    try {
      return this.model
        .findByIdAndUpdate(BaseRepository.toObjectId(id), update, {
          new: true,
        })
        .lean<TDocument>(true);
    } catch (error) {
      BaseRepository.throwMongoError(error);
    }
  }

  async findByIdAndDelete(id: string): Promise<TDocument> {
    try {
      return this.model
        .findByIdAndDelete(BaseRepository.toObjectId(id))
        .lean<TDocument>(true);
    } catch (error) {
      BaseRepository.throwMongoError(error);
    }
  }
}
