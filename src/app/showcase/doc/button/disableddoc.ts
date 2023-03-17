import { Component, Input } from '@angular/core';
import { Code } from '../../domain/code';

@Component({
    selector: 'button-disabled-demo',
    template: ` <div>
        <app-docsectiontext [title]="title" [id]="id">
            <p>When <i>disabled</i> is present, the element cannot be edited and focused.</p>
        </app-docsectiontext>
        <div class="card flex justify-content-center">
            <p-button label="Submit" [disabled]="true"></p-button>
        </div>
        <app-code [code]="code" selector="button-disabled-demo"></app-code>
    </div>`
})
export class DisabledDoc {
    @Input() id: string;

    @Input() title: string;

    code: Code = {
        basic: `
<p-button label="Submit" [disabled]="true"></p-button>`,

        html: `
<div class="card flex justify-content-center">
    <p-button label="Submit" [disabled]="true"></p-button>
</div>`,

        typescript: `
import { Component } from '@angular/core';

@Component({
    selector: 'button-disabled-demo',
    templateUrl: './button-disabled-demo.html'
})
export class ButtonDisabledDemo { }`
    };
}
