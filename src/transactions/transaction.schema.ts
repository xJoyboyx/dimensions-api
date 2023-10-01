import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { User } from '../users/user.schema';

export type TransactionDocument = Transaction & Document;

@Schema()
export class Transaction {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
  userId: User;

  @Prop({ required: true })
  date: Date;

  @Prop({ required: true })
  amount: number;

  @Prop({ required: false, enum: ['USD', 'MXN', 'CND'], default: 'USD' })
  currency: string;

  @Prop()
  description: string;

  @Prop({ enum: ['purchase', 'refund', 'other'], default: 'purchase' })
  type: string;

  @Prop()
  productId: string;

  @Prop({ enum: ['android', 'ios'], required: true })
  platform: string;
}

export const TransactionSchema = SchemaFactory.createForClass(Transaction);
