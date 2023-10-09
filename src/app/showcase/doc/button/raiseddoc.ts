import { Component, Input } from '@angular/core';
import { Code } from '../../domain/code';

@Component({
    selector: 'button-raised-demo',
    template: ` <section class="py-4">
        <app-docsectiontext [title]="title" [id]="id">
            <p>Raised buttons display a shadow to indicate elevation.</p>
        </app-docsectiontext>
        <div class="card flex flex-wrap gap-3 justify-content-center">
            <p-button label="Primary" styleClass="p-button-raised"></p-button>
            <p-button label="Secondary" styleClass="p-button-raised p-button-secondary"></p-button>
            <p-button label="Success" styleClass="p-button-raised p-button-success"></p-button>
            <p-button label="Info" styleClass="p-button-raised p-button-info"></p-button>
            <p-button label="Warning" styleClass="p-button-raised p-button-warning"></p-button>
            <p-button label="Help" styleClass="p-button-raised p-button-help"></p-button>
            <p-button label="Danger" styleClass="p-button-raised p-button-danger"></p-button>
        </div>
        <app-code [code]="code" selector="button-raised-demo"></app-code>
    </section>`
})
export class RaisedDoc {
    @Input() id: string;

    @Input() title: string;

    code: Code = {
        basic: `
<p-button label="Primary" styleClass="p-button-raised"></p-button>
<p-button label="Secondary" styleClass="p-button-raised p-button-secondary"></p-button>
<p-button label="Success" styleClass="p-button-raised p-button-success"></p-button>
<p-button label="Info" styleClass="p-button-raised p-button-info"></p-button>
<p-button label="Warning" styleClass="p-button-raised p-button-warning"></p-button>
<p-button label="Help" styleClass="p-button-raised p-button-help"></p-button>
<p-button label="Danger" styleClass="p-button-raised p-button-danger"></p-button>`,

        html: `
<div class="card flex flex-wrap gap-3 justify-content-center">
    <p-button label="Primary" styleClass="p-button-raised"></p-button>
    <p-button label="Secondary" styleClass="p-button-raised p-button-secondary"></p-button>
    <p-button label="Success" styleClass="p-button-raised p-button-success"></p-button>
    <p-button label="Info" styleClass="p-button-raised p-button-info"></p-button>
    <p-button label="Warning" styleClass="p-button-raised p-button-warning"></p-button>
    <p-button label="Help" styleClass="p-button-raised p-button-help"></p-button>
    <p-button label="Danger" styleClass="p-button-raised p-button-danger"></p-button>
</div>`,

        typescript: `
import { Component } from '@angular/core';

@Component({
    selector: 'button-raised-demo',
    templateUrl: './button-raised-demo.html'
})
export class ButtonRaisedDemo { }`
    };
}
