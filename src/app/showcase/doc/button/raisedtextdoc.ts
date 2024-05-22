import { Component } from '@angular/core';
import { Code } from '@domain/code';

@Component({
    selector: 'button-raisedtext-demo',
    template: `
        <app-docsectiontext>
            <p>Text buttons can be displayed as raised for elevation.</p>
        </app-docsectiontext>
        <div class="card flex flex-wrap gap-3 justify-content-center">
            <p-button label="Primary" [text]="true" [raised]="true" />
            <p-button label="Secondary" [text]="true" [raised]="true" severity="secondary" />
            <p-button label="Success" [text]="true" [raised]="true" severity="success" />
            <p-button label="Info" [text]="true" [raised]="true" severity="info" />
            <p-button label="Warning" [text]="true" [raised]="true" severity="warning" />
            <p-button label="Help" [text]="true" [raised]="true" severity="help" />
            <p-button label="Danger" [text]="true" [raised]="true" severity="danger" />
            <p-button label="Plain" [text]="true" [raised]="true" [plain]="true" />
        </div>
        <app-code [code]="code" selector="button-raisedtext-demo"></app-code>
    `
})
export class RaisedTextDoc {
    code: Code = {
        basic: `<p-button label="Primary" [text]="true" [raised]="true" />
<p-button label="Secondary" [text]="true" [raised]="true" severity="secondary" />
<p-button label="Success" [text]="true" [raised]="true" severity="success" />
<p-button label="Info" [text]="true" [raised]="true" severity="info" />
<p-button label="Warning" [text]="true" [raised]="true" severity="warning" />
<p-button label="Help" [text]="true" [raised]="true" severity="help" />
<p-button label="Danger" [text]="true" [raised]="true" severity="danger" />
<p-button label="Plain" [text]="true" [raised]="true" [plain]="true" />`,

        html: `<div class="card flex flex-wrap gap-3 justify-content-center">
    <p-button label="Primary" [text]="true" [raised]="true" />
    <p-button label="Secondary" [text]="true" [raised]="true" severity="secondary" />
    <p-button label="Success" [text]="true" [raised]="true" severity="success" />
    <p-button label="Info" [text]="true" [raised]="true" severity="info" />
    <p-button label="Warning" [text]="true" [raised]="true" severity="warning" />
    <p-button label="Help" [text]="true" [raised]="true" severity="help" />
    <p-button label="Danger" [text]="true" [raised]="true" severity="danger" />
    <p-button label="Plain" [text]="true" [raised]="true" [plain]="true" />
</div>`,

        typescript: `import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';

@Component({
    selector: 'button-raisedtext-demo',
    templateUrl: './button-raisedtext-demo.html',
    standalone: true,
    imports: [ButtonModule]
})
export class ButtonRaisedtextDemo { }`
    };
}
