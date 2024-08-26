import { Component } from '@angular/core';
import { Code } from '@domain/code';

@Component({
    selector: 'badge-basic-demo',
    template: `
        <app-docsectiontext>
            <p>Content of the badge is specified using the <i>value</i> property.</p>
        </app-docsectiontext>
        <div class="card flex justify-center">
            <p-badge [value]="2" />
        </div>
        <app-code [code]="code" selector="badge-basic-demo"></app-code>
    `
})
export class BasicDoc {
    code: Code = {
        basic: `<p-badge [value]="2" />`,
        html: `<div class="card flex justify-center">
    <p-badge [value]="2" />
</div>`,
        typescript: `import { Component } from '@angular/core';
import { BadgeModule } from 'primeng/badge';

@Component({
    selector: 'badge-basic-demo',
    templateUrl: './badge-basic-demo.html',
    standalone: true,
    imports: [BadgeModule]
})
export class BadgeBasicDemo {}`
    };
}
