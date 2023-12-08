import { Component } from '@angular/core';
import { Code } from '../../domain/code';

@Component({
    selector: 'button-badge-demo',
    template: `
        <app-docsectiontext>
            <p>Buttons have built-in <i>badge</i> support with badge and <i>badgeClass</i> properties.</p>
        </app-docsectiontext>
        <div class="card flex justify-content-center flex-wrap gap-3">
            <p-button label="Emails" badge="8" styleClass="m-0"></p-button>
            <p-button label="Messages" icon="pi pi-users"  badge="8" badgeClass="p-badge-danger" styleClass="m-0" outlined="true"></p-button>
        </div>
        <app-code [code]="code" selector="button-badge-demo"></app-code>
    `
})
export class BadgeDoc {
    code: Code = {
        basic: `<p-button label="Emails" badge="8"></p-button>
<p-button label="Messages" icon="pi pi-users"  badge="8" badgeClass="p-badge-danger" outlined="true"></p-button>`,

        html: `<div class="card flex justify-content-center flex-wrap gap-3">
    <p-button label="Emails" badge="8"></p-button>
    <p-button label="Messages" icon="pi pi-users"  badge="8" badgeClass="p-badge-danger" outlined="true"></p-button>
</div>`,

        typescript: `
import { Component } from '@angular/core';

@Component({
    selector: 'button-badge-demo',
    templateUrl: './button-badge-demo.html'
})
export class ButtonBadgeDemo { }`
    };
}
