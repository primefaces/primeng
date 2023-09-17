import { Component, Input } from '@angular/core';
import { Code } from '../../domain/code';

@Component({
    selector: 'button-rounded-demo',
    template: ` <section class="py-3">
        <app-docsectiontext [title]="title" [id]="id">
            <p>Rounded buttons have a circular border radius.</p>
        </app-docsectiontext>
        <div class="card flex flex-wrap gap-3 justify-content-center">
            <p-button label="Primary" styleClass="p-button-rounded"></p-button>
            <p-button label="Secondary" styleClass="p-button-rounded p-button-secondary"></p-button>
            <p-button label="Success" styleClass="p-button-rounded p-button-success"></p-button>
            <p-button label="Info" styleClass="p-button-rounded p-button-info"></p-button>
            <p-button label="Warning" styleClass="p-button-rounded p-button-warning"></p-button>
            <p-button label="Help" styleClass="p-button-rounded p-button-help"></p-button>
            <p-button label="Danger" styleClass="p-button-rounded p-button-danger"></p-button>
        </div>
        <app-code [code]="code" selector="button-rounded-demo"></app-code>
    </section>`
})
export class RoundedDoc {
    @Input() id: string;

    @Input() title: string;

    code: Code = {
        basic: `
<p-button label="Primary" styleClass="p-button-rounded"></p-button>
<p-button label="Secondary" styleClass="p-button-rounded p-button-secondary"></p-button>
<p-button label="Success" styleClass="p-button-rounded p-button-success"></p-button>
<p-button label="Info" styleClass="p-button-rounded p-button-info"></p-button>
<p-button label="Warning" styleClass="p-button-rounded p-button-warning"></p-button>
<p-button label="Help" styleClass="p-button-rounded p-button-help"></p-button>
<p-button label="Danger" styleClass="p-button-rounded p-button-danger"></p-button>`,

        html: `
<div class="card flex flex-wrap gap-3 justify-content-center">
    <p-button label="Primary" styleClass="p-button-rounded"></p-button>
    <p-button label="Secondary" styleClass="p-button-rounded p-button-secondary"></p-button>
    <p-button label="Success" styleClass="p-button-rounded p-button-success"></p-button>
    <p-button label="Info" styleClass="p-button-rounded p-button-info"></p-button>
    <p-button label="Warning" styleClass="p-button-rounded p-button-warning"></p-button>
    <p-button label="Help" styleClass="p-button-rounded p-button-help"></p-button>
    <p-button label="Danger" styleClass="p-button-rounded p-button-danger"></p-button>
</div>`,

        typescript: `
import { Component } from '@angular/core';

@Component({
    selector: 'button-rounded-demo',
    templateUrl: './button-rounded-demo.html'
})
export class ButtonRoundedDemo { }`
    };
}
