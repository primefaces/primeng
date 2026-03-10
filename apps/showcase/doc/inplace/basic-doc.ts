import { AppCode } from '@/components/doc/app.code';
import { AppDemoWrapper } from '@/components/doc/app.demowrapper';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Component } from '@angular/core';
import { InplaceModule } from 'primeng/inplace';

@Component({
    selector: 'basic-doc',
    standalone: true,
    imports: [AppDocSectionText, AppCode, AppDemoWrapper, InplaceModule],
    template: `
        <app-docsectiontext>
            <p><i>Inplace</i> component requires <i>display</i> and <i>content</i> templates to define the content of each state.</p>
        </app-docsectiontext>
        <app-demo-wrapper>
            <p-inplace>
                <ng-template #display>
                    <span class="text-sm">View Content</span>
                </ng-template>
                <ng-template #content>
                    <p class="m-0 text-sm">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                        consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                    </p>
                </ng-template>
            </p-inplace>
            <app-code></app-code>
        </app-demo-wrapper>
    `
})
export class BasicDoc {}
