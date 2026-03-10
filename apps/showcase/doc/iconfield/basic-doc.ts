import { Component } from '@angular/core';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { AppCode } from '@/components/doc/app.code';
import { AppDemoWrapper } from '@/components/doc/app.demowrapper';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';

@Component({
    selector: 'basic-doc',
    standalone: true,
    imports: [AppDocSectionText, AppCode, AppDemoWrapper, IconFieldModule, InputIconModule, InputTextModule],
    template: `
        <app-docsectiontext>
            <p>
                A group is created by wrapping the input and icon with the <i>IconField</i> component. Each icon is defined as a child of <i>InputIcon</i> component. In addition, position of the icon can be changed using <i>iconPosition</i> property
                that the default value is <i>right</i> and also <i>left</i> option is available.
            </p>
        </app-docsectiontext>
        <app-demo-wrapper>
            <div class="flex flex-wrap justify-center gap-4">
                <p-iconfield>
                    <p-inputicon class="pi pi-search" />
                    <input type="text" pInputText placeholder="Search" />
                </p-iconfield>
                <p-iconfield>
                    <input type="text" pInputText />
                    <p-inputicon class="pi pi-spinner pi-spin" />
                </p-iconfield>
            </div>
            <app-code></app-code>
        </app-demo-wrapper>
    `
})
export class BasicDoc {}
