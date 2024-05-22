import { Component } from '@angular/core';
import { Code } from '@domain/code';

@Component({
    selector: 'button-outlined-demo',
    template: `
        <app-docsectiontext>
            <p>Outlined buttons display a border without a background initially.</p>
        </app-docsectiontext>
        <div class="card flex flex-wrap gap-3 justify-content-center">
            <p-button label="Primary" [outlined]="true" />
            <p-button label="Secondary" [outlined]="true" severity="secondary" />
            <p-button label="Success" [outlined]="true" severity="success" />
            <p-button label="Info" [outlined]="true" severity="info" />
            <p-button label="Warning" [outlined]="true" severity="warning" />
            <p-button label="Help" [outlined]="true" severity="help" />
            <p-button label="Danger" [outlined]="true" severity="danger" />
            <p-button label="Contrast" [outlined]="true" severity="contrast" />
        </div>
        <app-code [code]="code" selector="button-outlined-demo"></app-code>
    `
})
export class OutlinedDoc {
    code: Code = {
        basic: `<p-button label="Primary" [outlined]="true" />
<p-button label="Secondary" [outlined]="true" severity="secondary" />
<p-button label="Success" [outlined]="true" severity="success" />
<p-button label="Info" [outlined]="true" severity="info" />
<p-button label="Warning" [outlined]="true" severity="warning" />
<p-button label="Help" [outlined]="true" severity="help" />
<p-button label="Danger" [outlined]="true" severity="danger" />
<p-button label="Contrast" [outlined]="true" severity="contrast" />`,

        html: `<div class="card flex flex-wrap gap-3 justify-content-center">
    <p-button label="Primary" [outlined]="true" />
    <p-button label="Secondary" [outlined]="true" severity="secondary" />
    <p-button label="Success" [outlined]="true" severity="success" />
    <p-button label="Info" [outlined]="true" severity="info" />
    <p-button label="Warning" [outlined]="true" severity="warning" />
    <p-button label="Help" [outlined]="true" severity="help" />
    <p-button label="Danger" [outlined]="true" severity="danger" />
    <p-button label="Contrast" [outlined]="true" severity="contrast" />
</div>`,

        typescript: `import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';

@Component({
    selector: 'button-outlined-demo',
    templateUrl: './button-outlined-demo.html',
    standalone: true,
    imports: [ButtonModule]
})
export class ButtonOutlinedDemo { }`
    };
}
