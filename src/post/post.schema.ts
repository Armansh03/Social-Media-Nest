import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { User } from '../user/user.schema';

export type PostDocument = HydratedDocument<Post>;

@Schema()
class Comment {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
  userId!: User;

  @Prop()
  comment: string;
}

@Schema({ timestamps: true })
export class Post {
  @Prop()
  userId: string;

  @Prop()
  text: string;

  @Prop({ required: true })
  image!: string;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }] })
  liked: User[];

  @Prop([Comment])
  comment: Comment[];
}

export const PostSchema = SchemaFactory.createForClass(Post);
