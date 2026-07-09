import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PolicyDraftDocument = PolicyDraft & Document;

@Schema({ timestamps: true })
export class PolicyDraft {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  content: string; // Rich text / HTML / Delta

  @Prop()
  authorId: string; // References PostgreSQL User ID

  @Prop([String])
  collaboratorIds: string[]; // References PostgreSQL User IDs

  @Prop({ default: 'DRAFT' })
  status: string; // DRAFT, REVIEW, PUBLISHED

  @Prop({ type: Object })
  metadata: any;
}

export const PolicyDraftSchema = SchemaFactory.createForClass(PolicyDraft);
