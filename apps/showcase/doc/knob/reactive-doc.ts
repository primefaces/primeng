import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { KnobModule } from 'primeng/knob';
import { ButtonModule } from 'primeng/button';
import { AppCode } from '@/components/doc/app.code';
import { AppDemoWrapper } from '@/components/doc/app.demowrapper';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';

@Component({
    selector: 'reactive-doc',
    standalone: true,
    imports: [FormsModule, KnobModule, ButtonModule, AppCode, AppDemoWrapper, AppDocSectionText],
    template: `
        <app-docsectiontext>
            <p>Knob can be controlled with custom controls as well.</p>
        </app-docsectiontext>
        <app-demo-wrapper>
            <div class="flex flex-col items-center gap-2">
                <p-knob [(ngModel)]="value" size="150" readonly="true" />
                <div class="flex gap-2">
                    <p-button icon="pi pi-plus" (click)="value = value + 1" [disabled]="value >= 100" />
                    <p-button icon="pi pi-minus" (click)="value = value - 1" [disabled]="value <= 0" />
                </div>
            </div>
            <app-code></app-code>
        </app-demo-wrapper>
    `
})
export class ReactiveDoc {
    value: number = 0;
}
