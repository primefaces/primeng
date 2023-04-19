import { Component, Input } from '@angular/core';
import { Code } from '../../domain/code';

@Component({
    selector: 'button-severity-demo',
    template: ` <section>
        <app-docsectiontext [title]="title" [id]="id">
            <p>Severity defines the type of button.</p>
        </app-docsectiontext>
        <div class="card flex flex-wrap gap-3 justify-content-center">
            <p-button label="Primary"></p-button>
            <p-button label="Secondary" styleClass="p-button-secondary"></p-button>
            <p-button label="Success" styleClass="p-button-success"></p-button>
            <p-button label="Info" styleClass="p-button-info"></p-button>
            <p-button label="Warning" styleClass="p-button-warning"></p-button>
            <p-button label="Help" styleClass="p-button-help"></p-button>
            <p-button label="Danger" styleClass="p-button-danger"></p-button>
        </div>
        <app-code [code]="code" selector="button-severity-demo"></app-code>
    </section>`
})
export class SeverityDoc {
    @Input() id: string;

    @Input() title: string;

    code: Code = {
        basic: `
<p-button label="Primary"></p-button>
<p-button label="Secondary" styleClass="p-button-secondary"></p-button>
<p-button label="Success" styleClass="p-button-success"></p-button>
<p-button label="Info" styleClass="p-button-info"></p-button>
<p-button label="Warning" styleClass="p-button-warning"></p-button>
<p-button label="Help" styleClass="p-button-help"></p-button>
<p-button label="Danger" styleClass="p-button-danger"></p-button>`,

        html: `
<div class="card flex flex-wrap gap-3 justify-content-center">
    <p-button label="Primary"></p-button>
    <p-button label="Secondary" styleClass="p-button-secondary"></p-button>
    <p-button label="Success" styleClass="p-button-success"></p-button>
    <p-button label="Info" styleClass="p-button-info"></p-button>
    <p-button label="Warning" styleClass="p-button-warning"></p-button>
    <p-button label="Help" styleClass="p-button-help"></p-button>
    <p-button label="Danger" styleClass="p-button-danger"></p-button>
</div>`,

        typescript: `
import { Component } from '@angular/core';

@Component({
    selector: 'button-severity-demo',
    templateUrl: './button-severity-demo.html'
})
export class ButtonSeverityDemo { }`
    };
}
