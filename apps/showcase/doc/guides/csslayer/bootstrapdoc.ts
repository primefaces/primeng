import { Code } from '@/domain/code';
import { Component } from '@angular/core';
import { AppCodeModule } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';

@Component({
    selector: 'bootstrap-doc',
    standalone: true,
    imports: [AppDocSectionText, AppCodeModule],
    template: `
        <app-docsectiontext>
            <p>Bootstrap has a <i>reboot</i> utility to reset the CSS of the standard elements. If you are including this utility, you may give it a layer while importing it.</p>
            <app-code [code]="code" selector="bootstrap-demo" [hideToggleCode]="true" [hideCodeSandbox]="true" [hideStackBlitz]="true"></app-code>
        </app-docsectiontext>
    `
})
export class BootstrapDoc {
    code: Code = {
        basic: `@layer bootstrap-reboot, primeng

@import "bootstrap-reboot.css" layer(bootstrap-rebooot);`
    };
}
