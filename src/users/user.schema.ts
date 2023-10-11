import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
  @Prop({ unique: true })
  email: string;

  @Prop({ type: String, default: null })
  external_id: string;

  @Prop({ required: true, enum: ['apple_login', 'google_login'] })
  service_type: string;

  @Prop({ required: false, default: true })
  enabled: boolean;

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
