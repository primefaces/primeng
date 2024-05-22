import { Component } from '@angular/core';
import { Code } from '@domain/code';

@Component({
    selector: 'button-icons-demo',
    template: `
        <app-docsectiontext>
            <p>Icon of a button is specified with <i>icon</i> property and position is configured using <i>iconPos</i> attribute.</p>
        </app-docsectiontext>
        <div class="card flex flex-wrap justify-content-center gap-3">
            <p-button icon="pi pi-check" />
            <p-button label="Submit" icon="pi pi-check" />
            <p-button label="Submit" icon="pi pi-check" iconPos="right" />
        </div>
        <app-code [code]="code" selector="button-icons-demo"></app-code>
    `
})
export class IconsDoc {
    code: Code = {
        basic: `<p-button icon="pi pi-check" />
<p-button label="Submit" icon="pi pi-check" />
<p-button label="Submit" icon="pi pi-check" iconPos="right" />`,

        html: `<div class="card flex justify-content-center">
    <p-button icon="pi pi-check" />
    <p-button label="Submit" icon="pi pi-check" />
    <p-button label="Submit" icon="pi pi-check" iconPos="right" />
</div>`,

        typescript: `import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';

@Component({
    selector: 'button-icons-demo',
    templateUrl: './button-icons-demo.html',
    standalone: true,
    imports: [ButtonModule]
})
export class ButtonIconsDemo { }`
    };
}
