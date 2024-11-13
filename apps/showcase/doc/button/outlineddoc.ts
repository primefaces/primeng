import { Code } from '@/domain/code';
import { Component } from '@angular/core';

@Component({
    selector: 'button-outlined-demo',
    template: `
        <app-docsectiontext>
            <p>Outlined buttons display a border without a background initially.</p>
        </app-docsectiontext>
        <div class="card flex flex-wrap gap-4 justify-center">
            <p-button label="Primary" variant="outlined" />
            <p-button label="Secondary" variant="outlined" severity="secondary" />
            <p-button label="Success" variant="outlined" severity="success" />
            <p-button label="Info" variant="outlined" severity="info" />
            <p-button label="Warn" variant="outlined" severity="warn" />
            <p-button label="Help" variant="outlined" severity="help" />
            <p-button label="Danger" variant="outlined" severity="danger" />
            <p-button label="Contrast" variant="outlined" severity="contrast" />
        </div>
        <app-code [code]="code" selector="button-outlined-demo"></app-code>
    `
})
export class OutlinedDoc {
    code: Code = {
        basic: `<p-button label="Primary" variant="outlined" />
<p-button label="Secondary" variant="outlined" severity="secondary" />
<p-button label="Success" variant="outlined" severity="success" />
<p-button label="Info" variant="outlined" severity="info" />
<p-button label="Warn" variant="outlined" severity="warn" />
<p-button label="Help" variant="outlined" severity="help" />
<p-button label="Danger" variant="outlined" severity="danger" />
<p-button label="Contrast" variant="outlined" severity="contrast" />`,

        html: `<div class="card flex flex-wrap gap-4 justify-center">
    <p-button label="Primary" variant="outlined" />
    <p-button label="Secondary" variant="outlined" severity="secondary" />
    <p-button label="Success" variant="outlined" severity="success" />
    <p-button label="Info" variant="outlined" severity="info" />
    <p-button label="Warn" variant="outlined" severity="warn" />
    <p-button label="Help" variant="outlined" severity="help" />
    <p-button label="Danger" variant="outlined" severity="danger" />
    <p-button label="Contrast" variant="outlined" severity="contrast" />
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
