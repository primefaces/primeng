import { Component } from '@angular/core';

@Component({
    selector: 'bootstrap-doc',
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
