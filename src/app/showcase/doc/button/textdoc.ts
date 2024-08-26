import { Component } from '@angular/core';
import { Code } from '@domain/code';

@Component({
    selector: 'button-text-demo',
    template: `
        <app-docsectiontext>
            <p>Text buttons are displayed as textual elements.</p>
        </app-docsectiontext>
        <div class="card flex flex-wrap gap-4 justify-center">
            <p-button label="Primary" [text]="true" />
            <p-button label="Secondary" [text]="true" severity="secondary" />
            <p-button label="Success" [text]="true" severity="success" />
            <p-button label="Info" [text]="true" severity="info" />
            <p-button label="Warn" [text]="true" severity="warn" />
            <p-button label="Help" [text]="true" severity="help" />
            <p-button label="Danger" [text]="true" severity="danger" />
            <p-button label="Plain" [text]="true" [plain]="true" />
        </div>
        <app-code [code]="code" selector="button-text-demo"></app-code>
    `
})
export class TextDoc {
    code: Code = {
        basic: `<p-button label="Primary" [text]="true" />
<p-button label="Secondary" [text]="true" severity="secondary" />
<p-button label="Success" [text]="true" severity="success" />
<p-button label="Info" [text]="true" severity="info" />
<p-button label="Warn" [text]="true" severity="warn" />
<p-button label="Help" [text]="true" severity="help" />
<p-button label="Danger" [text]="true" severity="danger" />
<p-button label="Plain" [text]="true" [plain]="true" />`,

        html: `<div class="card flex flex-wrap gap-4 justify-center">
    <p-button label="Primary" [text]="true" />
    <p-button label="Secondary" [text]="true" severity="secondary" />
    <p-button label="Success" [text]="true" severity="success" />
    <p-button label="Info" [text]="true" severity="info" />
    <p-button label="Warn" [text]="true" severity="warn" />
    <p-button label="Help" [text]="true" severity="help" />
    <p-button label="Danger" [text]="true" severity="danger" />
    <p-button label="Plain" [text]="true" [plain]="true" />
</div>`,

        typescript: `import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';

@Component({
    selector: 'button-text-demo',
    templateUrl: './button-text-demo.html',
    standalone: true,
    imports: [ButtonModule]
})
export class ButtonTextDemo { }`
    };
}
