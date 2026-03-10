import { AppCode } from '@/components/doc/app.code';
import { AppDemoWrapper } from '@/components/doc/app.demowrapper';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Component } from '@angular/core';
import { FieldsetModule } from 'primeng/fieldset';

@Component({
    selector: 'basic-doc',
    standalone: true,
    imports: [FieldsetModule, AppCode, AppDocSectionText, AppDemoWrapper],
    template: `
        <app-docsectiontext>
            <p>A simple Fieldset is created with a <i>legend</i> property along with the content as children.</p>
        </app-docsectiontext>
        <app-demo-wrapper>
            <p-fieldset legend="Header">
                <p class="m-0 text-sm">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                    consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </p>
            </p-fieldset>
            <app-code></app-code>
        </app-demo-wrapper>
    `
})
export class BasicDoc {}
