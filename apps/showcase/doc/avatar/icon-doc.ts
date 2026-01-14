import { Component } from '@angular/core';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { AppCode } from '@/components/doc/app.code';
import { AvatarModule } from 'primeng/avatar';
import { OverlayBadgeModule } from 'primeng/overlaybadge';

@Component({
    selector: 'icon-doc',
    standalone: true,
    imports: [AppDocSectionText, AppCode, AvatarModule, OverlayBadgeModule],
    template: `
        <app-docsectiontext>
            <p>A font icon is displayed as an Avatar with the <i>icon</i> property.</p>
        </app-docsectiontext>
        <div class="card">
            <div class="flex flex-wrap gap-8">
                <div class="flex-auto">
                    <h5>Icon</h5>
                    <p-avatar icon="pi pi-user" class="mr-2" size="xlarge" />
                    <p-avatar icon="pi pi-user" class="mr-2" size="large" style="background-color: #ece9fc; color: #2a1261" />
                    <p-avatar icon="pi pi-user" style="background-color: #dee9fc; color: #1a2551" />
                </div>

                <div class="flex-auto">
                    <h5>Circle</h5>
                    <p-avatar icon="pi pi-user" class="mr-2" size="xlarge" shape="circle" />
                    <p-avatar icon="pi pi-user" class="mr-2" size="large" style="background-color: #ece9fc; color: #2a1261" shape="circle" />
                    <p-avatar icon="pi pi-user" style="background-color: #dee9fc; color: #1a2551" shape="circle" />
                </div>

                <div class="flex-auto">
                    <h5>Badge</h5>
                    <p-overlay-badge value="4" severity="danger" class="inline-flex">
                        <p-avatar icon="pi pi-user" size="xlarge" />
                    </p-overlay-badge>
                </div>
            </div>
        </div>
        <app-code></app-code>
    `
})
export class IconDoc {}
