import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { AppCode } from '@/components/doc/app.code';
import { AppDemoWrapper } from '@/components/doc/app.demowrapper';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { FileUploadModule } from 'primeng/fileupload';
import { ToastModule } from 'primeng/toast';

@Component({
    selector: 'custom-doc',
    standalone: true,
    imports: [AppCode, AppDemoWrapper, AppDocSectionText, FileUploadModule, ToastModule],
    template: `
        <app-docsectiontext>
            <p>FileUpload basic <i>mode</i> provides a simpler UI as an alternative to default advanced mode.</p>
        </app-docsectiontext>
        <p-toast></p-toast>
        <app-demo-wrapper>
            <div class="flex justify-center">
                <p-fileupload name="myfile[]" [customUpload]="true" (uploadHandler)="customUploader($event)"></p-fileupload>
            </div>
            <app-code></app-code>
        </app-demo-wrapper>
    `,
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
}
