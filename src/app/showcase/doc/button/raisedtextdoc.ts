import { Component, Input } from '@angular/core';
import { Code } from '../../domain/code';

@Component({
    selector: 'button-raisedtext-demo',
    template: ` <section class="py-4">
        <app-docsectiontext [title]="title" [id]="id">
            <p>Text buttons can be displayed as raised for elevation.</p>
        </app-docsectiontext>
        <div class="card flex flex-wrap gap-3 justify-content-center">
            <p-button label="Primary" styleClass="p-button-raised p-button-text"></p-button>
            <p-button label="Secondary" styleClass="p-button-raised p-button-text p-button-secondary"></p-button>
            <p-button label="Success" styleClass="p-button-raised p-button-text p-button-success"></p-button>
            <p-button label="Info" styleClass="p-button-raised p-button-text p-button-info"></p-button>
            <p-button label="Warning" styleClass="p-button-raised p-button-text p-button-warning"></p-button>
            <p-button label="Help" styleClass="p-button-raised p-button-text p-button-help"></p-button>
            <p-button label="Danger" styleClass="p-button-raised p-button-text p-button-danger"></p-button>
        </div>
        <app-code [code]="code" selector="button-raisedtext-demo"></app-code>
    </section>`
})
export class RaisedTextDoc {
    @Input() id: string;

    @Input() title: string;

    code: Code = {
        basic: `
<p-button label="Primary" styleClass="p-button-raised p-button-text"></p-button>
<p-button label="Secondary" styleClass="p-button-raised p-button-text p-button-secondary"></p-button>
<p-button label="Success" styleClass="p-button-raised p-button-text p-button-success"></p-button>
<p-button label="Info" styleClass="p-button-raised p-button-text p-button-info"></p-button>
<p-button label="Warning" styleClass="p-button-raised p-button-text p-button-warning"></p-button>
<p-button label="Help" styleClass="p-button-raised p-button-text p-button-help"></p-button>
<p-button label="Danger" styleClass="p-button-raised p-button-text p-button-danger"></p-button>`,

        html: `
<div class="card flex flex-wrap gap-3 justify-content-center">
    <p-button label="Primary" styleClass="p-button-raised p-button-text"></p-button>
    <p-button label="Secondary" styleClass="p-button-raised p-button-text p-button-secondary"></p-button>
    <p-button label="Success" styleClass="p-button-raised p-button-text p-button-success"></p-button>
    <p-button label="Info" styleClass="p-button-raised p-button-text p-button-info"></p-button>
    <p-button label="Warning" styleClass="p-button-raised p-button-text p-button-warning"></p-button>
    <p-button label="Help" styleClass="p-button-raised p-button-text p-button-help"></p-button>
    <p-button label="Danger" styleClass="p-button-raised p-button-text p-button-danger"></p-button>
</div>`,

        typescript: `
import { Component } from '@angular/core';

@Component({
    selector: 'button-raisedtext-demo',
    templateUrl: './button-raisedtext-demo.html'
})
export class ButtonRaisedtextDemo { }`
    };
}
