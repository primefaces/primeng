import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { KnobModule } from 'primeng/knob';
import { ButtonModule } from 'primeng/button';
import { AppCodeModule } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';

@Component({
    selector: 'reactive-doc',
    standalone: true,
    imports: [FormsModule, KnobModule, ButtonModule, AppCodeModule, AppDocSectionText],
    template: `
        <app-docsectiontext>
            <p>Knob can be controlled with custom controls as well.</p>
        </app-docsectiontext>
        <div class="card flex flex-col items-center gap-2">
            <p-knob [(ngModel)]="value" size="150" readonly="true" />
            <div class="flex gap-2">
                <p-button icon="pi pi-plus" (click)="value = value + 1" [disabled]="value >= 100" />
                <p-button icon="pi pi-minus" (click)="value = value - 1" [disabled]="value <= 0" />
            </div>
        </div>
        <app-code selector="knob-reactive-demo"></app-code>
    `
})
export class ReactiveDoc {
    value: number = 0;
}
