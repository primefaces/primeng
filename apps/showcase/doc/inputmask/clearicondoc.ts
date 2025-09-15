import { Code } from '@/domain/code';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputMaskModule } from 'primeng/inputmask';
import { AppCodeModule } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';

@Component({
    selector: 'clear-icon-doc',
    standalone: true,
    imports: [FormsModule, InputMaskModule, AppCodeModule, AppDocSectionText],
    template: `
        <app-docsectiontext>
            <p>InputMask is used as a controlled input with <i>ngModel</i> properties.</p>
        </app-docsectiontext>
        <div class="card flex justify-center">
            <p-inputmask mask="99-999999" [(ngModel)]="value" placeholder="99-999999" [showClear]="true">
                <ng-template #clearicon>
                    <i class="pi pi-times-circle"></i>
                </ng-template>
            </p-inputmask>
        </div>
        <app-code [code]="code" selector="input-mask-clear-icon-demo"></app-code>
    `
})
export class ClearIconDoc {
    value: string | undefined;

    code: Code = {
        basic: `<p-inputmask mask="99-999999" [(ngModel)]="value" placeholder="99-999999" [showClear]="true">
    <ng-template #clearicon>
        <i class="pi pi-times-circle"></i>
    </ng-template>
</p-inputmask>`,

        html: `<div class="card flex justify-center">
    <p-inputmask mask="99-999999" [(ngModel)]="value" placeholder="99-999999" [showClear]="true">
        <ng-template #clearicon>
            <i class="pi pi-times-circle"></i>
        </ng-template>
    </p-inputmask>
</div>`,

        typescript: `import { Component } from '@angular/core';
import { InputMask } from 'primeng/inputmask';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'input-mask-clear-icon-demo',
    templateUrl: './input-mask-clear-icon-demo.html',
    standalone: true,
    imports: [FormsModule, InputMask]
})
export class InputMaskClearIconDemo {
    value: string | undefined;
}`
    };
}
