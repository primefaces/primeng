import { Component } from '@angular/core';
import { Code } from '../../domain/code';

@Component({
    selector: 'button-text-demo',
    template: `
        <app-docsectiontext>
            <p>Text buttons are displayed as textual elements.</p>
        </app-docsectiontext>
        <div class="card flex flex-wrap gap-3 justify-content-center">
            <p-button label="Primary" [text]="true"></p-button>
            <p-button label="Secondary" [text]="true" severity="secondary"></p-button>
            <p-button label="Success" [text]="true" severity="success"></p-button>
            <p-button label="Info" [text]="true" severity="info"></p-button>
            <p-button label="Warning" [text]="true" severity="warning"></p-button>
            <p-button label="Help" [text]="true" severity="help"></p-button>
            <p-button label="Danger" [text]="true" severity="danger"></p-button>
            <p-button label="Plain" [text]="true" [plain]="true"></p-button>
        </div>
        <app-code [code]="code" selector="button-text-demo"></app-code>
    `
})
export class TextDoc {

    code: Code = {
        basic: `
<p-button label="Primary" [text]="true"></p-button>
<p-button label="Secondary" [text]="true" severity="secondary"></p-button>
<p-button label="Success" [text]="true" severity="success"></p-button>
<p-button label="Info" [text]="true" severity="info"></p-button>
<p-button label="Warning" [text]="true" severity="warning"></p-button>
<p-button label="Help" [text]="true" severity="help"></p-button>
<p-button label="Danger" [text]="true" severity="danger"></p-button>
<p-button label="Plain" [text]="true" [plain]="true"></p-button>`,

        html: `
<div class="card flex flex-wrap gap-3 justify-content-center">
    <p-button label="Primary" [text]="true"></p-button>
    <p-button label="Secondary" [text]="true" severity="secondary"></p-button>
    <p-button label="Success" [text]="true" severity="success"></p-button>
    <p-button label="Info" [text]="true" severity="info"></p-button>
    <p-button label="Warning" [text]="true" severity="warning"></p-button>
    <p-button label="Help" [text]="true" severity="help"></p-button>
    <p-button label="Danger" [text]="true" severity="danger"></p-button>
    <p-button label="Plain" [text]="true" [plain]="true"></p-button>
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
