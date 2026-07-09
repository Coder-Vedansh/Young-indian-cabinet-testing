import { Document } from 'mongoose';
export type MeetingNoteDocument = MeetingNote & Document;
export declare class MeetingNote {
    meetingId: string;
    content: string;
    actionItems: string[];
    aiSummary: string;
    authorId: string;
}
export declare const MeetingNoteSchema: import("mongoose").Schema<MeetingNote, import("mongoose").Model<MeetingNote, any, any, any, any, any, MeetingNote>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, MeetingNote, Document<unknown, {}, MeetingNote, {
    id: string;
}, import("mongoose").DefaultSchemaOptions> & Omit<MeetingNote & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, "id"> & import("mongoose").HydratedDocumentOverrides<{
    id: string;
}>, {
    meetingId?: import("mongoose").SchemaDefinitionProperty<string, MeetingNote, Document<unknown, {}, MeetingNote, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<MeetingNote & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    content?: import("mongoose").SchemaDefinitionProperty<string, MeetingNote, Document<unknown, {}, MeetingNote, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<MeetingNote & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    actionItems?: import("mongoose").SchemaDefinitionProperty<string[], MeetingNote, Document<unknown, {}, MeetingNote, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<MeetingNote & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    aiSummary?: import("mongoose").SchemaDefinitionProperty<string, MeetingNote, Document<unknown, {}, MeetingNote, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<MeetingNote & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    authorId?: import("mongoose").SchemaDefinitionProperty<string, MeetingNote, Document<unknown, {}, MeetingNote, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<MeetingNote & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
}, MeetingNote>;
