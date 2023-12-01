import { Component } from '@angular/core';
import { Code } from '../../domain/code';

@Component({
    selector: 'button-raisedtext-demo',
    template: `
        <app-docsectiontext>
            <p>Text buttons can be displayed as raised for elevation.</p>
        </app-docsectiontext>
        <div class="card flex flex-wrap gap-3 justify-content-center">
            <p-button label="Primary" [text]="true" [raised]="true"></p-button>
            <p-button label="Secondary" [text]="true" [raised]="true" severity="secondary"></p-button>
            <p-button label="Success" [text]="true" [raised]="true" severity="success"></p-button>
            <p-button label="Info" [text]="true" [raised]="true" severity="info"></p-button>
            <p-button label="Warning" [text]="true" [raised]="true" severity="warning"></p-button>
            <p-button label="Help" [text]="true" [raised]="true" severity="help"></p-button>
            <p-button label="Danger" [text]="true" [raised]="true" severity="danger"></p-button>
            <p-button label="Plain" [text]="true" [raised]="true" [plain]="true"></p-button>
        </div>
        <app-code [code]="code" selector="button-raisedtext-demo"></app-code>
    `
})
export class RaisedTextDoc {
    code: Code = {
        basic: `<p-button label="Primary" [text]="true" [raised]="true"></p-button>
<p-button label="Secondary" [text]="true" [raised]="true" severity="secondary"></p-button>
<p-button label="Success" [text]="true" [raised]="true" severity="success"></p-button>
<p-button label="Info" [text]="true" [raised]="true" severity="info"></p-button>
<p-button label="Warning" [text]="true" [raised]="true" severity="warning"></p-button>
<p-button label="Help" [text]="true" [raised]="true" severity="help"></p-button>
<p-button label="Danger" [text]="true" [raised]="true" severity="danger"></p-button>
<p-button label="Plain" [text]="true" [raised]="true" [plain]="true"></p-button>`,

        html: `
<div class="card flex flex-wrap gap-3 justify-content-center">
    <p-button label="Primary" [text]="true" [raised]="true"></p-button>
    <p-button label="Secondary" [text]="true" [raised]="true" severity="secondary"></p-button>
    <p-button label="Success" [text]="true" [raised]="true" severity="success"></p-button>
    <p-button label="Info" [text]="true" [raised]="true" severity="info"></p-button>
    <p-button label="Warning" [text]="true" [raised]="true" severity="warning"></p-button>
    <p-button label="Help" [text]="true" [raised]="true" severity="help"></p-button>
    <p-button label="Danger" [text]="true" [raised]="true" severity="danger"></p-button>
    <p-button label="Plain" [text]="true" [raised]="true" [plain]="true"></p-button>
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
