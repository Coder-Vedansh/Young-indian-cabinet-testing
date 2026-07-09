import { Document } from 'mongoose';
export type PolicyDraftDocument = PolicyDraft & Document;
export declare class PolicyDraft {
    title: string;
    content: string;
    authorId: string;
    collaboratorIds: string[];
    status: string;
    metadata: any;
}
export declare const PolicyDraftSchema: import("mongoose").Schema<PolicyDraft, import("mongoose").Model<PolicyDraft, any, any, any, any, any, PolicyDraft>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, PolicyDraft, Document<unknown, {}, PolicyDraft, {
    id: string;
}, import("mongoose").DefaultSchemaOptions> & Omit<PolicyDraft & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, "id"> & import("mongoose").HydratedDocumentOverrides<{
    id: string;
}>, {
    title?: import("mongoose").SchemaDefinitionProperty<string, PolicyDraft, Document<unknown, {}, PolicyDraft, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<PolicyDraft & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    content?: import("mongoose").SchemaDefinitionProperty<string, PolicyDraft, Document<unknown, {}, PolicyDraft, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<PolicyDraft & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    authorId?: import("mongoose").SchemaDefinitionProperty<string, PolicyDraft, Document<unknown, {}, PolicyDraft, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<PolicyDraft & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    collaboratorIds?: import("mongoose").SchemaDefinitionProperty<string[], PolicyDraft, Document<unknown, {}, PolicyDraft, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<PolicyDraft & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    status?: import("mongoose").SchemaDefinitionProperty<string, PolicyDraft, Document<unknown, {}, PolicyDraft, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<PolicyDraft & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    metadata?: import("mongoose").SchemaDefinitionProperty<any, PolicyDraft, Document<unknown, {}, PolicyDraft, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<PolicyDraft & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
}, PolicyDraft>;
