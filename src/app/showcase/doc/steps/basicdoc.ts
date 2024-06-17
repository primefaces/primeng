import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Code } from '@domain/code';

@Component({
    selector: 'basic-doc',
    template: `
        <app-docsectiontext>
            <p>Steps requires a collection of menuitems as its <i>model</i>.</p>
        </app-docsectiontext>
        <div class="card">
            <p-steps [model]="items" [readonly]="true" />
        </div>
        <app-code [code]="code" selector="steps-basic-demo"></app-code>
    `
})
export class BasicDoc implements OnInit {
    items: MenuItem[] | undefined;

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
        basic: `<p-steps [model]="items" [readonly]="true" />`,

        html: `<div class="card">
    <p-steps [model]="items" [readonly]="true" />
</div>`,

        typescript: `import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { StepsModule } from 'primeng/steps';

@Component({
    selector: 'steps-basic-demo',
    templateUrl: './steps-basic-demo.html',
    standalone: true,
    imports: [StepsModule]
})
export class StepsBasicDemo implements OnInit {
    items: MenuItem[] | undefined;

    ngOnInit() {
        this.items = [
            {
                label: 'Personal',
                routerLink: 'personal'
            },
            {
                label: 'Seat',
                routerLink: 'seat'
            },
            {
                label: 'Payment',
                routerLink: 'payment'
            },
            {
                label: 'Confirmation',
                routerLink: 'confirmation'
            }
        ];
    }
}`
    };
}
