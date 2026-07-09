export declare class FilesController {
    uploadFile(file: Express.Multer.File): {
        url: string;
        originalName: string;
        size: number;
    };
}
