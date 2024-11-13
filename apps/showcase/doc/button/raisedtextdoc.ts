import { Code } from '@/domain/code';
import { Component } from '@angular/core';

@Component({
    selector: 'button-raisedtext-demo',
    template: `
        <app-docsectiontext>
            <p>Text buttons can be displayed as raised for elevation.</p>
        </app-docsectiontext>
        <div class="card flex flex-wrap gap-4 justify-center">
            <p-button label="Primary" variant="text" [raised]="true" />
            <p-button label="Secondary" variant="text" [raised]="true" severity="secondary" />
            <p-button label="Success" variant="text" [raised]="true" severity="success" />
            <p-button label="Info" variant="text" [raised]="true" severity="info" />
            <p-button label="Warn" variant="text" [raised]="true" severity="warn" />
            <p-button label="Help" variant="text" [raised]="true" severity="help" />
            <p-button label="Danger" variant="text" [raised]="true" severity="danger" />
            <p-button label="Plain" variant="text" [raised]="true" />
        </div>
        <app-code [code]="code" selector="button-raisedtext-demo"></app-code>
    `
})
export class RaisedTextDoc {
    code: Code = {
        basic: `<p-button label="Primary" variant="text" [raised]="true" />
<p-button label="Secondary" variant="text" [raised]="true" severity="secondary" />
<p-button label="Success" variant="text" [raised]="true" severity="success" />
<p-button label="Info" variant="text" [raised]="true" severity="info" />
<p-button label="Warn" variant="text" [raised]="true" severity="warn" />
<p-button label="Help" variant="text" [raised]="true" severity="help" />
<p-button label="Danger" variant="text" [raised]="true" severity="danger" />
<p-button label="Plain" variant="text" [raised]="true" />`,

        html: `<div class="card flex flex-wrap gap-4 justify-center">
    <p-button label="Primary" variant="text" [raised]="true" />
    <p-button label="Secondary" variant="text" [raised]="true" severity="secondary" />
    <p-button label="Success" variant="text" [raised]="true" severity="success" />
    <p-button label="Info" variant="text" [raised]="true" severity="info" />
    <p-button label="Warn" variant="text" [raised]="true" severity="warn" />
    <p-button label="Help" variant="text" [raised]="true" severity="help" />
    <p-button label="Danger" variant="text" [raised]="true" severity="danger" />
    <p-button label="Plain" variant="text" [raised]="true" />
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
