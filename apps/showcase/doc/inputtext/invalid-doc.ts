import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { AppCode } from '@/components/doc/app.code';
import { AppDemoWrapper } from '@/components/doc/app.demowrapper';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';

@Component({
    selector: 'invalid-doc',
    standalone: true,
    imports: [FormsModule, InputTextModule, AppCode, AppDemoWrapper, AppDocSectionText],
    template: `
        <app-docsectiontext>
            <p>The invalid state is applied using the <i>⁠invalid</i> property to indicate failed validation, which can be integrated with Angular Forms.</p>
        </app-docsectiontext>
        <app-demo-wrapper>
            <div class="flex flex-wrap justify-center gap-4">
                <input pInputText [(ngModel)]="value1" [invalid]="!value1" placeholder="Name" />
                <input pInputText [(ngModel)]="value2" [invalid]="!value2" variant="filled" placeholder="Name" />
            </div>
            <app-code></app-code>
        </app-demo-wrapper>
    `
})
export class InvalidDoc {
    value1: string | undefined;

    value2: string | undefined;
}
