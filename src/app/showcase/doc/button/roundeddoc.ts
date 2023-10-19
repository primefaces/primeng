import { Component, Input } from '@angular/core';
import { Code } from '../../domain/code';

@Component({
    selector: 'button-rounded-demo',
    template: ` <section class="py-4">
        <app-docsectiontext [title]="title" [id]="id">
            <p>Rounded buttons have a circular border radius.</p>
        </app-docsectiontext>
        <div class="card flex flex-wrap gap-3 justify-content-center">
            <p-button label="Primary" [rounded]="true"></p-button>
            <p-button label="Secondary" [rounded]="true" severity="secondary"></p-button>
            <p-button label="Success" [rounded]="true" severity="success"></p-button>
            <p-button label="Info" [rounded]="true" severity="info"></p-button>
            <p-button label="Warning" [rounded]="true" severity="warning"></p-button>
            <p-button label="Help" [rounded]="true" severity="help"></p-button>
            <p-button label="Danger" [rounded]="true" severity="danger"></p-button>
        </div>
        <app-code [code]="code" selector="button-rounded-demo"></app-code>
    </section>`
})
export class RoundedDoc {
    @Input() id: string;

    @Input() title: string;

    code: Code = {
        basic: `
<p-button label="Primary" [rounded]="true"></p-button>
<p-button label="Secondary" [rounded]="true" severity="secondary"></p-button>
<p-button label="Success" [rounded]="true" severity="success"></p-button>
<p-button label="Info" [rounded]="true" severity="info"></p-button>
<p-button label="Warning" [rounded]="true" severity="warning"></p-button>
<p-button label="Help" [rounded]="true" severity="help"></p-button>
<p-button label="Danger" [rounded]="true" severity="danger"></p-button>`,

        html: `
<div class="card flex flex-wrap gap-3 justify-content-center">
    <p-button label="Primary" [rounded]="true"></p-button>
    <p-button label="Secondary" [rounded]="true" severity="secondary"></p-button>
    <p-button label="Success" [rounded]="true" severity="success"></p-button>
    <p-button label="Info" [rounded]="true" severity="info"></p-button>
    <p-button label="Warning" [rounded]="true" severity="warning"></p-button>
    <p-button label="Help" [rounded]="true" severity="help"></p-button>
    <p-button label="Danger" [rounded]="true" severity="danger"></p-button>
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
