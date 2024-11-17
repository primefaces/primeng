import { Code } from '@/domain/code';
import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';

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
        <div class="card flex flex-col gap-6 items-center justify-center">
            <p-toast />
            <p-fileupload #fu mode="basic" chooseLabel="Choose" chooseIcon="pi pi-upload" name="demo[]" url="https://www.primefaces.org/cdn/api/upload.php" accept="image/*" maxFileSize="1000000" (onUpload)="onUpload($event)" />
            <p-button label="Upload" (onClick)="fu.upload()" severity="secondary" />
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
        basic: `<p-fileupload
    #fu
    mode="basic"
    chooseLabel="Choose"
    chooseIcon="pi pi-upload"
    name="demo[]"
    url="https://www.primefaces.org/cdn/api/upload.php"
    accept="image/*"
    maxFileSize="1000000"
    (onUpload)="onUpload($event)"
/>
<p-button label="Upload" (onClick)="fu.upload()" severity="secondary" />`,
        html: `<div class="card flex flex-col gap-6 items-center justify-center">
    <p-toast />
    <p-fileupload
        #fu
        mode="basic"
        chooseLabel="Choose"
        chooseIcon="pi pi-upload"
        name="demo[]"
        url="https://www.primefaces.org/cdn/api/upload.php"
        accept="image/*"
        maxFileSize="1000000"
        (onUpload)="onUpload($event)"
    />
    <p-button label="Upload" (onClick)="fu.upload()" severity="secondary" />
</div>`,
        typescript: `import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { FileUpload } from 'primeng/fileupload';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';

interface UploadEvent {
    originalEvent: Event;
    files: File[];
}

@Component({
    selector: 'file-upload-basic-demo',
    templateUrl: './file-upload-basic-demo.html',
    standalone: true,
    imports: [FileUpload, ToastModule, ButtonModule],
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
