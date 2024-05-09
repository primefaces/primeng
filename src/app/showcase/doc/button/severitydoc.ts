import { Component } from '@angular/core';
import { Code } from '@domain/code';

@Component({
    selector: 'button-severity-demo',
    template: `
        <app-docsectiontext>
            <p>Severity defines the type of button.</p>
        </app-docsectiontext>
        <div class="card flex flex-wrap gap-3 justify-content-center">
            <p-button label="Primary" />
            <p-button label="Secondary" severity="secondary" />
            <p-button label="Success" severity="success" />
            <p-button label="Info" severity="info" />
            <p-button label="Warning" severity="warning" />
            <p-button label="Help" severity="help" />
            <p-button label="Danger" severity="danger" />
            <p-button label="Contrast" severity="contrast" />
        </div>
        <app-code [code]="code" selector="button-severity-demo"></app-code>
    `
})
export class SeverityDoc {
    code: Code = {
        basic: `<p-button label="Primary" />
<p-button label="Secondary" severity="secondary" />
<p-button label="Success" severity="success" />
<p-button label="Info" severity="info" />
<p-button label="Warning" severity="warning" />
<p-button label="Help" severity="help" />
<p-button label="Danger" severity="danger" />
<p-button label="Contrast" severity="contrast" />`,

        html: `<div class="card flex flex-wrap gap-3 justify-content-center">
    <p-button label="Primary" />
    <p-button label="Secondary" severity="secondary" />
    <p-button label="Success" severity="success" />
    <p-button label="Info" severity="info" />
    <p-button label="Warning" severity="warning" />
    <p-button label="Help" severity="help" />
    <p-button label="Danger" severity="danger" />
    <p-button label="Contrast" severity="contrast" />
</div>`,

        typescript: `import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';

@Component({
    selector: 'button-severity-demo',
    templateUrl: './button-severity-demo.html',
    standalone: true,
    imports: [ButtonModule]
})
export class ButtonSeverityDemo { }`
    };
}
