import { Component } from '@angular/core';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { AppCode } from '@/components/doc/app.code';
import { AvatarModule } from 'primeng/avatar';
import { BadgeModule } from 'primeng/badge';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'avatar-badge-demo',
    standalone: true,
    imports: [AppDocSectionText, AppCode, AvatarModule, BadgeModule, RouterModule],
    template: `
        <app-docsectiontext>
            <p>A <i>badge</i> can be added to an Avatar with the <a href="#" [routerLink]="['/badge']">Badge</a> directive.</p>
        </app-docsectiontext>
        <div class="card flex justify-center">
            <p-avatar image="https://primefaces.org/cdn/primeng/images/demo/avatar/amyelsner.png" pBadge value="4" severity="danger" />
        </div>
        <app-code selector="avatar-badge-demo"></app-code>
    `
})
export class BadgeDoc {}
