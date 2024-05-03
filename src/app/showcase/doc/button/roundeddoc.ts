import { Component } from '@angular/core';
import { Code } from '@domain/code';

@Component({
    selector: 'button-rounded-demo',
    template: `
        <app-docsectiontext>
            <p>Rounded buttons have a circular border radius.</p>
        </app-docsectiontext>
        <div class="card flex flex-wrap gap-3 justify-content-center">
            <p-button label="Primary" [rounded]="true" />
            <p-button label="Secondary" [rounded]="true" severity="secondary" />
            <p-button label="Success" [rounded]="true" severity="success" />
            <p-button label="Info" [rounded]="true" severity="info" />
            <p-button label="Warning" [rounded]="true" severity="warning" />
            <p-button label="Help" [rounded]="true" severity="help" />
            <p-button label="Danger" [rounded]="true" severity="danger" />
        </div>
        <app-code [code]="code" selector="button-rounded-demo"></app-code>
    `
})
export class RoundedDoc {
    code: Code = {
        basic: `<p-button label="Primary" [rounded]="true" />
<p-button label="Secondary" [rounded]="true" severity="secondary" />
<p-button label="Success" [rounded]="true" severity="success" />
<p-button label="Info" [rounded]="true" severity="info" />
<p-button label="Warning" [rounded]="true" severity="warning" />
<p-button label="Help" [rounded]="true" severity="help" />
<p-button label="Danger" [rounded]="true" severity="danger" />`,

        html: `<div class="card flex flex-wrap gap-3 justify-content-center">
    <p-button label="Primary" [rounded]="true" />
    <p-button label="Secondary" [rounded]="true" severity="secondary" />
    <p-button label="Success" [rounded]="true" severity="success" />
    <p-button label="Info" [rounded]="true" severity="info" />
    <p-button label="Warning" [rounded]="true" severity="warning" />
    <p-button label="Help" [rounded]="true" severity="help" />
    <p-button label="Danger" [rounded]="true" severity="danger" />
</div>`,

        typescript: `import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';

@Component({
    selector: 'button-rounded-demo',
    templateUrl: './button-rounded-demo.html',
    standalone: true,
    imports: [ButtonModule]
})
export class ButtonRoundedDemo { }`
    };
}
