import { Code } from '@/domain/code';
import { Component } from '@angular/core';

@Component({
    selector: 'avatar-badge-demo',
    template: `
        <app-docsectiontext>
            <p>A <i>badge</i> can be added to an Avatar with the <a href="#" [routerLink]="['/badge']">Badge</a> directive.</p>
        </app-docsectiontext>
        <div class="card flex justify-center">
            <p-avatar image="https://primefaces.org/cdn/primeng/images/demo/avatar/amyelsner.png" pBadge value="4" severity="danger" />
        </div>
        <app-code [code]="code" selector="avatar-badge-demo"></app-code>
    `
})
export class BadgeDoc {
    code: Code = {
        basic: `<p-avatar
    image="https://primefaces.org/cdn/primeng/images/demo/avatar/amyelsner.png"
    pBadge
    value="4"
    severity="danger" />`,
        html: `<div class="card flex justify-center">
    <p-avatar
        image="https://primefaces.org/cdn/primeng/images/demo/avatar/amyelsner.png"
        pBadge
        value="4"
        severity="danger" />
</div>`,
        typescript: `import { Component } from '@angular/core';
import { Avatar } from 'primeng/avatar';
import { BadgeModule } from 'primeng/badge';

@Component({
    selector: 'avatar-badge-demo',
    templateUrl: './avatar-badge-demo.html',
    standalone: true,
    imports: [Avatar, BadgeModule]
})
export class AvatarBadgeDemo {}`
    };
}
