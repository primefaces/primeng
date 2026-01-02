import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RadioButtonModule } from 'primeng/radiobutton';
import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';

@Component({
    selector: 'disabled-doc',
    standalone: true,
    imports: [FormsModule, RadioButtonModule, AppCode, AppDocSectionText],
    template: `
        <app-docsectiontext>
            <p>When <i>disabled</i> is present, the element cannot be edited and focused.</p>
        </app-docsectiontext>
        <div class="card flex justify-center gap-2">
            <p-radiobutton [(ngModel)]="value" [value]="1" [disabled]="true" />
            <p-radiobutton [(ngModel)]="value" [value]="2" [disabled]="true" />
        </div>
        <app-code selector="radio-button-disabled-demo"></app-code>
    `
})
export class DisabledDoc {
    value: number = 2;
}
