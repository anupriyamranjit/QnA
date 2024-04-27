import { AppService } from './app.service';
export declare class AppController {
    private readonly appService;
    constructor(appService: AppService);
    getHello(): string;
}
export declare class PDFController {
    postPDF(file: any): Promise<string>;
    getPDF(): Promise<Uint8Array>;
}
export declare class TextController {
    postPDFText(text: string): Promise<string[]>;
    getPDFText(): string;
}
