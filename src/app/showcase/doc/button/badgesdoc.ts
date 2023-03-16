import { Component, Input } from '@angular/core';
import { Code } from '../../domain/code';

@Component({
    selector: 'button-badges-demo',
    template: ` <div>
        <app-docsectiontext [title]="title" [id]="id">
            <p>Buttons have built-in <i>badge</i> support with badge and <i>badgeClass</i> properties.</p>
        </app-docsectiontext>
        <div class="card flex justify-content-center">
            <p-button label="Emails" badge="8"></p-button>
            <p-button label="Messages" icon="pi pi-users" styleClass="p-button-warning" badge="8" badgeClass="p-badge-danger"></p-button>
        </div>
        <app-code [code]="code" selector="button-badges-demo"></app-code>
    </div>`
})
export class BadgesDoc {
    @Input() id: string;

    @Input() title: string;

    code: Code = {
        basic: `
<p-button label="Emails" badge="8"></p-button>
<p-button label="Messages" icon="pi pi-users" styleClass="p-button-warning" badge="8" badgeClass="p-badge-danger"></p-button>`,

        html: `
<div class="card flex justify-content-center">
    <p-button label="Emails" badge="8"></p-button>
    <p-button label="Messages" icon="pi pi-users" styleClass="p-button-warning" badge="8" badgeClass="p-badge-danger"></p-button>
</div>`,

        typescript: `
import { Component } from '@angular/core';

@Component({
    selector: 'button-badges-demo',
    templateUrl: './button-badges-demo.html',
    styleUrls: ['./button-badges-demo.scss']
})
export class ButtonBadgesDemo { }`
    };
}
