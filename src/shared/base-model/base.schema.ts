import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { SchemaTypes, Types } from 'mongoose';

@Schema()
export class BaseDocument {
  @Prop({ type: SchemaTypes.ObjectId })
  _id?: Types.ObjectId;

  @Prop({ default: Date.now(), required: true })
  createdAt?: Date;

  @Prop({ default: Date.now(), required: true })
  updatedAt?: Date;
}

export const BaseSchema = SchemaFactory.createForClass(BaseDocument);
