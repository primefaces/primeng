import { Code } from '@/domain/code';
import { Component } from '@angular/core';

@Component({
    selector: 'button-group-demo',
    template: `
        <app-docsectiontext>
            <p>Multiple buttons are grouped when wrapped inside an element with <i>ButtonGroup</i> component.</p>
        </app-docsectiontext>
        <div class="card flex justify-center">
            <p-buttongroup>
                <p-button label="Save" icon="pi pi-check" />
                <p-button label="Delete" icon="pi pi-trash" />
                <p-button label="Cancel" icon="pi pi-times" />
            </p-buttongroup>
        </div>
        <app-code [code]="code" selector="button-group-demo"></app-code>
    `
})
export class ButtonGroupDoc {
    code: Code = {
        basic: `<p-buttongroup>
    <p-button label="Save" icon="pi pi-check" />
    <p-button label="Delete" icon="pi pi-trash" />
    <p-button label="Cancel" icon="pi pi-times" />
</p-buttongroup>`,

        html: `<div class="card flex justify-center">
    <p-buttongroup>
        <p-button label="Save" icon="pi pi-check" />
        <p-button label="Delete" icon="pi pi-trash" />
        <p-button label="Cancel" icon="pi pi-times" />
    </p-buttongroup>
</div>`,

        typescript: `import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';

@Component({
    selector: 'button-group-demo',
    templateUrl: './button-group-demo.html',
    standalone: true,
    imports: [ButtonModule]
})
export class ButtonGroupDemo { }`
    };
}
