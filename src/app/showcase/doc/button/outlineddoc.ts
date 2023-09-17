import { Component, Input } from '@angular/core';
import { Code } from '../../domain/code';

@Component({
    selector: 'button-outlined-demo',
    template: ` <section class="py-3">
        <app-docsectiontext [title]="title" [id]="id">
            <p>Outlined buttons display a border without a background initially.</p>
        </app-docsectiontext>
        <div class="card flex flex-wrap gap-3 justify-content-center">
            <p-button label="Primary" styleClass="p-button-outlined"></p-button>
            <p-button label="Secondary" styleClass="p-button-outlined p-button-secondary"></p-button>
            <p-button label="Success" styleClass="p-button-outlined p-button-success"></p-button>
            <p-button label="Info" styleClass="p-button-outlined p-button-info"></p-button>
            <p-button label="Warning" styleClass="p-button-outlined p-button-warning"></p-button>
            <p-button label="Help" styleClass="p-button-outlined p-button-help"></p-button>
            <p-button label="Danger" styleClass="p-button-outlined p-button-danger"></p-button>
        </div>
        <app-code [code]="code" selector="button-outlined-demo"></app-code>
    </section>`
})
export class OutlinedDoc {
    @Input() id: string;

    @Input() title: string;

    code: Code = {
        basic: `
<p-button label="Primary" styleClass="p-button-outlined"></p-button>
<p-button label="Secondary" styleClass="p-button-outlined p-button-secondary"></p-button>
<p-button label="Success" styleClass="p-button-outlined p-button-success"></p-button>
<p-button label="Info" styleClass="p-button-outlined p-button-info"></p-button>
<p-button label="Warning" styleClass="p-button-outlined p-button-warning"></p-button>
<p-button label="Help" styleClass="p-button-outlined p-button-help"></p-button>
<p-button label="Danger" styleClass="p-button-outlined p-button-danger"></p-button>`,

        html: `
<div class="card flex flex-wrap gap-3 justify-content-center">
    <p-button label="Primary" styleClass="p-button-outlined"></p-button>
    <p-button label="Secondary" styleClass="p-button-outlined p-button-secondary"></p-button>
    <p-button label="Success" styleClass="p-button-outlined p-button-success"></p-button>
    <p-button label="Info" styleClass="p-button-outlined p-button-info"></p-button>
    <p-button label="Warning" styleClass="p-button-outlined p-button-warning"></p-button>
    <p-button label="Help" styleClass="p-button-outlined p-button-help"></p-button>
    <p-button label="Danger" styleClass="p-button-outlined p-button-danger"></p-button>
</div>`,

        typescript: `
import { Component } from '@angular/core';

@Component({
    selector: 'button-outlined-demo',
    templateUrl: './button-outlined-demo.html'
})
export class ButtonOutlinedDemo { }`
    };
}
