import { Component, Input } from '@angular/core';
import { Code } from '../../domain/code';

@Component({
    selector: 'button-text-demo',
    template: ` <section class="py-4">
        <app-docsectiontext [title]="title" [id]="id">
            <p>Text buttons are displayed as textual elements.</p>
        </app-docsectiontext>
        <div class="card flex flex-wrap gap-3 justify-content-center">
            <p-button label="Primary" styleClass="p-button-text"></p-button>
            <p-button label="Secondary" styleClass="p-button-secondary p-button-text"></p-button>
            <p-button label="Success" styleClass="p-button-success p-button-text"></p-button>
            <p-button label="Info" styleClass="p-button-info p-button-text"></p-button>
            <p-button label="Warning" styleClass="p-button-warning p-button-text"></p-button>
            <p-button label="Help" styleClass="p-button-help p-button-text"></p-button>
            <p-button label="Danger" styleClass="p-button-danger p-button-text"></p-button>
        </div>
        <app-code [code]="code" selector="button-text-demo"></app-code>
    </section>`
})
export class TextDoc {
    @Input() id: string;

    @Input() title: string;

    code: Code = {
        basic: `
<p-button label="Primary" styleClass="p-button-text"></p-button>
<p-button label="Secondary" styleClass="p-button-secondary p-button-text"></p-button>
<p-button label="Success" styleClass="p-button-success p-button-text"></p-button>
<p-button label="Info" styleClass="p-button-info p-button-text"></p-button>
<p-button label="Warning" styleClass="p-button-warning p-button-text"></p-button>
<p-button label="Help" styleClass="p-button-help p-button-text"></p-button>
<p-button label="Danger" styleClass="p-button-danger p-button-text"></p-button>`,

        html: `
<div class="card flex flex-wrap gap-3 justify-content-center">
    <p-button label="Primary" styleClass="p-button-text"></p-button>
    <p-button label="Secondary" styleClass="p-button-secondary p-button-text"></p-button>
    <p-button label="Success" styleClass="p-button-success p-button-text"></p-button>
    <p-button label="Info" styleClass="p-button-info p-button-text"></p-button>
    <p-button label="Warning" styleClass="p-button-warning p-button-text"></p-button>
    <p-button label="Help" styleClass="p-button-help p-button-text"></p-button>
    <p-button label="Danger" styleClass="p-button-danger p-button-text"></p-button>
</div>`,

        typescript: `
import { Component } from '@angular/core';

@Component({
    selector: 'button-text-demo',
    templateUrl: './button-text-demo.html'
})
export class ButtonTextDemo { }`
    };
}
