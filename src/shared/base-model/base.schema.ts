import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class BaseDocument {
  @Prop({ default: Date.now(), required: true })
  createdAt?: Date;

  @Prop({ default: Date.now(), required: true })
  updatedAt?: Date;
}

export const BaseSchema = SchemaFactory.createForClass(BaseDocument);
