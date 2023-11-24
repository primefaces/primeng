import { Component } from '@angular/core';
import { Code } from '../../domain/code';

@Component({
    selector: 'button-link-demo',
    template: `
        <app-docsectiontext>
            <p>A button can be rendered as a link as well.</p>
        </app-docsectiontext>
        <div class="card flex justify-content-center">
            <p-button label="Submit" [link]="true"></p-button>
        </div>
        <app-code [code]="code" selector="button-link-demo"></app-code>
    `
})
export class LinkDoc {
    code: Code = {
        basic: `
<p-button label="Submit" [link]="true"></p-button>`,

        html: `
<div class="card flex justify-content-center">
    <p-button label="Submit" [link]="true"></p-button>
</div>`,

        typescript: `
import { Component } from '@angular/core';

@Component({
    selector: 'button-link-demo',
    templateUrl: './button-link-demo.html'
})
export class ButtonLinkDemo { }`
    };
}
