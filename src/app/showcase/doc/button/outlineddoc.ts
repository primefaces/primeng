import { Component } from '@angular/core';
import { Code } from '@domain/code';

@Component({
    selector: 'button-outlined-demo',
    template: `
        <app-docsectiontext>
            <p>Outlined buttons display a border without a background initially.</p>
        </app-docsectiontext>
        <div class="card flex flex-wrap gap-3 justify-content-center">
            <p-button label="Primary" [outlined]="true"></p-button>
            <p-button label="Secondary" [outlined]="true" severity="secondary"></p-button>
            <p-button label="Success" [outlined]="true" severity="success"></p-button>
            <p-button label="Info" [outlined]="true" severity="info"></p-button>
            <p-button label="Warning" [outlined]="true" severity="warning"></p-button>
            <p-button label="Help" [outlined]="true" severity="help"></p-button>
            <p-button label="Danger" [outlined]="true" severity="danger"></p-button>
        </div>
        <app-code [code]="code" selector="button-outlined-demo"></app-code>
    `
})
export class OutlinedDoc {
    code: Code = {
        basic: `<p-button label="Primary" [outlined]="true"></p-button>
<p-button label="Secondary" [outlined]="true" severity="secondary"></p-button>
<p-button label="Success" [outlined]="true" severity="success"></p-button>
<p-button label="Info" [outlined]="true" severity="info"></p-button>
<p-button label="Warning" [outlined]="true" severity="warning"></p-button>
<p-button label="Help" [outlined]="true" severity="help"></p-button>
<p-button label="Danger" [outlined]="true" severity="danger"></p-button>`,

        html: `
<div class="card flex flex-wrap gap-3 justify-content-center">
    <p-button label="Primary" [outlined]="true"></p-button>
    <p-button label="Secondary" [outlined]="true" severity="secondary"></p-button>
    <p-button label="Success" [outlined]="true" severity="success"></p-button>
    <p-button label="Info" [outlined]="true" severity="info"></p-button>
    <p-button label="Warning" [outlined]="true" severity="warning"></p-button>
    <p-button label="Help" [outlined]="true" severity="help"></p-button>
    <p-button label="Danger" [outlined]="true" severity="danger"></p-button>
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
