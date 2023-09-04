import { Component, Input } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Code } from '../../domain/code';

@Component({
    selector: 'file-upload-custom-demo',
    template: ` <section class="py-3">
        <app-docsectiontext [title]="title" [id]="id">
            <p>FileUpload basic <i>mode</i> provides a simpler UI as an alternative to default advanced mode.</p>
        </app-docsectiontext>
        <div class="card flex justify-content-center">
            <p-toast></p-toast>
            <p-fileUpload name="myfile[]" [customUpload]="true" (uploadHandler)="customUploader($event)"></p-fileUpload>
        </div>
        <app-code [code]="code" selector="file-upload-custom-demo"></app-code>
    </section>`,
    providers: [MessageService]
})
export class CustomDoc {
    @Input() id: string;

    @Input() title: string;

    constructor(private messageService: MessageService) {}

    async customUploader(event) {
        const file = event.files[0];
        const reader = new FileReader();
        let blob = await fetch(file.objectURL).then((r) => r.blob()); //blob:url

        reader.readAsDataURL(blob);

        reader.onloadend = function () {
            const base64data = reader.result;
        };

        this.messageService.add({ severity: 'info', summary: 'Success', detail: 'File Uploaded with Basic Mode' });
    }

    code: Code = {
        basic: `
<p-fileUpload name="myfile[]" [customUpload]="true" (uploadHandler)="customUploader($event)"></p-fileUpload>`,
        html: `
<div class="card flex justify-content-center">
    <p-toast></p-toast>
    <p-fileUpload name="myfile[]" [customUpload]="true" (uploadHandler)="customUploader($event)"></p-fileUpload>
</div>`,
        typescript: `
import { Component, Input } from '@angular/core';
import { MessageService } from 'primeng/api';

@Component({
    selector: 'file-upload-custom-demo',
    templateUrl: './file-upload-custom-demo.html',
    providers: [MessageService]
})
export class CustomDoc {

    constructor(private messageService: MessageService) {}

    async customUploader(event) {
        const file = event.files[0];
        const reader = new FileReader();
        let blob = await fetch(file.objectURL).then((r) => r.blob()); //blob:url

        reader.readAsDataURL(blob);

        reader.onloadend = function () {
            const base64data = reader.result;
        };
        
        this.messageService.add({ severity: 'info', summary: 'Success', detail: 'File Uploaded with Basic Mode' });
    }
}`
    };
}
