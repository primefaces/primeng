import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EditorModule } from 'primeng/editor';
import { AppCode } from '@/components/doc/app.code';
import { AppDemoWrapper } from '@/components/doc/app.demowrapper';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';

@Component({
    selector: 'basic-doc',
    standalone: true,
    imports: [FormsModule, EditorModule, AppCode, AppDemoWrapper, AppDocSectionText],
    template: `
        <app-docsectiontext>
            <p>A model can be bound using the standard <i>ngModel</i> directive.</p>
        </app-docsectiontext>
        <app-demo-wrapper>
            <p-editor [(ngModel)]="text" [style]="{ height: '320px' }" />
            <app-code></app-code>
        </app-demo-wrapper>
    `
})
export class BasicDoc {
    text: string | undefined;
}
