import { Component } from '@angular/core';
import { Code } from '@domain/code';

@Component({
    selector: 'badge-size-demo',
    template: `
        <app-docsectiontext>
            <p>Badge sizes are adjusted with the <i>badgeSize</i> property that accepts <i>large</i> and <i>xlarge</i> as the possible alternatives to the default size. Currently sizes only apply to component mode.</p>
        </app-docsectiontext>
        <div class="card flex justify-content-center">
            <p-badge value="2" />
            <p-badge value="4" badgeSize="large" severity="warning" />
            <p-badge value="6" badgeSize="xlarge" severity="success" />
        </div>
        <app-code [code]="code" selector="badge-size-demo"></app-code>
    `
})
export class SizeDoc {
    code: Code = {
        basic: `<p-badge value="4" badgeSize="large" severity="warning" />`,
        html: `<div class="card flex justify-content-center">
    <p-badge value="2" />
    <p-badge value="4" badgeSize="large" severity="warning" />
    <p-badge value="6" badgeSize="xlarge" severity="success" />
</div>`,
        typescript: `import { Component } from '@angular/core';
import { BadgeModule } from 'primeng/badge';

@Component({
    selector: 'badge-size-demo',
    templateUrl: './badge-size-demo.html',
    standalone: true,
    imports: [BadgeModule]
})
export class BadgeSizeDemo {}`
    };
}
