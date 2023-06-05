import { Component, Input } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Code } from '../../domain/code';

@Component({
    selector: 'file-upload-auto-demo',
    template: ` <section>
        <app-docsectiontext [title]="title" [id]="id">
            <p>When <i>auto</i> property is enabled, a file gets uploaded instantly after selection.</p>
        </app-docsectiontext>
        <div class="card flex justify-content-center">
            <p-toast></p-toast>
            <p-fileUpload mode="basic" name="demo[]" url="https://www.primefaces.org/cdn/api/upload.php" accept="image/*" maxFileSize="1000000" (onUpload)="onBasicUploadAuto($event)" [auto]="true" chooseLabel="Browse"></p-fileUpload>
        </div>
        <app-code [code]="code" selector="file-upload-auto-demo"></app-code>
    </section>`,
    providers: [MessageService]
})
export class AutoDoc {
    @Input() id: string;

    @Input() title: string;

    constructor(private messageService: MessageService) {}

    onBasicUploadAuto(event) {
        this.messageService.add({ severity: 'info', summary: 'Success', detail: 'File Uploaded with Auto Mode' });
    }

    code: Code = {
        basic: `
<p-fileUpload mode="basic" name="demo[]" url="https://www.primefaces.org/cdn/api/upload.php" accept="image/*" maxFileSize="1000000" (onUpload)="onBasicUploadAuto($event)" [auto]="true" chooseLabel="Browse"></p-fileUpload>`,
        html: `
<div class="card flex justify-content-center">
    <p-toast></p-toast>
    <p-fileUpload mode="basic" name="demo[]" url="https://www.primefaces.org/cdn/api/upload.php" accept="image/*" maxFileSize="1000000" (onUpload)="onBasicUploadAuto($event)" [auto]="true" chooseLabel="Browse"></p-fileUpload>
</div>`,

        typescript: `
import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';

@Component({
    selector: 'file-upload-auto-demo',
    templateUrl: './file-upload-auto-demo.html',
    providers: [MessageService]
})
export class FileUploadAutoDemo {
    constructor(private messageService: MessageService) { }

    onBasicUploadAuto(event) {
        this.messageService.add({ severity: 'info', summary: 'Success', detail: 'File Uploaded with Auto Mode' });
    }
}`
    };
}
