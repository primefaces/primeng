import { Component } from '@angular/core';
import { MessageModule } from 'primeng/message';
import { AppCodeModule } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';

@Component({
    selector: 'sizes-doc',
    standalone: true,
    imports: [MessageModule, AppCodeModule, AppDocSectionText],
    template: `
        <app-docsectiontext>
            <p>Message provides <i>small</i> and <i>large</i> sizes as alternatives to the base.</p>
        </app-docsectiontext>
        <div class="card flex flex-col items-center gap-4">
            <p-message size="small" icon="pi pi-send">Small Message</p-message>
            <p-message icon="pi pi-user">Normal Message</p-message>
            <p-message size="large" icon="pi pi-check">Large Message</p-message>
        </div>
        <app-code selector="message-sizes-demo"></app-code>
    `
})
export class SizesDoc {}
