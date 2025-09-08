import { Code } from '@/domain/code';
import { Component } from '@angular/core';

@Component({
    selector: 'button-link-demo',
    standalone: false,
    template: `
        <app-docsectiontext>
            <p>A button can be rendered as a link when <i>link</i> property is present, while the <i>pButton</i> directive can be applied on an anchor element to style the link as a button.</p>
        </app-docsectiontext>
        <div class="card flex justify-center gap-4">
            <p-button label="Link" link />
            <a href="https://angular.dev/" pButton target="_blank" rel="noopener noreferrer">
                <span pButtonLabel>Angular Website</span>
            </a>
            <a routerLink="/" pButton>
                <span pButtonLabel>Router Link</span>
            </a>
        </div>
        <app-code [code]="code" selector="button-link-demo"></app-code>
    `
})
export class LinkDoc {
    code: Code = {
        basic: `<p-button label="Link" link />
<a href="https://angular.dev/" pButton target="_blank" rel="noopener noreferrer">
    <span pButtonLabel>Angular Website</span>
</a>
<a routerLink="/" pButton>
    <span pButtonLabel>Router Link</span>
</a>`,

        html: `<div class="card flex justify-center gap-4">
    <p-button label="Link" link />
    <a href="https://angular.dev/" pButton target="_blank" rel="noopener noreferrer">
        <span pButtonLabel>Angular Website</span>
    </a>
    <a routerLink="/" pButton>
        <span pButtonLabel>Router Link</span>
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
