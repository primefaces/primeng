import { Component } from '@angular/core';
import { Code } from '../../domain/code';

@Component({
    selector: 'badge-directive-demo',
    template: `
        <app-docsectiontext>
            <p>Content of the badge is specified using the <i>value</i> property.</p>
        </app-docsectiontext>
        <div class="card flex justify-content-center">
            <i class="pi pi-bell text-3xl" pBadge value="2"></i>
        </div>
        <app-code [code]="code" selector="badge-directive-demo"></app-code>
    `
})
export class DirectiveDoc {
    code: Code = {
        basic: `<i class="pi pi-bell text-3xl" pBadge value="2"></i>`,
        html: `
<div class="card flex justify-content-center">
    <i class="pi pi-bell text-3xl" pBadge value="2"></i>
</div>`,
        typescript: `
import { Component } from '@angular/core';

@Component({
    selector: 'badge-directive-demo',
    templateUrl: './badge-directive-demo.html'
})
export class BadgeDirectiveDemo {}`
    };
}
