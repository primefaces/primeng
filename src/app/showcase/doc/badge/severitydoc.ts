import { Component } from '@angular/core';
import { Code } from '@domain/code';

@Component({
    selector: 'badge-severity-demo',
    template: `
        <app-docsectiontext>
            <p>Severity defines the color of the badge, possible values are <i>success</i>, <i>info</i>, <i>warn</i> and <i>danger</i></p>
        </app-docsectiontext>
        <div class="card flex justify-center gap-2">
            <p-badge value="2" />
            <p-badge value="6" severity="secondary" />
            <p-badge value="8" severity="success" />
            <p-badge value="4" severity="info" />
            <p-badge value="12" severity="warn" />
            <p-badge value="3" severity="danger" />
            <p-badge value="5" severity="contrast" />
        </div>
        <app-code [code]="code" selector="badge-severity-demo"></app-code>
    `
})
export class SeverityDoc {
    code: Code = {
        basic: `<p-badge [value]="2" severity="success" />`,
        html: `<div class="card flex justify-center gap-2">
    <p-badge [value]="2" severity="success" />
    <p-badge [value]="9" severity="info" />
    <p-badge [value]="3" severity="warn" />
    <p-badge [value]="12" severity="danger" />
</div>`,
        typescript: `import { Component } from '@angular/core';
import { BadgeModule } from 'primeng/badge';

@Component({
    selector: 'badge-severity-demo',
    templateUrl: './badge-severity-demo.html',
    standalone: true,
    imports: [BadgeModule]
})
export class BadgeSeverityDemo {}`
    };
}
