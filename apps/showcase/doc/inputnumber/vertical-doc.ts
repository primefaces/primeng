import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputNumberModule } from 'primeng/inputnumber';
import { AppCode } from '@/components/doc/app.code';
import { AppDemoWrapper } from '@/components/doc/app.demowrapper';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';

@Component({
    selector: 'vertical-doc',
    standalone: true,
    imports: [FormsModule, InputNumberModule, AppCode, AppDemoWrapper, AppDocSectionText],
    template: `
        <app-docsectiontext>
            <p>Buttons can also placed vertically by setting <i>buttonLayout</i> as <i>vertical</i>.</p>
        </app-docsectiontext>
        <app-demo-wrapper>
            <div class="flex justify-center">
                <p-inputnumber [(ngModel)]="value1" [showButtons]="true" buttonLayout="vertical" spinnerMode="vertical" inputId="vertical" [inputStyle]="{ width: '3rem' }">
                    <ng-template #incrementbuttonicon>
                        <span class="pi pi-plus"></span>
                    </ng-template>
                    <ng-template #decrementbuttonicon>
                        <span class="pi pi-minus"></span>
                    </ng-template>
                </p-inputnumber>
            </div>
            <app-code></app-code>
        </app-demo-wrapper>
    `
})
export class VerticalDoc {
    value1: number = 50;
}
