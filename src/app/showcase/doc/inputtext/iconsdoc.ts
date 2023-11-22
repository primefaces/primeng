import { Component } from '@angular/core';
import { Code } from '../../domain/code';

@Component({
    selector: 'icons-doc',
    template: `
        <app-docsectiontext>
            <p>Icons can be placed inside an input element by wrapping both the input and the icon with an element that has either <i>.p-input-icon-left</i> or <i>p-input-icon-right</i> class.</p>
        </app-docsectiontext>
        <div class="card flex flex-wrap justify-content-center gap-3">
            <span class="p-input-icon-left">
                <i class="pi pi-search"></i>
                <input type="text" pInputText [(ngModel)]="value" />
            </span>

            <span class="p-input-icon-right">
                <i class="pi pi-spin pi-spinner"></i>
                <input type="text" pInputText [(ngModel)]="value2" />
            </span>
        </div>
        <app-code [code]="code" selector="input-text-icons-demo"></app-code>
    `
})
export class IconsDoc {
    
    value: string | undefined;

    value2: string | undefined;

    code: Code = {
        basic: `
<span class="p-input-icon-left">
    <i class="pi pi-search"></i>
    <input type="text" pInputText [(ngModel)]="value" />
</span>`,

        html: `
<div class="card flex flex-wrap justify-content-center gap-3">
    <span class="p-input-icon-left">
        <i class="pi pi-search"></i>
        <input type="text" pInputText [(ngModel)]="value" />
    </span>
    
    <span class="p-input-icon-right">
        <i class="pi pi-spin pi-spinner"></i>
        <input type="text" pInputText [(ngModel)]="value2" />
    </span>
</div>`,

        typescript: `
import { Component } from '@angular/core';

@Component({
    selector: 'input-text-icons-demo',
    templateUrl: './input-text-icons-demo.html'
})
export class InputTextIconsDemo {
    value: string | undefined;
    
    value2: string | undefined;
}`
    };
}
