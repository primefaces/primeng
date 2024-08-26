import { Component } from '@angular/core';
import { Code } from '@domain/code';

@Component({
    selector: 'badge-button-demo',
    template: `
        <app-docsectiontext>
            <p>Buttons have built-in support for badges to display a badge inline.</p>
        </app-docsectiontext>

        <div class="card flex flex-wrap justify-center gap-2">
            <p-button label="Emails" badge="8" />
            <p-button label="Messages" icon="pi pi-users" severity="secondary" badge="8" badgeSeverity="info" />
        </div>

        <app-code [code]="code" selector="badge-button-demo"></app-code>
    `
})
export class ButtonDoc {
    code: Code = {
        basic: `<p-button label="Emails" badge="8" />`,
        html: `<div class="card flex flex-wrap justify-center gap-2">
    <p-button 
        label="Emails" 
        badge="8" />
    <p-button 
        label="Messages" 
        icon="pi pi-users" 
        severity="secondary" 
        badge="8" 
        badgeClass="p-badge-info" />
</div>`,
        typescript: `import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';

@Component({
    selector: 'badge-button-demo',
    templateUrl: './badge-button-demo.html',
    standalone: true,
    imports: [ButtonModule]
})
export class BadgeButtonDemo {}`
    };
}
