import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Code } from '@domain/code';

interface UploadEvent {
    originalEvent: Event;
    files: File[];
}

@Component({
    selector: 'file-upload-basic-demo',
    template: `
        <app-docsectiontext>
            <p>FileUpload basic <i>mode</i> provides a simpler UI as an alternative to default advanced mode.</p>
        </app-docsectiontext>
        <div class="card flex justify-content-center">
            <p-toast />
            <p-fileUpload mode="basic" chooseLabel="Choose" chooseIcon="pi pi-upload" name="demo[]" url="https://www.primefaces.org/cdn/api/upload.php" accept="image/*" maxFileSize="1000000" (onUpload)="onUpload($event)" />
        </div>
        <app-code [code]="code" selector="file-upload-basic-demo"></app-code>
    `,
    providers: [MessageService]
})
export class BasicDoc {
    constructor(private messageService: MessageService) {}

    onUpload(event: UploadEvent) {
        this.messageService.add({ severity: 'info', summary: 'Success', detail: 'File Uploaded with Basic Mode' });
    }

    code: Code = {
        basic: `<p-fileUpload 
    mode="basic" 
    chooseLabel="Choose" 
    chooseIcon="pi pi-upload"
    name="demo[]" 
    url="https://www.primefaces.org/cdn/api/upload.php" 
    accept="image/*" 
    maxFileSize="1000000" 
    (onUpload)="onUpload($event)" />`,
        html: `<div class="card flex justify-content-center">
    <p-toast />
    <p-fileUpload 
        mode="basic" 
        chooseLabel="Choose" 
        chooseIcon="pi pi-upload"
        name="demo[]" 
        url="https://www.primefaces.org/cdn/api/upload.php" 
        accept="image/*" 
        maxFileSize="1000000" 
        (onUpload)="onUpload($event)" />
</div>`,
        typescript: `import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { FileUploadModule } from 'primeng/fileupload';
import { ToastModule } from 'primeng/toast';

interface UploadEvent {
    originalEvent: Event;
    files: File[];
}

@Component({
    selector: 'file-upload-basic-demo',
    templateUrl: './file-upload-basic-demo.html',
    standalone: true,
    imports: [FileUploadModule, ToastModule],
    providers: [MessageService]
})
export class FileUploadBasicDemo {
    constructor(private messageService: MessageService) {}

    onUpload(event: UploadEvent) {
        this.messageService.add({ severity: 'info', summary: 'Success', detail: 'File Uploaded with Basic Mode' });
    }
}`
    };
}
