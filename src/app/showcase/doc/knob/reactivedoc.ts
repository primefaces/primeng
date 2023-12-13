import { Component } from '@angular/core';
import { Code } from '../../domain/code';

@Component({
    selector: 'reactive-doc',
    template: `
        <app-docsectiontext>
            <p>Knob can be controlled with custom controls as well.</p>
        </app-docsectiontext>
        <div class="card flex flex-column align-items-center gap-2">
            <p-knob [(ngModel)]="value" size="150" readonly="true"></p-knob>
            <div class="flex gap-2">
                <p-button icon="pi pi-plus" (click)="value = value+1" [disabled]="value >= 100" />
                <p-button icon="pi pi-minus" (click)="value = value-1" [disabled]="value <= 0" />
            </div>
        </div>
        <app-code [code]="code" selector="knob-reactive-demo"></app-code>
    `
})
export class ReactiveDoc {
    value: number = 0;

    code: Code = {
        basic: `<p-knob [(ngModel)]="value" size="150" readonly="true"></p-knob>
<div class="flex gap-2">
    <p-button icon="pi pi-plus" (click)="value = value+1" [disabled]="value >= 100" />
    <p-button icon="pi pi-minus" (click)="value = value-1" [disabled]="value <= 0" />
</div>`,

        html: `<div class="card flex flex-column align-items-center gap-2">
<p-knob [(ngModel)]="value" size="150" readonly="true"></p-knob>
<div class="flex gap-2">
    <p-button icon="pi pi-plus" (click)="value = value+1" [disabled]="value >= 100" />
    <p-button icon="pi pi-minus" (click)="value = value-1" [disabled]="value <= 0" />
</div>
</div>`,

        typescript: `
import { Component } from '@angular/core';

@Component({
    selector: 'knob-reactive-demo',
    templateUrl: './knob-reactive-demo.html'
})
export class KnobReactiveDemo {
    value: number = 0;
}`
    };
}
