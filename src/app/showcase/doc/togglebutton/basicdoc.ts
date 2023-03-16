import { Component, Input } from '@angular/core';
import { Code } from '../../domain/code';

@Component({
    selector: 'toggle-button-basic-demo',
    template: ` <div>
        <app-docsectiontext [title]="title" [id]="id">
            <p>Two-way binding to a boolean property is defined using the standard ngModel directive.</p>
        </app-docsectiontext>
        <div class="card flex justify-content-center">
            <p-toggleButton [(ngModel)]="checked" onLabel="Yes" offLabel="No"></p-toggleButton>
        </div>
        <app-code [code]="code" selector="toggle-button-basic-demo"></app-code>
    </div>`
})
export class BasicDoc {
    @Input() id: string;

    @Input() title: string;

    checked: boolean = false;

    code: Code = {
        basic: `
<p-toggleButton [(ngModel)]="checked" onLabel="Yes" offLabel="No"></p-toggleButton>`,

        html: `
<div class="card flex justify-content-center">
    <p-toggleButton [(ngModel)]="checked" onLabel="Yes" offLabel="No"></p-toggleButton>
</div>`,

        typescript: `
import { Component } from '@angular/core';

@Component({
    selector: 'toggle-button-basic-demo',
    templateUrl: './toggle-button-basic-demo.html',
    styleUrls: ['./toggle-button-basic-demo.scss']
})
export class ToggleButtonBasicDemo {
    checked: boolean = false;
}`
    };
}
