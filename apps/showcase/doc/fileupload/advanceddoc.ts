import { Code } from '@/domain/code';
import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';

interface UploadEvent {
    originalEvent: Event;
    files: File[];
}

@Component({
    selector: 'file-upload-advanced-demo',
    template: `
        <app-docsectiontext>
            <p>FileUpload is an advanced uploader with dragdrop support, multi file uploads, auto uploading, progress tracking and validations.</p>
        </app-docsectiontext>
        <div class="card">
            <p-toast />
            <p-fileupload name="demo[]" url="https://www.primefaces.org/cdn/api/upload.php" (onUpload)="onUpload($event)" [multiple]="true" accept="image/*" maxFileSize="1000000" mode="advanced">
                <ng-template #empty>
                    <div>Drag and drop files to here to upload.</div>
                </ng-template>
                <ng-template #content>
                    <ul *ngIf="uploadedFiles.length">
                        <li *ngFor="let file of uploadedFiles">{{ file.name }} - {{ file.size }} bytes</li>
                    </ul>
                </ng-template>
            </p-fileupload>
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
        basic: `<p-fileupload
    name="demo[]"
    url="https://www.primefaces.org/cdn/api/upload.php"
    (onUpload)="onUpload($event)"
    [multiple]="true"
    accept="image/*"
    maxFileSize="1000000"
    mode="advanced"
>
    <ng-template #empty>
        <div>Drag and drop files to here to upload.</div>
    </ng-template>
    <ng-template #content>
        <ul *ngIf="uploadedFiles.length">
            <li *ngFor="let file of uploadedFiles">{{ file.name }} - {{ file.size }} bytes</li>
        </ul>
    </ng-template>
</p-fileupload>`,
        html: `<div class="card">
    <p-toast />
    <p-fileupload
        name="demo[]"
        url="https://www.primefaces.org/cdn/api/upload.php"
        (onUpload)="onUpload($event)"
        [multiple]="true"
        accept="image/*"
        maxFileSize="1000000"
        mode="advanced"
    >
        <ng-template #empty>
            <div>Drag and drop files to here to upload.</div>
        </ng-template>
        <ng-template #content>
            <ul *ngIf="uploadedFiles.length">
                <li *ngFor="let file of uploadedFiles">{{ file.name }} - {{ file.size }} bytes</li>
            </ul>
        </ng-template>
    </p-fileupload>
</div>`,
        typescript: `import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { FileUpload } from 'primeng/fileupload';
import { ToastModule } from 'primeng/toast';
import { CommonModule } from '@angular/common';

interface UploadEvent {
    originalEvent: Event;
    files: File[];
}

@Component({
    selector: 'file-upload-advanced-demo',
    templateUrl: './file-upload-advanced-demo.html',
    standalone: true,
    imports: [FileUpload, ToastModule, CommonModule],
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
