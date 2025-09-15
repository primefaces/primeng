import { Code } from '@/domain/code';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { InputNumberModule } from 'primeng/inputnumber';
import { AppCodeModule } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';

@Component({
    selector: 'clear-icon-doc',
    standalone: true,
    imports: [FormsModule, RouterModule, InputNumberModule, AppCodeModule, AppDocSectionText],
    template: `
        <app-docsectiontext>
            <p>The <i>clearIcon</i> template allows you to customize the icon used to clear the input field.</p>
        </app-docsectiontext>
        <div class="card flex justify-center">
            <p-inputnumber [(ngModel)]="value" inputId="price_input" mode="currency" currency="USD" locale="en-US" [showClear]="true">
                <ng-template #clearicon>
                    <i class="pi pi-times"></i>
                </ng-template>
            </p-inputnumber>
        </div>
        <app-code [code]="code" selector="input-number-clear-icon-demo"></app-code>
    `
})
export class ClearIconDoc {
    value: number | undefined;

    code: Code = {
        basic: `<p-inputnumber [(ngModel)]="value" inputId="price_input" mode="currency" currency="USD" locale="en-US" [showClear]="true">
    <ng-template #clearicon>
        <i class="pi pi-times"></i>
    </ng-template>  
</p-inputnumber>`,

        html: `<div class="card flex justify-center">
    <p-inputnumber [(ngModel)]="value" inputId="price_input" mode="currency" currency="USD" locale="en-US" [showClear]="true">
        <ng-template #clearicon>
            <i class="pi pi-times"></i>
        </ng-template>  
    </p-inputnumber>
</div>`,

        typescript: `import { Component } from '@angular/core';
import { InputNumberModule } from 'primeng/inputnumber';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'input-number-clear-icon-demo',
    templateUrl: './input-number-clear-icon-demo.html',
    standalone: true,
    imports: [FormsModule, InputNumberModule]
})
export class InputNumberClearIconDemo {
    value: number | undefined;
}`
    };
}
