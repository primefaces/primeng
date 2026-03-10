import { Component } from '@angular/core';
import { MessageModule } from 'primeng/message';
import { AppCode } from '@/components/doc/app.code';
import { AppDemoWrapper } from '@/components/doc/app.demowrapper';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';

@Component({
    selector: 'sizes-doc',
    standalone: true,
    imports: [MessageModule, AppCode, AppDemoWrapper, AppDocSectionText],
    template: `
        <app-docsectiontext>
            <p>Message provides <i>small</i> and <i>large</i> sizes as alternatives to the base.</p>
        </app-docsectiontext>
        <app-demo-wrapper>
            <div class="flex flex-col items-center gap-4">
                <p-message size="small" icon="pi pi-send">Small Message</p-message>
                <p-message icon="pi pi-user">Normal Message</p-message>
                <p-message size="large" icon="pi pi-check">Large Message</p-message>
            </div>
            <app-code></app-code>
        </app-demo-wrapper>
    `
})
export class SizesDoc {}
