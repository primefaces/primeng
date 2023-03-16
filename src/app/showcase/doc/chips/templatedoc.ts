import { Component, Input } from '@angular/core';
import { Code } from '../../domain/code';

@Component({
    selector: 'chips-template-demo',
    template: ` <div>
        <app-docsectiontext [title]="title" [id]="id">
            <p>A chip is customized using a <i>ng-template</i> element where the value is passed as the implicit variable.</p>
        </app-docsectiontext>
        <div class="card p-fluid">
            <p-chips [(ngModel)]="values">
                <ng-template let-item pTemplate="item"> {{ item }} - (active) <i class="pi pi-user ml-2"></i> </ng-template>
            </p-chips>
        </div>
        <app-code [code]="code" selector="chips-template-demo"></app-code>
    </div>`
})
export class TemplateDoc {
    @Input() id: string;

    @Input() title: string;

    values: string[];

    code: Code = {
        basic: `
<p-chips [(ngModel)]="values">
    <ng-template let-item pTemplate="item"> {{ item }} - (active) <i class="pi pi-user ml-2"></i> </ng-template>
</p-chips>`,

        html: `
<div class="card p-fluid">
    <p-chips [(ngModel)]="values">
        <ng-template let-item pTemplate="item"> {{ item }} - (active) <i class="pi pi-user ml-2"></i> </ng-template>
    </p-chips>
</div>`,

        typescript: `
import { Component } from '@angular/core';

@Component({
    selector: 'chips-template-demo',
    templateUrl: './chips-template-demo.html',
    styleUrls: ['./chips-template-demo.scss']
})

export class ChipsTemplateDemo {
    values: string[];
}`
    };
}
