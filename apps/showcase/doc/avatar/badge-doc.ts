import { Component } from '@angular/core';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { AppCode } from '@/components/doc/app.code';
import { AppDemoWrapper } from '@/components/doc/app.demowrapper';
import { AvatarModule } from 'primeng/avatar';
import { OverlayBadgeModule } from 'primeng/overlaybadge';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'badge-doc',
    standalone: true,
    imports: [AppDocSectionText, AppCode, AppDemoWrapper, AvatarModule, OverlayBadgeModule, RouterModule],
    template: `
        <app-docsectiontext>
            <p>A <i>badge</i> can be added to an Avatar with the <a href="#" [routerLink]="['/badge']">OverlayBadge</a> component.</p>
        </app-docsectiontext>
        <app-demo-wrapper>
            <div class="flex justify-center">
                <p-overlaybadge value="4" severity="danger">
                    <p-avatar image="https://primefaces.org/cdn/primeng/images/demo/avatar/amyelsner.png" />
                </p-overlaybadge>
            </div>
            <app-code></app-code>
        </app-demo-wrapper>
    `
})
export class BadgeDoc {}
