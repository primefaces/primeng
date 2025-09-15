import { Component } from '@angular/core';
import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';

@Component({
    selector: 'bootstrap-doc',
    standalone: true,
    imports: [AppCode, AppDocSectionText],
    template: `
        <app-docsectiontext>
            <p>Bootstrap has a <i>reboot</i> utility to reset the CSS of the standard elements. If you are including this utility, you may give it a layer while importing it.</p>
        </app-docsectiontext>
        <app-code [code]="code" selector="bootstrap-demo" [hideToggleCode]="true"></app-code>
    `
})
export class BootstrapDoc {
    code = {
        basic: `@layer bootstrap-reboot, primeng;

@import "bootstrap-reboot.css" layer(bootstrap-rebooot);`
    };
}
