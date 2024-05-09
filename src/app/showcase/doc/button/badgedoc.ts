import { Component } from '@angular/core';
import { Code } from '@domain/code';

@Component({
    selector: 'button-badge-demo',
    template: `
        <app-docsectiontext>
            <p>Buttons have built-in <i>badge</i> support with badge and <i>badgeClass</i> properties.</p>
        </app-docsectiontext>
        <div class="card flex justify-content-center flex-wrap gap-3">
            <p-button label="Emails" badge="8" styleClass="m-0" />
            <p-button label="Messages" icon="pi pi-users" badge="8" badgeClass="p-badge-danger" styleClass="m-0" outlined="true" />
        </div>
        <app-code [code]="code" selector="button-badge-demo"></app-code>
    `
})
export class BadgeDoc {
    code: Code = {
        basic: `<p-button label="Emails" badge="8" />
<p-button 
    label="Messages" 
    icon="pi pi-users" 
    badge="8" 
    badgeClass="p-badge-danger" 
    outlined="true" />`,

        html: `<div class="card flex justify-content-center flex-wrap gap-3">
    <p-button label="Emails" badge="8" />
    <p-button 
        label="Messages" 
        icon="pi pi-users" 
        badge="8" 
        badgeClass="p-badge-danger" 
        outlined="true" />
</div>`,

        typescript: `import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';

@Component({
    selector: 'button-badge-demo',
    templateUrl: './button-badge-demo.html',
    standalone: true,
    imports: [ButtonModule]
})
export class ButtonBadgeDemo { }`
    };
}
