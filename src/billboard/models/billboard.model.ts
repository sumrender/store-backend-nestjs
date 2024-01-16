import { Injectable } from '@nestjs/common';
import { InjectModel, Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseDocument, BaseRepository } from 'src/shared/base-model';

@Schema({ versionKey: false })
export class Billboard extends BaseDocument {
  @Prop()
  url: string;

  @Prop({ required: false })
  label: string;
}

export const BillboardSchema = SchemaFactory.createForClass(Billboard);

@Injectable()
export class BillboardRepository extends BaseRepository<Billboard> {
  constructor(@InjectModel(Billboard.name) billboardModel: Model<Billboard>) {
    super(billboardModel);
  }
}
