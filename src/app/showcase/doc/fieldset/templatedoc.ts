import { Component, Input } from '@angular/core';
import { Code } from '../../domain/code';

@Component({
    selector: 'fieldset-template-demo',
    template: ` <section class="py-3">
        <app-docsectiontext [title]="title" [id]="id">
            <p>Legend section can also be defined with custom content instead of primitive values.</p>
        </app-docsectiontext>
        <div class="card">
            <p-fieldset>
                <ng-template pTemplate="header">
                    <div class="flex align-items-center text-primary">
                        <span class="pi pi-user mr-2"></span>
                        <span class="font-bold text-lg">User Details</span>
                    </div>
                </ng-template>
                Content
            </p-fieldset>
        </div>
        <app-code [code]="code" selector="fieldset-template-demo"></app-code>
    </section>`
})
export class TemplateDoc {
    @Input() id: string;

    @Input() title: string;

    code: Code = {
        basic: `
<p-fieldset>
    <ng-template pTemplate="header">
        <div class="flex align-items-center text-primary">
            <span class="pi pi-user mr-2"></span>
            <span class="font-bold text-lg">User Details</span>
        </div>
    </ng-template>
    Content
</p-fieldset>`,

        html: `
<div class="card">
    <p-fieldset>
        <ng-template pTemplate="header">
            <div class="flex align-items-center text-primary">
                <span class="pi pi-user mr-2"></span>
                <span class="font-bold text-lg">User Details</span>
            </div>
        </ng-template>
        Content
    </p-fieldset>
</div>`,

        typescript: `
import { Component } from '@angular/core';

@Component({
    selector: 'fieldset-template-demo',
    templateUrl: './fieldset-template-demo.html'
})
export class FieldsetTemplateDemo {}`
    };
}
