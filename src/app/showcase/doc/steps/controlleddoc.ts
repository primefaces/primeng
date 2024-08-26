import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Code } from '@domain/code';

@Component({
    selector: 'controlled-doc',
    template: `
        <app-docsectiontext>
            <p>Steps can be controlled programmatically using <i>activeIndex</i> property.</p>
        </app-docsectiontext>
        <div class="card">
            <div class="flex mb-8 gap-2 justify-end">
                <p-button (click)="active = 0" [rounded]="true" label="1" styleClass="w-8 h-8 p-0" [outlined]="active !== 0" />
                <p-button (click)="active = 1" [rounded]="true" label="2" styleClass="w-8 h-8 p-0" [outlined]="active !== 1" />
                <p-button (click)="active = 2" [rounded]="true" label="3" styleClass="w-8 h-8 p-0" [outlined]="active !== 2" />
            </div>
            <p-steps [activeIndex]="active" [model]="items" />
        </div>
        <app-code [code]="code" selector="steps-controlled-demo"></app-code>
    `
})
export class ControlledDoc implements OnInit {
    items: MenuItem[] | undefined;

    active: number = 0;

    ngOnInit() {
        this.items = [
            {
                label: 'Personal Info'
            },
            {
                label: 'Reservation'
            },
            {
                label: 'Review'
            }
        ];
    }

    code: Code = {
        basic: `<div class="flex mb-8 gap-2 justify-end">
    <p-button 
        (click)="active = 0" 
        [rounded]="true" 
        label="1" 
        styleClass="w-8 h-8 p-0" 
        [outlined]="active !== 0" />
    <p-button 
        (click)="active = 1" 
        [rounded]="true"
        label="2" 
        styleClass="w-8 h-8 p-0" 
        [outlined]="active !== 1" />
    <p-button 
        (click)="active = 2" 
        [rounded]="true" 
        label="3" 
        styleClass="w-8 h-8 p-0" 
        [outlined]="active !== 2" />
</div>
<p-steps [activeIndex]="active" [model]="items" />`,

        html: `<div class="card">
    <div class="flex mb-8 gap-2 justify-end">
        <p-button 
            (click)="active = 0" 
            [rounded]="true" 
            label="1" 
            styleClass="w-8 h-8 p-0" 
            [outlined]="active !== 0" />
        <p-button 
            (click)="active = 1" 
            [rounded]="true" 
            label="2" 
            styleClass="w-8 h-8 p-0" 
            [outlined]="active !== 1" />
        <p-button 
            (click)="active = 2" 
            [rounded]="true" 
            label="3" 
            styleClass="w-8 h-8 p-0" 
            [outlined]="active !== 2" />
    </div>
    <p-steps [activeIndex]="active" [model]="items" />
</div>`,

        typescript: `import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { StepsModule } from 'primeng/steps';
import { ButtonModule } from 'primeng/button';

@Component({
    selector: 'steps-controlled-demo',
    templateUrl: './steps-controlled-demo.html',
    standalone: true,
    imports: [StepsModule, ButtonModule]
})
export class StepsControlledDemo implements OnInit {
    items: MenuItem[] | undefined;

    active: number = 0;

    ngOnInit() {
        this.items = [
            {
                label: 'Personal Info'
            },
            {
                label: 'Reservation'
            },
            {
                label: 'Review'
            }
        ];
    }
}`
    };
}
