import { Component } from '@angular/core';
import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { AppDemoWrapper } from '@/components/doc/app.demowrapper';
import { KeyFilterModule } from 'primeng/keyfilter';
import { TextareaModule } from 'primeng/textarea';

@Component({
    selector: 'keyfilter-doc',
    standalone: true,
    imports: [AppCode, AppDocSectionText, AppDemoWrapper, KeyFilterModule, TextareaModule],
    template: `
        <app-docsectiontext>
            <p>InputText has built-in key filtering support to block certain keys, refer to <a href="/keyfilter">keyfilter</a> page for more information.</p>
        </app-docsectiontext>
        <app-demo-wrapper>
            <div class="flex justify-center">
                <textarea pKeyFilter="int" rows="5" cols="30" pTextarea></textarea>
            </div>
            <app-code></app-code>
        </app-demo-wrapper>
    `
})
export class KeyfilterDoc {}
