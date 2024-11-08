import { Component } from '@angular/core';
import { Code } from '@domain/code';

@Component({
    selector: 'button-sizes-demo',
    template: `
        <app-docsectiontext>
            <p>Button provides <i>small</i> and <i>large</i> sizes as alternatives to the standard.</p>
        </app-docsectiontext>
        <div class="card flex justify-center flex-wrap gap-4 items-center">
            <p-button label="Small" icon="pi pi-check" size="small" />
            <p-button label="Normal" icon="pi pi-check" />
            <p-button label="Large" icon="pi pi-check" size="large" />
        </div>
        <app-code [code]="code" selector="button-sizes-demo"></app-code>
    `
})
export class SizesDoc {
    code: Code = {
        basic: `<p-button label="Small" icon="pi pi-check" size="small" />
<p-button label="Normal" icon="pi pi-check" />
<p-button label="Large" icon="pi pi-check" size="large" />`,

        html: `<div class="card flex justify-center flex-wrap gap-4 items-center">
    <p-button label="Small" icon="pi pi-check" size="small" />
    <p-button label="Normal" icon="pi pi-check" />
    <p-button label="Large" icon="pi pi-check" size="large" />
</div>`,

        typescript: `import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';

@Component({
    selector: 'button-sizes-demo',
    templateUrl: './button-sizes-demo.html',
    standalone: true,
    imports: [ButtonModule]
})
export class ButtonSizesDemo { }`
    };
}
