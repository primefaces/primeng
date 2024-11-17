import { Code } from '@/domain/code';
import { Component } from '@angular/core';

@Component({
    selector: 'badge-button-demo',
    template: `
        <app-docsectiontext>
            <p>Buttons have built-in support for badges to display a badge inline.</p>
        </app-docsectiontext>

        <div class="card flex justify-center flex-wrap gap-4">
            <p-button label="Emails" icon="pi pi-bell" label="Notifications" badge="2" />
            <p-button label="Inbox" icon="pi pi-inbox" badge="2" badgeSeverity="contrast" outlined />
        </div>

        <app-code [code]="code" selector="badge-button-demo"></app-code>
    `
})
export class ButtonDoc {
    code: Code = {
        basic: `<p-button label="Emails" icon="pi pi-bell" label="Notifications" badge="2" />`,
        html: `<div class="card flex justify-center flex-wrap gap-4">
    <p-button label="Emails" badge="2" label="Notifications" icon="pi pi-bell" />
    <p-button label="Inbox" icon="pi pi-inbox" badge="2" badgeSeverity="contrast" outlined/>
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
