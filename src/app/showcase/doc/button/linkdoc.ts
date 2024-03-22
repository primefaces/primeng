import { Component } from '@angular/core';
import { Code } from '../../domain/code';

@Component({
    selector: 'button-link-demo',
    template: `
        <app-docsectiontext>
            <p>A button can be rendered as a link as well.</p>
        </app-docsectiontext>
        <div class="card flex justify-content-center gap-3">
            <p-button label="Link" [link]="true"></p-button>
            <a href="https://angular.dev/" target="_blank" rel="noopener noreferrer" class="p-button font-bold">Navigate</a>
        </div>
        <app-code [code]="code" selector="button-link-demo"></app-code>
    `
})
export class LinkDoc {
    code: Code = {
        basic: `<p-button label="Link" [link]="true"></p-button>
<a href="https://angular.dev/" target="_blank" rel="noopener noreferrer" class="p-button font-bold">Navigate</a>`,

        html: `<div class="card flex justify-content-center gap-3">
    <p-button label="Link" [link]="true"></p-button>
    <a href="https://angular.dev/" target="_blank" rel="noopener noreferrer" class="p-button font-bold">Navigate</a>
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
