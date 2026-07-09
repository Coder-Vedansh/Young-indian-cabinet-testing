import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type MeetingNoteDocument = MeetingNote & Document;

@Schema({ timestamps: true })
export class MeetingNote {
  @Prop({ required: true })
  meetingId: string; // References PostgreSQL Meeting ID

  @Prop({ required: true })
  content: string;

  @Prop([String])
  actionItems: string[];

  @Prop()
  aiSummary: string; // Placeholder for future AI summary

  @Prop()
  authorId: string; // References PostgreSQL User ID
}

export const MeetingNoteSchema = SchemaFactory.createForClass(MeetingNote);
