import { Component } from '@angular/core';
import { Code } from '@domain/code';

@Component({
    selector: 'button-raised-demo',
    template: `
        <app-docsectiontext>
            <p>Raised buttons display a shadow to indicate elevation.</p>
        </app-docsectiontext>
        <div class="card flex flex-wrap gap-3 justify-content-center">
            <p-button label="Primary" [raised]="true" />
            <p-button label="Secondary" [raised]="true" severity="secondary" />
            <p-button label="Success" [raised]="true" severity="success" />
            <p-button label="Info" [raised]="true" severity="info" />
            <p-button label="Warn" [raised]="true" severity="warn" />
            <p-button label="Help" [raised]="true" severity="help" />
            <p-button label="Danger" [raised]="true" severity="danger" />
            <p-button label="Contrast" [raised]="true" severity="contrast" />
        </div>
        <app-code [code]="code" selector="button-raised-demo"></app-code>
    `
})
export class RaisedDoc {
    code: Code = {
        basic: `<p-button label="Primary" [raised]="true" />
<p-button label="Secondary" [raised]="true" severity="secondary" />
<p-button label="Success" [raised]="true" severity="success" />
<p-button label="Info" [raised]="true" severity="info" />
<p-button label="Warn" [raised]="true" severity="warn" />
<p-button label="Help" [raised]="true" severity="help" />
<p-button label="Danger" [raised]="true" severity="danger" />
<p-button label="Contrast" [raised]="true" severity="contrast" />
`,

        html: `<div class="card flex flex-wrap gap-3 justify-content-center">
    <p-button label="Primary" [raised]="true" />
    <p-button label="Secondary" [raised]="true" severity="secondary" />
    <p-button label="Success" [raised]="true" severity="success" />
    <p-button label="Info" [raised]="true" severity="info" />
    <p-button label="Warn" [raised]="true" severity="warn" />
    <p-button label="Help" [raised]="true" severity="help" />
    <p-button label="Danger" [raised]="true" severity="danger" />
    <p-button label="Contrast" [raised]="true" severity="contrast" />
</div>`,

        typescript: `import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';

@Component({
    selector: 'button-raised-demo',
    templateUrl: './button-raised-demo.html',
    standalone: true,
    imports: [ButtonModule]
})
export class ButtonRaisedDemo { }`
    };
}
