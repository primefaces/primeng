import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Code } from '../../domain/code';

interface UploadEvent {
    originalEvent: Event;
    files: File[];
}

@Component({
    selector: 'file-upload-auto-demo',
    template: `
        <app-docsectiontext>
            <p>When <i>auto</i> property is enabled, a file gets uploaded instantly after selection.</p>
        </app-docsectiontext>
        <div class="card flex justify-content-center">
            <p-toast></p-toast>
            <p-fileUpload mode="basic" name="demo[]" url="https://www.primefaces.org/cdn/api/upload.php" accept="image/*" maxFileSize="1000000" (onUpload)="onBasicUploadAuto($event)" [auto]="true" chooseLabel="Browse"></p-fileUpload>
        </div>
        <app-code [code]="code" selector="file-upload-auto-demo"></app-code>
    `,
    providers: [MessageService]
})
export class AutoDoc {
    constructor(private messageService: MessageService) {}

    onBasicUploadAuto(event: UploadEvent) {
        this.messageService.add({ severity: 'info', summary: 'Success', detail: 'File Uploaded with Auto Mode' });
    }

    code: Code = {
        basic: `<p-fileUpload mode="basic" name="demo[]" url="https://www.primefaces.org/cdn/api/upload.php" accept="image/*" maxFileSize="1000000" (onUpload)="onBasicUploadAuto($event)" [auto]="true" chooseLabel="Browse"></p-fileUpload>`,
        html: `
<div class="card flex justify-content-center">
    <p-toast></p-toast>
    <p-fileUpload mode="basic" name="demo[]" url="https://www.primefaces.org/cdn/api/upload.php" accept="image/*" maxFileSize="1000000" (onUpload)="onBasicUploadAuto($event)" [auto]="true" chooseLabel="Browse"></p-fileUpload>
</div>`,

        typescript: `
import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';

interface UploadEvent {
    originalEvent: Event;
    files: File[];
}

@Component({
    selector: 'file-upload-auto-demo',
    templateUrl: './file-upload-auto-demo.html',
    providers: [MessageService]
})
export class FileUploadAutoDemo {
    constructor(private messageService: MessageService) { }

    onBasicUploadAuto(event: UploadEvent) {
        this.messageService.add({ severity: 'info', summary: 'Success', detail: 'File Uploaded with Auto Mode' });
    }
}`
    };
}
