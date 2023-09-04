import { Component, Input } from '@angular/core';
import { Code } from '../../domain/code';

@Component({
    selector: 'template-doc',
    template: ` <section class="py-3">
        <app-docsectiontext [title]="title" [id]="id">
            <p>For custom content support define a ng-template with <i>pTemplate</i> where the local ng-template variable refers to an option in the options collection.</p>
        </app-docsectiontext>
        <div class="card flex justify-content-center">
            <p-selectButton [options]="justifyOptions" [(ngModel)]="value" optionLabel="icon">
                <ng-template let-item pTemplate>
                    <i [class]="item.icon"></i>
                </ng-template>
            </p-selectButton>
        </div>
        <app-code [code]="code" selector="select-button-template-demo"></app-code>
    </section>`
})
export class TemplateDoc {
    @Input() id: string;

    @Input() title: string;

    value: any;

    justifyOptions: any[] = [
        { icon: 'pi pi-align-left', justify: 'Left' },
        { icon: 'pi pi-align-right', justify: 'Right' },
        { icon: 'pi pi-align-center', justify: 'Center' },
        { icon: 'pi pi-align-justify', justify: 'Justify' }
    ];

    code: Code = {
        basic: `
<p-selectButton [options]="justifyOptions" [(ngModel)]="value" optionLabel="icon">
    <ng-template let-item pTemplate>
        <i [class]="item.icon"></i>
    </ng-template>
</p-selectButton>`,

        html: `
<div class="card flex justify-content-center">
    <p-selectButton [options]="justifyOptions" [(ngModel)]="value" optionLabel="icon">
        <ng-template let-item pTemplate>
            <i [class]="item.icon"></i>
        </ng-template>
    </p-selectButton>
</div>`,

        typescript: `
import { Component } from '@angular/core';

@Component({
    selector: 'select-button-template-demo',
    templateUrl: './select-button-template-demo.html'
})
export class SelectButtonTemplateDemo {
    value: any;

    justifyOptions: any[] = [
        { icon: 'pi pi-align-left', justify: 'Left' },
        { icon: 'pi pi-align-right', justify: 'Right' },
        { icon: 'pi pi-align-center', justify: 'Center' },
        { icon: 'pi pi-align-justify', justify: 'Justify' }
    ];

}`
    };
}
