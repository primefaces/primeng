import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EditorModule } from 'primeng/editor';
import { AppCode } from '@/components/doc/app.code';
import { AppDemoWrapper } from '@/components/doc/app.demowrapper';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';

@Component({
    selector: 'readonly-doc',
    standalone: true,
    imports: [FormsModule, EditorModule, AppCode, AppDemoWrapper, AppDocSectionText],
    template: `
        <app-docsectiontext>
            <p>When <i>readonly</i> is present, the value cannot be edited.</p>
        </app-docsectiontext>
        <app-demo-wrapper>
            <p-editor [(ngModel)]="text" [readonly]="true" [style]="{ height: '320px' }" />
            <app-code></app-code>
        </app-demo-wrapper>
    `
})
export class ReadOnlyDoc {
    text: string = 'Always bet on Prime!';
}
