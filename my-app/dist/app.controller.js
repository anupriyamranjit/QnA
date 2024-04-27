"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TextController = exports.PDFController = exports.AppController = void 0;
const common_1 = require("@nestjs/common");
const app_service_1 = require("./app.service");
const platform_express_1 = require("@nestjs/platform-express");
const pdf_lib_1 = require("pdf-lib");
const fs_1 = require("fs");
let AppController = class AppController {
    constructor(appService) {
        this.appService = appService;
    }
    getHello() {
        return this.appService.getHello();
    }
};
exports.AppController = AppController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", String)
], AppController.prototype, "getHello", null);
exports.AppController = AppController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [app_service_1.AppService])
], AppController);
let PDFController = class PDFController {
    async postPDF(file) {
        await fs_1.promises.writeFile('/tmp/test-sync-2', file.buffer);
        return 'File has been uploaded';
    }
    async getPDF() {
        const output = await fs_1.promises.readFile('/tmp/test-sync-2');
        const outputPDF = await (await pdf_lib_1.PDFDocument.load(output)).save();
        return outputPDF;
    }
};
exports.PDFController = PDFController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    __param(0, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PDFController.prototype, "postPDF", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PDFController.prototype, "getPDF", null);
exports.PDFController = PDFController = __decorate([
    (0, common_1.Controller)('pdf-submit')
], PDFController);
let TextController = class TextController {
    async postPDFText(text) {
        const response = await fetch('http://localhost:11434/api/generate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                model: 'qabot',
                prompt: text,
                format: 'json',
                stream: false,
            }),
        });
        const data = await response.json();
        const cleanedResponse = data.response.replace(/\s*\n\s*/g, '\n').trim();
        try {
            const nice = JSON.parse(cleanedResponse);
            console.log(Object.keys(nice));
            console.log('\n');
            console.log('\n');
            console.log('\n');
            console.log('\n');
            console.log('\n');
            console.log(Object.values(nice));
            console.log(cleanedResponse);
            console.log(text);
            return nice;
        }
        catch (e) {
            console.log(e);
            const regex = /\{ "(.*?)" : "(.*?)" \}/g;
            const matches = [...cleanedResponse.matchAll(regex)];
            console.log(matches);
            matches.forEach((match) => {
                const question = match[1];
                console.log(`Question: ${question}`);
            });
            matches.forEach((match) => {
                const answer = match[2];
                console.log(`Answer: ${answer}`);
            });
            return matches;
        }
    }
    getPDFText() {
        return 'Text has been uploaded';
    }
};
exports.TextController = TextController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)('text')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TextController.prototype, "postPDFText", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", String)
], TextController.prototype, "getPDFText", null);
exports.TextController = TextController = __decorate([
    (0, common_1.Controller)('pdf-text')
], TextController);
//# sourceMappingURL=app.controller.js.map