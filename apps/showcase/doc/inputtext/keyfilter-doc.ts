import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { KeyFilterModule } from 'primeng/keyfilter';
import { AppCode } from '@/components/doc/app.code';
import { AppDemoWrapper } from '@/components/doc/app.demowrapper';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';

@Component({
    selector: 'key-filter-doc',
    standalone: true,
    imports: [FormsModule, InputTextModule, KeyFilterModule, AppCode, AppDemoWrapper, AppDocSectionText],
    template: `
        <app-docsectiontext>
            <p>InputText has built-in key filtering support to block certain keys, refer to <a href="/keyfilter">keyfilter</a> page for more information.</p>
        </app-docsectiontext>
        <app-demo-wrapper>
            <div class="flex justify-center">
                <input pInputText pKeyFilter="int" placeholder="Integers" [(ngModel)]="value" />
            </div>
            <app-code></app-code>
        </app-demo-wrapper>
    `
})
export class KeyFilterDoc {
    value: number | undefined;
}
