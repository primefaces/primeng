import { Code } from '@/domain/code';
import { Component } from '@angular/core';

@Component({
    selector: 'button-text-demo',
    template: `
        <app-docsectiontext>
            <p>Text buttons are displayed as textual elements.</p>
        </app-docsectiontext>
        <div class="card flex flex-wrap gap-4 justify-center">
            <p-button label="Primary" variant="text" />
            <p-button label="Secondary" variant="text" severity="secondary" />
            <p-button label="Success" variant="text" severity="success" />
            <p-button label="Info" variant="text" severity="info" />
            <p-button label="Warn" variant="text" severity="warn" />
            <p-button label="Help" variant="text" severity="help" />
            <p-button label="Danger" variant="text" severity="danger" />
            <p-button label="Plain" variant="text" />
        </div>
        <app-code [code]="code" selector="button-text-demo"></app-code>
    `
})
export class TextDoc {
    code: Code = {
        basic: `<p-button label="Primary" variant="text" />
<p-button label="Secondary" variant="text" severity="secondary" />
<p-button label="Success" variant="text" severity="success" />
<p-button label="Info" variant="text" severity="info" />
<p-button label="Warn" variant="text" severity="warn" />
<p-button label="Help" variant="text" severity="help" />
<p-button label="Danger" variant="text" severity="danger" />
<p-button label="Plain" variant="text" />`,

        html: `<div class="card flex flex-wrap gap-4 justify-center">
    <p-button label="Primary" variant="text" />
    <p-button label="Secondary" variant="text" severity="secondary" />
    <p-button label="Success" variant="text" severity="success" />
    <p-button label="Info" variant="text" severity="info" />
    <p-button label="Warn" variant="text" severity="warn" />
    <p-button label="Help" variant="text" severity="help" />
    <p-button label="Danger" variant="text" severity="danger" />
    <p-button label="Plain" variant="text" />
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
