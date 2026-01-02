import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputNumberModule } from 'primeng/inputnumber';
import { AppCodeModule } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';

@Component({
    selector: 'vertical-doc',
    standalone: true,
    imports: [FormsModule, InputNumberModule, AppCodeModule, AppDocSectionText],
    template: `
        <app-docsectiontext>
            <p>Buttons can also placed vertically by setting <i>buttonLayout</i> as <i>vertical</i>.</p>
        </app-docsectiontext>
        <div class="card flex justify-center">
            <p-inputnumber [(ngModel)]="value1" [showButtons]="true" buttonLayout="vertical" spinnerMode="vertical" inputId="vertical" [inputStyle]="{ width: '3rem' }">
                <ng-template #incrementbuttonicon>
                    <span class="pi pi-plus"></span>
                </ng-template>
                <ng-template #decrementbuttonicon>
                    <span class="pi pi-minus"></span>
                </ng-template>
            </p-inputnumber>
        </div>
        <app-code selector="input-number-vertical-demo"></app-code>
    `
})
export class VerticalDoc {
    value1: number = 50;
}
