import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Code } from '../../domain/code';

interface UploadEvent {
    originalEvent: Event;
    files: File[];
}

@Component({
    selector: 'file-upload-advanced-demo',
    template: `
        <div class="card flex justify-content-center">
            <p-toast></p-toast>
            <p-fileUpload name="demo[]" url="https://www.primefaces.org/cdn/api/upload.php" (onUpload)="onUpload($event)" [multiple]="true" accept="image/*" maxFileSize="1000000" mode="advanced">
                <ng-template pTemplate="toolbar">
                    <div class="py-3">Drag and drop files</div>
                </ng-template>
                <ng-template pTemplate="content">
                    <ul *ngIf="uploadedFiles.length">
                        <li *ngFor="let file of uploadedFiles">{{ file.name }} - {{ file.size }} bytes</li>
                    </ul>
                </ng-template>
            </p-fileUpload>
        </div>
        <app-code [code]="code" selector="file-upload-advanced-demo"></app-code>
    `,
    providers: [MessageService]
})
export class AdvancedDoc {
    uploadedFiles: any[] = [];

    constructor(private messageService: MessageService) {}

    onUpload(event: UploadEvent) {
        for (let file of event.files) {
            this.uploadedFiles.push(file);
        }

        this.messageService.add({ severity: 'info', summary: 'File Uploaded', detail: '' });
    }

    code: Code = {
        basic: `
<p-fileUpload name="demo[]" url="https://www.primefaces.org/cdn/api/upload.php" (onUpload)="onUpload($event)" [multiple]="true" accept="image/*" maxFileSize="1000000">
    <ng-template pTemplate="content">
        <ul *ngIf="uploadedFiles.length">
            <li *ngFor="let file of uploadedFiles">{{ file.name }} - {{ file.size }} bytes</li>
        </ul>
    </ng-template>
</p-fileUpload>`,
        html: `
<div class="card flex justify-content-center">
    <p-toast></p-toast>
    <p-fileUpload name="demo[]" url="https://www.primefaces.org/cdn/api/upload.php" (onUpload)="onUpload($event)" [multiple]="true" accept="image/*" maxFileSize="1000000">
        <ng-template pTemplate="content">
            <ul *ngIf="uploadedFiles.length">
                <li *ngFor="let file of uploadedFiles">{{ file.name }} - {{ file.size }} bytes</li>
            </ul>
        </ng-template>
    </p-fileUpload>
</div>`,
        typescript: `
import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';

interface UploadEvent {
    originalEvent: Event;
    files: File[];
}

@Component({
    selector: 'file-upload-advanced-demo',
    templateUrl: './file-upload-advanced-demo.html',
    providers: [MessageService]
})
export class FileUploadAdvancedDemo {
    uploadedFiles: any[] = [];

    constructor(private messageService: MessageService) {}

    onUpload(event:UploadEvent) {
        for(let file of event.files) {
            this.uploadedFiles.push(file);
        }

        this.messageService.add({severity: 'info', summary: 'File Uploaded', detail: ''});
    }
}`
    };
}
