import { Component, Input } from '@angular/core';
import { Code } from '../../domain/code';

@Component({
    selector: 'default-doc',
    template: ` <section class="py-3">
        <app-docsectiontext [title]="title" [id]="id">
            <p>Default Demo Content.</p>
        </app-docsectiontext>
        <div class="card card-container flex justify-content-center align-items-center">
            <div pRipple class="card text-primary bg-primary flex select-none justify-content-center align-items-center shadow-2">Default</div>
        </div>
        <app-code [code]="code" selector="ripple-default-demo"></app-code>
    </section>`
})
export class DefaultDoc {
    @Input() id: string;

    @Input() title: string;

    code: Code = {
        basic: `
<div pRipple class="card text-primary bg-primary flex select-none justify-content-center align-items-center shadow-2">Default</div>`,
        html: `
<div class="card card-container flex justify-content-center align-items-center">
    <div pRipple class="card text-primary bg-primary flex select-none justify-content-center align-items-center shadow-2">Default</div>
</div>`,
        typescript: `
import { Component } from '@angular/core';

@Component({
    templateUrl: './ripple-default-demo.html',
    styleUrls: ['./ripple-default-demo.scss']
})
export class RippleDefaultDemo {
}`,
        scss: `
:host ::ng-deep .card-container {
    .card {
        width: 75px;
        height: 75px;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-right: 1rem;
        user-select: none;
        padding: 0;

        &:last-child {
            margin-right: 0;
        }
    }
}`
    };
}
