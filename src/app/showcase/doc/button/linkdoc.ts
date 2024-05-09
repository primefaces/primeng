import { Component } from '@angular/core';
import { Code } from '@domain/code';

@Component({
    selector: 'button-link-demo',
    template: `
        <app-docsectiontext>
            <p>A button can be rendered as a link as well.</p>
        </app-docsectiontext>
        <div class="card flex justify-content-center gap-3">
            <p-button label="Link" [link]="true" />
            <a href="https://angular.dev/" target="_blank" rel="noopener noreferrer" class="p-button font-bold">External</a>
            <a routerLink="/"  class="p-button font-bold">Router</a>
        </div>
        <app-code [code]="code" selector="button-link-demo"></app-code>
    `
})
export class LinkDoc {
    code: Code = {
        basic: `<p-button label="Link" [link]="true" />
<a href="https://angular.dev/" target="_blank" rel="noopener noreferrer" class="p-button font-bold">
    External
</a>
<a routerLink="/" class="p-button font-bold">
    Router
</a>`,

        html: `<div class="card flex justify-content-center gap-3">
    <p-button label="Link" [link]="true" />
    <a href="https://angular.dev/" target="_blank" rel="noopener noreferrer" class="p-button font-bold">
        External
    </a>
    <a routerLink="/" class="p-button font-bold">
        Router
    </a>
</div>`,

        typescript: `import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'button-link-demo',
    templateUrl: './button-link-demo.html',
    standalone: true,
    imports: [ButtonModule, RouterModule]
})
export class ButtonLinkDemo { }`
    };
}
